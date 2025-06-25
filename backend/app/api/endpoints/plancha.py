from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas.plancha import PlanchaCreate, PlanchaOut, PlanchaUpdate
from app.models.plancha import Plancha
from app.db.session import SessionLocal
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/planchas/", response_model=PlanchaOut)
def crear_plancha(plancha: PlanchaCreate, db: Session = Depends(get_db)):
    db_plancha = Plancha(**plancha.dict())
    db.add(db_plancha)
    db.commit()
    db.refresh(db_plancha)
    return db_plancha

@router.get("/planchas/", response_model=List[PlanchaOut])
def listar_planchas(db: Session = Depends(get_db)):
    return db.query(Plancha).all()

@router.get("/planchas/{plancha_id}", response_model=PlanchaOut)
def obtener_plancha(plancha_id: int, db: Session = Depends(get_db)):
    plancha = db.query(Plancha).filter(Plancha.id == plancha_id).first()
    if not plancha:
        raise HTTPException(status_code=404, detail="Plancha no encontrada")
    return plancha

@router.patch("/planchas/{plancha_id}", response_model=PlanchaOut)
def actualizar_plancha(plancha_id: int, plancha_update: PlanchaUpdate, db: Session = Depends(get_db)):
    plancha = db.query(Plancha).filter(Plancha.id == plancha_id).first()
    if not plancha:
        raise HTTPException(status_code=404, detail="Plancha no encontrada")
    for var, value in vars(plancha_update).items():
        if value is not None:
            setattr(plancha, var, value)
    db.commit()
    db.refresh(plancha)
    return plancha

@router.delete("/planchas/{plancha_id}", response_model=dict)
def eliminar_plancha(plancha_id: int, db: Session = Depends(get_db)):
    plancha = db.query(Plancha).filter(Plancha.id == plancha_id).first()
    if not plancha:
        raise HTTPException(status_code=404, detail="Plancha no encontrada")
    db.delete(plancha)
    db.commit()
    return {"ok": True}

@router.get("/planchas/estado/{estado}", response_model=List[PlanchaOut])
def listar_planchas_por_estado(estado: str, db: Session = Depends(get_db)):
    return db.query(Plancha).filter(Plancha.estado == estado).all() 