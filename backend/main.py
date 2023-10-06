from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000  '
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

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

@app.post('/entries', response_model=JournalEntryModel)
async def create_journal_entry(entry: JournalEntryBase, db: db_dependency):
    db_entry = models.JournalEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

