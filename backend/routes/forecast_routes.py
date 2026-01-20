from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np
from itertools import product
import joblib
import requests
from datetime import date, timedelta
from urllib.request import urlopen
from sklearn.preprocessing import OrdinalEncoder
import os
from schemas import ForecastResponse

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

classified_weather_dir = os.path.join(base_dir, "Models", "ClassifiedWeatherTypes")
fitted_models_dir = os.path.join(base_dir, "Models", "Fitted_Models")
fitted_standardizers_dir = os.path.join(base_dir, "Models", "Fitted_Standardizers")

config = {
    "target_variable": "Active_Power",
    "predictors": [
        "temperature_2m",
        "relativehumidity_2m",
        "direct_radiation",
        "diffuse_radiation",
        "windspeed_10m",
        "cloudcover",
        "season",
    ],
    "time_intervals": [
        "first_interval",
        "second_interval",
        "third_interval",
        "fourth_interval",
        "fifth_interval",
        "sixth_interval",
    ],
    "weather_types": ["TypeA", "TypeB", "TypeC"],
    "standardize_predictor_list": [
        "temperature_2m",
        "relativehumidity_2m",
        "direct_radiation",
        "diffuse_radiation",
        "windspeed_10m",
        "cloudcover",
    ],
}


class ForecastRequest(BaseModel):
    start_date: str
    end_date: str


router = APIRouter()


def add_season(df):
    def season(month):
        if month in [12, 1, 2]:
            return "winter"
        elif month in [3, 4, 5]:
            return "spring"
        elif month in [6, 7, 8]:
            return "summer"
        else:
            return "fall"

    df["season"] = df["date"].dt.month.apply(season)
    return df


def choose_interval(df):
    df = df.sort_values("date")
    df = df.set_index("date")
    df = df.between_time("07:00", "18:00")
    df = df.reset_index()
    return df


def detect_time_interval(df):
    df_time_detect = df.copy()
    if "date" in df_time_detect.columns:
        df_time_detect["date"] = pd.to_datetime(df_time_detect["date"])
        df_time_detect = df_time_detect.set_index("date")
    else:
        raise ValueError("Column 'date' is missing in the DataFrame.")

    intervals = {
        "first_interval": (7, 9),
        "second_interval": (9, 11),
        "third_interval": (11, 13),
        "fourth_interval": (13, 15),
        "fifth_interval": (15, 17),
        "sixth_interval": (17, 18),
    }
    df_time_detect["time_interval"] = pd.cut(
        df_time_detect.index.hour,
        bins=[interval[0] for interval in intervals.values()] + [24],
        labels=[interval_name for interval_name in intervals.keys()],
        include_lowest=True,
        right=False,
    )
    df_time_detect = df_time_detect.reset_index()
    return df_time_detect


def get_weather_forecast_data():
    lat = -23.760363
    long = 133.874719
    Predictors = config["predictors"][:-1]
    start_date = str(date.today() + timedelta(days=1))
    end_date = str(date.today() + timedelta(days=4))

    r = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": lat,
            "longitude": long,
            "timezone": "auto",
            "start_date": start_date,
            "end_date": end_date,
            "hourly": Predictors,
        },
    ).json()

    weather_df = pd.DataFrame(columns=Predictors)
    weather_df["date"] = pd.to_datetime(np.array(r["hourly"]["time"]))
    for p in Predictors:
        weather_df[p] = np.array(r["hourly"][p])
    return weather_df


def classify_weather_forecast_type(df):
    new_df = pd.DataFrame()
    for interval in config["time_intervals"]:
        interval_dataset = df[df["time_interval"] == interval].copy()
        try:
            rf_path = os.path.join(
                classified_weather_dir, f"RF_Weather_{interval}_.pkl"
            )
            grid = joblib.load(rf_path)
            classified_weather_type = grid.predict(
                interval_dataset[config["predictors"]]
            )
        except:

            raise ValueError("Failed to load weather type classifier.")
        interval_dataset["weather_type"] = classified_weather_type
        new_df = pd.concat([new_df, interval_dataset])
    new_df = new_df.sort_index()
    return new_df


def standardize_data_weather_forecast(df):
    if "date" not in df.columns:
        raise KeyError("'date' column is missing in the DataFrame")

    X_new_test = df[config["standardize_predictor_list"]]
    scaler_path = os.path.join(fitted_standardizers_dir, "std_scaler.bin")
    predictor_scaler_fit = joblib.load(scaler_path)
    X_new_test = predictor_scaler_fit.transform(X_new_test)

    new_stand_df = pd.DataFrame(
        X_new_test, columns=config["standardize_predictor_list"], index=df.index
    )
    new_stand_df = pd.concat(
        [new_stand_df, df[["date", "season", "weather_type", "time_interval"]]],
        axis=1,
        join="inner",
    )
    return new_stand_df


def predict_forecast(new_stand_test):
    forecast_test = pd.DataFrame()
    for interval, weather_type in product(
        config["time_intervals"], config["weather_types"]
    ):
        X_test = new_stand_test[
            (new_stand_test["time_interval"] == interval)
            & (new_stand_test["weather_type"] == weather_type)
        ][config["predictors"]]
        if not X_test.empty:
            model_path = os.path.join(
                fitted_models_dir, f"XGB_fitted_{interval}_{weather_type}.pkl"
            )
            md = joblib.load(model_path)
            predictions = md.predict(X_test)
            TestingData = pd.DataFrame(X_test, columns=X_test.columns)
            TestingData["PredictedTotalPower"] = predictions
            TestingData["date"] = new_stand_test.loc[X_test.index, "date"]
            forecast_test = pd.concat([forecast_test, TestingData])
    forecast_test = forecast_test.sort_index()
    return forecast_test


@router.post("/forecast", response_model=List[ForecastResponse])
async def forecast_energy(request: ForecastRequest):
    weather_forecast_df = get_weather_forecast_data()

    weather_forecast_df = add_season(weather_forecast_df)
    weather_forecast_df = choose_interval(weather_forecast_df)
    weather_forecast_df = detect_time_interval(weather_forecast_df)

    if "date" not in weather_forecast_df.columns:
        raise KeyError("'date' column is missing after preprocessing steps.")

    ord_enc = OrdinalEncoder()
    season = ord_enc.fit_transform(weather_forecast_df[["season"]])
    weather_forecast_df["season"] = season

    weather_forecast_df = classify_weather_forecast_type(weather_forecast_df)

    weather_forecast_df_standardized = standardize_data_weather_forecast(
        weather_forecast_df
    )

    predicted_forecast = predict_forecast(weather_forecast_df_standardized)

    forecast_result = [
        ForecastResponse(
            date=row["date"].strftime("%Y-%m-%d %H:%M:%S"),
            PredictedTotalPower=row["PredictedTotalPower"],
        )
        for _, row in predicted_forecast.iterrows()
    ]

    return forecast_result
