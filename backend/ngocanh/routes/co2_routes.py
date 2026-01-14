from fastapi import APIRouter, HTTPException
from typing import Union
from services import co2_service
from schemas import CO2Response

router = APIRouter()

@router.get("/calculator", response_model=CO2Response)
def co2_calculator(kwh: Union[float, int]) -> CO2Response:
    try:
        kwh_value = float(kwh)
        return co2_service.CO2Service.calculate_co2_metrics(kwh_value)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="kwh must be a valid number"
        )