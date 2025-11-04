from fastapi import APIRouter
router = APIRouter()

@router.post('/draft')
async def draft_post(body: dict):
    # simple echo-based draft for POC
    notes = body.get('notes', '')
    tone = body.get('tone', 'professional')
    text = f"Draft ({tone}): {notes[:280]}"
    return {'draft': text}
