from fastapi import FastAPI
from app.api.endpoints import cliente, plancha

app = FastAPI(title="Sistema de Gestión de Vidrios")

app.include_router(cliente.router, prefix="/api", tags=["clientes"])
app.include_router(plancha.router, prefix="/api", tags=["planchas"])

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido al sistema de gestión de vidrios"}
