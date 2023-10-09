from fastapi import APIRouter
from backend.apis.joplin.apiwrapper import JoplinNotesAPI

joplinnotes = JoplinNotesAPI()
joplinnotes.validate_and_update_token()

router = APIRouter()


@router.get("/notes")
def get_notes(limit: int = 10):
    return joplinnotes.get_notes(limit)
