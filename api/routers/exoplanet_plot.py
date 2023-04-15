from fastapi import APIRouter

from module.exoplanet_plot import plot_exoplanet, plot_habit_zone

router = APIRouter()

@router.get("/plot-exoplanet", tags=["Exoplanet plot"])
def plot_exo(host_name: str, t0: float, rp: float, a: float, inc: float):
    habit_plot = plot_habit_zone(host_name=host_name, a=a, Stellar_R=0.74, ST=4800.00)
    exoplanet_plot = plot_exoplanet(host_name=host_name, R_pl=rp, Inc=inc, Stellar_R=0.74, a=a, ST=4800.00)
    result = {
        "habit_plot": habit_plot,
        "exoplanet_plot": exoplanet_plot
    }
    return result