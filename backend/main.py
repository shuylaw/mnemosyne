from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import desc
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from apis.joplin.endpoints import router as joplin_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(joplin_router, prefix="/joplin")


class JournalEntryBase(BaseModel):
    title: str
    content: str
    summary: str
    is_private: bool
    sentiment: int
    date: str


class JournalEntryModel(JournalEntryBase):
    id: int

    class Config:
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


@app.post("/entry", response_model=JournalEntryModel)
async def create_entry(entry: JournalEntryBase, db: db_dependency):
    db_entry = models.JournalEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@app.get("/entries", response_model=list[JournalEntryModel])
async def read_entries(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = (
        db.query(models.JournalEntry)
        .order_by(desc(models.JournalEntry.id))
        .offset(skip)
        .limit(limit)
        .all()
    )
    return transactions


@app.get("/entry/{entry_id}", response_model=JournalEntryModel)
async def read_entry(entry_id: int, db: db_dependency):
    db_entry = (
        db.query(models.JournalEntry).filter(models.JournalEntry.id == entry_id).first()
    )
    if db_entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return db_entry


@app.patch("/entry/{entry_id}", response_model=JournalEntryModel)
async def update_entry(entry_id: int, entry: JournalEntryBase, db: db_dependency):
    db_entry = (
        db.query(models.JournalEntry).filter(models.JournalEntry.id == entry_id).first()
    )
    if db_entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    for key, value in entry.model_dump().items():
        setattr(db_entry, key, value)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@app.delete("/entry/{entry_id}")
async def delete_entry(entry_id: int, db: db_dependency):
    db_entry = (
        db.query(models.JournalEntry).filter(models.JournalEntry.id == entry_id).first()
    )
    if db_entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(db_entry)
    db.commit()
    return {"message": "Entry deleted successfully"}
