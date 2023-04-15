from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class Coordinate(BaseModel):
    x: float
    y: float


class StarParams(BaseModel):
    mass: float
    radius: float
    temperature: float


class planetParams(BaseModel):
    period: float
    midTransitTime: float
    radius: float
    semiMajorAxis: float
    inclination: float


class bestFittingPlanetParams(BaseModel):
    midTransitTime: float
    radius: float
    semiMajorAxis: float
    inclination: float

class SimpleExoplanetSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    class Config:
            allow_population_by_field_name = True
            arbitrary_types_allowed = True
            json_encoders = {ObjectId: str}
            schema_extra = {
                "example": {
                    "_id": "61c3826bbc6000d18e0b5104",
                    "name": "WASP-11",
                }
            }
class ExoplanetSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    numberOfImages: int
    JD: List[float]
    flux: List[float]
    err_flux: List[float]
    nor_flux: List[float]
    coordinate: List[Coordinate]
    starParams: StarParams
    planetParams: planetParams
    bestFittingPlanetParams: bestFittingPlanetParams

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id": "61c3826bbc6000d18e0b5104",
                "name": "WASP-11",
                "numberOfImages": 2,
                "JD": [
                    7744.98169146,
                    7744.9821081,
                    7744.98253632,
                    7744.98295296,
                    7744.9833696,
                ],
                "flux": [5.66552291, 5.66865466, 5.6053147, 5.62134189, 5.62289534],
                "err_flux": [0.02907735, 0.02909342, 0.02876834, 0.0288506, 0.02837572],
                "nor_flux": [1.00267191, 1.00322616, 0.9920164, 0.99485285, 0.99512778],
                "coordinate": [
                    {"x": 13.7994, "y": 48.9412},
                    {"x": 19.2108, "y": 17.4078},
                    {"x": 19.6942, "y": 13.6283},
                    {"x": 43.8609, "y": 3.3734},
                    {"x": 63.432, "y": 1.9021},
                ],
                "starParams": {"mass": 0.74, "radius": 0.74, "temperature": 4800},
                "planetParams": {
                    "period": 3.72199,
                    "midTransitTime": 7745.11001,
                    "radius": 0.14479,
                    "semiMajorAxis": 12.51119,
                    "inclination": 89.03009,
                },
                "bestFittingPlanetParams": {
                    "midTransitTime": 7745.11001,
                    "radius": 0.14479,
                    "semiMajorAxis": 12.51119,
                    "inclination": 89.03009,
                },
            }
        }


class UpdateExoplanetSchema(BaseModel):
    name: Optional[str]
    numberOfImages: Optional[int]
    JD: Optional[List[float]]
    flux: Optional[List[float]]
    err_flux: Optional[List[float]]
    nor_flux: Optional[List[float]]
    coordinate: Optional[List[Coordinate]]
    starParams: Optional[StarParams]
    planetParams: Optional[planetParams]
    bestFittingPlanetParams: Optional[bestFittingPlanetParams]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "WASP-11",
                "JD": [
                    7744.98169146,
                    7744.9821081,
                    7744.98253632,
                    7744.98295296,
                    7744.9833696,
                ],
                "flux": [5.66552291, 5.66865466, 5.6053147, 5.62134189, 5.62289534],
                "err_flux": [0.02907735, 0.02909342, 0.02876834, 0.0288506, 0.02837572],
                "nor_flux": [1.00267191, 1.00322616, 0.9920164, 0.99485285, 0.99512778],
                "coordinate": [
                    {"x": 13.7994, "y": 48.9412},
                    {"x": 19.2108, "y": 17.4078},
                    {"x": 19.6942, "y": 13.6283},
                    {"x": 43.8609, "y": 3.3734},
                    {"x": 63.432, "y": 1.9021},
                ],
                "starParams": {"mass": 0.74, "radius": 0.74, "temperature": 4800},
                "planetParams": {
                    "period": 3.72199,
                    "midTransitTime": 7745.11001,
                    "radius": 0.14479,
                    "semiMajorAxis": 12.51119,
                    "inclination": 89.03009,
                },
                "bestFittingPlanetParams": {
                    "midTransitTime": 7745.11001,
                    "radius": 0.14479,
                    "semiMajorAxis": 12.51119,
                    "inclination": 89.03009,
                },
            }
        }
