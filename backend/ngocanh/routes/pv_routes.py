# routes/pv_routes.py

from fastapi import APIRouter, HTTPException, Query
from schemas import SolarCalculationResponse
from services.PV_service import calculate_solar_energy

router = APIRouter()

@router.get("/solar_calculation", response_model=SolarCalculationResponse)
async def calculate_solar_energy_endpoint(
    plant_capacity: float = Query(..., description="Capacity of the solar plant in kW"),
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    timezone: str = Query("Asia/Ho_Chi_Minh", description="Time zone of the location"),
    surface_tilt: float = Query(20.0, description="Surface tilt angle of the panels"),
    surface_azimuth: int = Query(180, description="Surface azimuth angle (e.g., 180 for south-facing)"),
    module_selection: str = Query(..., description="Model name of the solar module from CSV"),
    performance_ratio: float = Query(81.0, description="Performance ratio (%) of the plant")
):
    try:
        result = calculate_solar_energy(
            plant_capacity=plant_capacity,
            latitude=latitude,
            longitude=longitude,
            timezone=timezone,
            surface_tilt=surface_tilt,
            surface_azimuth=surface_azimuth,
            module_selection=module_selection,
            performance_ratio=performance_ratio
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return SolarCalculationResponse(**result)