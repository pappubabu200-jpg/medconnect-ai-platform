from fastapi import FastAPI
from .routes import draft, summarize, triage
app = FastAPI(title='MedConnect AI')
app.include_router(draft.router, prefix='/v1/ai')
app.include_router(summarize.router, prefix='/v1/ai')
app.include_router(triage.router, prefix='/v1/ai')

@app.get('/health')
def health():
    return {'status':'ok'}
