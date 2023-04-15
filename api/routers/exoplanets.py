import os
import pymongo
from typing import List
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models.exoplanet import ExoplanetSchema, SimpleExoplanetSchema, UpdateExoplanetSchema

def get_database():
    MONGO_USER = os.getenv('MONGODB_USER', '')
    MONGO_PASSWORD = os.getenv('MONGODB_PASSWORD', '')
    CONNECTION_STRING = f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@mongo:27017/exoplanet"
    client = pymongo.MongoClient(CONNECTION_STRING)
    return client["exoplanet"]

db = get_database()
exoplanet_collection = db.get_collection("exoplanet")

router = APIRouter()

@router.get(
    "/exoplanet",
    response_description="List all exoplanets",
    response_model=List[SimpleExoplanetSchema],
    tags=["Exoplanet"],
)
def list_exoplanet():
    all_exoplanet = exoplanet_collection.find(
        {}, {"_id": 1, "name": 1}
    )
    result = []
    for exoplanet in all_exoplanet:
        result.append(exoplanet)
    return result


@router.post(
    "/exoplanet",
    response_description="Add new exoplanet",
    response_model=ExoplanetSchema,
    tags=["Exoplanet"],
)
def create_exoplanet(exoplanet: ExoplanetSchema):
    exoplanet = jsonable_encoder(exoplanet)
    new_exoplanet = exoplanet_collection.insert_one(exoplanet)
    created_exoplanet = exoplanet_collection.find_one(
        {"_id": new_exoplanet.inserted_id}
    )
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_exoplanet)


@router.get(
    "/exoplanet/{id}",
    response_description="Get a single exoplanet",
    response_model=ExoplanetSchema,
    tags=["Exoplanet"],
)
def get_exoplanet_by_id(id: str = ""):
    exoplanet = exoplanet_collection.find_one({"_id": id})
    if exoplanet is not None:
        return exoplanet
    raise HTTPException(status_code=404, detail=f"Exoplanet {id} not found")


@router.put(
    "/exoplanet/{id}",
    response_description="Update a exoplanet",
    response_model=ExoplanetSchema,
    tags=["Exoplanet"],
)
async def update_exoplanet(id: str, exoplanet: UpdateExoplanetSchema = Body(...)):
    exoplanet = {k: v for k, v in exoplanet.dict().items() if v is not None}

    if len(exoplanet) >= 1:
        update_result = exoplanet_collection.update_one(
            {"_id": id}, {"$set": exoplanet}
        )

        if update_result.modified_count == 1:
            if (
                updated_exoplanet := exoplanet_collection.find_one({"_id": id})
            ) is not None:
                return updated_exoplanet

    if (existing_exoplanet := exoplanet_collection.find_one({"_id": id})) is not None:
        return existing_exoplanet

    raise HTTPException(status_code=404, detail=f"Exoplanet {id} not found")


@router.delete(
    "/exoplanet/{id}", response_description="Delete a exoplanet", tags=["Exoplanet"]
)
def delete_exoplanet_by_id(id: str = ""):
    delete_result = exoplanet_collection.delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"Exoplanet {id} not found")
