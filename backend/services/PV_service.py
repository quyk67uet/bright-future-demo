import pandas as pd
from pvlib import location, irradiance
import os

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
module_path = os.path.join(base_dir, "module_pv", "module_data.csv")
module_df = pd.read_csv(module_path)

def get_module_data(module_selection: str):
    module = module_df[module_df["Model Name"] == module_selection]
    if module.empty:
        raise ValueError("Module not found")
    return {
        "efficiency": module.iloc[0]["Efficiency"] / 100,
        "area": module.iloc[0]["Area"],
        "watt_peak": module.iloc[0]["Watt peak"]
    }

def calculate_solar_energy(
    plant_capacity: float,
    latitude: float,
    longitude: float,
    timezone: str,
    surface_tilt: float,
    surface_azimuth: int,
    module_selection: str,
    performance_ratio: float
):
    module_info = get_module_data(module_selection)
    module_efficiency = module_info["efficiency"]
    area = module_info["area"]
    watt_peak = module_info["watt_peak"]

    total_modules = round(plant_capacity / (watt_peak / 1000))
    total_area = area * total_modules

    from datetime import datetime, timedelta
    
    site = location.Location(latitude, longitude, tz=timezone)
    # Tính từ ngày hiện tại đến 1 năm sau
    start_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    end_date = start_date + timedelta(days=365)
    times = pd.date_range(start=start_date, end=end_date, freq='H', tz=timezone)[:-1]

    solar_position = site.get_solarposition(times)
    irrad_data = site.get_clearsky(times)

    poa_irrad = irradiance.get_total_irradiance(
        surface_tilt=surface_tilt,
        surface_azimuth=surface_azimuth,
        solar_zenith=solar_position["apparent_zenith"],
        solar_azimuth=solar_position["azimuth"],
        dni=irrad_data["dni"],
        ghi=irrad_data["ghi"],
        dhi=irrad_data["dhi"]
    )

    daily_gii = (poa_irrad["poa_global"] / 1000).resample("D").sum()
    yearly_gii = daily_gii.sum()
    monthly_gii = daily_gii.resample("M").sum()

    hourly_production = (poa_irrad["poa_global"] / 1000) * module_efficiency * (performance_ratio / 100)
    daily_energy = hourly_production.resample("D").sum() * total_area
    yearly_energy = daily_energy.sum()
    monthly_energy = daily_energy.resample("M").sum()

    daily_values = [{"date": date.strftime("%Y-%m-%d"), "gii": gii, "energy": energy}
                    for date, gii, energy in zip(daily_gii.index, daily_gii, daily_energy)]
    
    monthly_values = [{"month": date.strftime("%Y-%m"), "gii": gii, "energy": energy}
                      for date, gii, energy in zip(monthly_gii.index, monthly_gii, monthly_energy)]

    
    result = {
        "max_daily_gii": round(daily_gii.max(), 2),
        "min_daily_gii": round(daily_gii.min(), 2),
        "yearly_total_gii": round(yearly_gii, 2),
        "average_daily_gii": round(daily_gii.mean(), 2),
        
        "max_daily_energy": round(daily_energy.max(), 2),
        "min_daily_energy": round(daily_energy.min(), 2),
        "yearly_total_energy": round(yearly_energy, 2),
        "average_daily_energy": round(daily_energy.mean(), 2),
        
        "daily_values": daily_values,
        "monthly_values": monthly_values,
        
        "system_capacity": plant_capacity,
        "performance_ratio": performance_ratio,
        "module_efficiency": module_info['efficiency']
    }
    
    return result
