from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import batman_plot, exoplanet_plot, exoplanets

app = FastAPI()
app.include_router(batman_plot.router)
app.include_router(exoplanet_plot.router)
app.include_router(exoplanets.router)
app.mount("/images", StaticFiles(directory="images"), name="images")

@app.get("/")
async def root():
    return {
        "api":"hello world eiei exoplanet interactive education api",
        "docs": "/docs"
    }