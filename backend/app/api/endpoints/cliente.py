from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.cliente import ClienteCreate, ClienteOut
from app.models.cliente import Cliente
from app.db.session import SessionLocal
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/clientes/", response_model=ClienteOut)
def crear_cliente(cliente: ClienteCreate, db: Session = Depends(get_db)):
    db_cliente = Cliente(**cliente.dict())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@router.get("/clientes/", response_model=List[ClienteOut])
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all() 