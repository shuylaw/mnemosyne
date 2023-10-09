from fastapi import APIRouter
from apis.joplin.apiwrapper import JoplinNotesAPI

joplinnotes = JoplinNotesAPI("notoken")
joplinnotes.validate_and_update_token()

router = APIRouter()


@router.get("/notes")
def get_notes(limit: int = 10):
    print("get_notes")
    response = joplinnotes.get_notes(limit)
    return response
