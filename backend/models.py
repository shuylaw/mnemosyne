from database import Base
from sqlalchemy import Column, Integer, String, Boolean

class JournalEntry(Base):
    __tablename__ = 'journal_entries'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default='Untitled')
    content = Column(String)
    summary = Column(String, nullable=True, default=None)
    is_private = Column(Boolean, default=False)
    sentiment = Column(Integer, nullable=True, default=None)
    date = Column(String)