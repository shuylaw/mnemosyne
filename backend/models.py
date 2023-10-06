from database import Base
from sqlalchemy import Column, Integer, String, Boolean

class JournalEntry(Base):
    __tablename__ = 'journal_entries'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    summary = Column(String)
    is_private = Column(Boolean)
    sentiment = Column(Integer)
    date = Column(String)