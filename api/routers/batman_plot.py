from fastapi import APIRouter

from models.batman import BatmanPlotSchema
from module.batman_plot import batman_plot

router = APIRouter()

@router.post("/plot-batman", tags=["Batman plot"])
def plot_batman(batmanPlot: BatmanPlotSchema):
    result = batman_plot(
        batmanPlot.t0,
        batmanPlot.rp,
        batmanPlot.a,
        batmanPlot.inc,
        batmanPlot.JD,
        batmanPlot.nor_flux,
        batmanPlot.err_flux,
    )
    return result