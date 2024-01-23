import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import users, trips, items

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router)
app.include_router(trips.router)
app.include_router(items.router)
