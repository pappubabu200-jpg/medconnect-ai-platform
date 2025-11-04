from fastapi import APIRouter
router = APIRouter()

@router.post('/summarize')
async def summarize(body: dict):
    transcript = body.get('transcript', '')
    summary = transcript[:500]
    return {'summary': summary}
