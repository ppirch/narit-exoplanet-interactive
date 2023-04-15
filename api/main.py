from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import batman_plot, exoplanet_plot, exoplanets

origins = [
    "http://0.0.0.0:8888",
    "http://localhost:8888"
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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