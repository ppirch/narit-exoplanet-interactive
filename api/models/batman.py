from typing import Optional, List
from pydantic import BaseModel
from bson import ObjectId


class BatmanPlotSchema(BaseModel):
    t0: float
    rp: float
    a: float
    inc: float
    JD: Optional[List[float]]
    err_flux: Optional[List[float]]
    nor_flux: Optional[List[float]]

    class Config:
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "t0": 7745.116,
                "rp": 0.145,
                "a": 12.51,
                "inc": 89.03,
                "JD": [
                    7744.98169146,
                    7744.9821081,
                    7744.98253632,
                    7744.98295296,
                    7744.9833696,
                ],
                "err_flux": [0.02907735, 0.02909342, 0.02876834, 0.0288506, 0.02837572],
                "nor_flux": [1.00267191, 1.00322616, 0.9920164, 0.99485285, 0.99512778],
            }
        }
