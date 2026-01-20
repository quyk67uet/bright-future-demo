# routes/statistics_routes.py

from fastapi import APIRouter, HTTPException, Query
from schemas import SolarCalculationResponse
from services.PV_service import calculate_solar_energy

router = APIRouter()

@router.get("/statistics/", response_model=SolarCalculationResponse)
async def statistics_endpoint(
    capacity: float = Query(..., alias="capacity", description="Capacity of the solar plant in kW"),
    latitude: float = Query(..., alias="latitude", description="Latitude of the location"),
    longitude: float = Query(..., alias="longitude", description="Longitude of the location"),
    timezone: str = Query("Asia/Ho_Chi_Minh", alias="timezone", description="Time zone of the location"),
    surface_tilt: float = Query(20.0, alias="surface_tilt", description="Surface tilt angle of the panels"),
    surface_azimuth: int = Query(180, alias="surface_azimuth", description="Surface azimuth angle (e.g., 180 for south-facing)"),
    model: str = Query(..., alias="model", description="Model name of the solar module from CSV"),
    performance_ratio: float = Query(81.0, alias="performance_ratio", description="Performance ratio (%) of the plant")
):
    try:
        result = calculate_solar_energy(
            plant_capacity=capacity,
            latitude=latitude,
            longitude=longitude,
            timezone=timezone,
            surface_tilt=surface_tilt,
            surface_azimuth=surface_azimuth,
            module_selection=model,
            performance_ratio=performance_ratio
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        import traceback
        error_detail = f"Internal server error: {str(e)}\n{traceback.format_exc()}"
        raise HTTPException(status_code=500, detail=error_detail)

    return SolarCalculationResponse(**result)
