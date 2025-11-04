from fastapi import APIRouter
router = APIRouter()

@router.post('/triage')
async def triage(body: dict):
    q = body.get('question', '')
    # rudimentary triage
    if 'chest pain' in q.lower():
        return {'level': 'emergency', 'advice': 'Seek immediate care'}
    return {'level': 'non-urgent', 'advice': 'Schedule consult'}
