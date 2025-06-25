from pydantic import BaseModel
from typing import Optional
from datetime import date
import enum

class EstadoPlancha(str, enum.Enum):
    disponible = "disponible"
    usada = "usada"
    rota = "rota"

class PlanchaBase(BaseModel):
    tipo: str
    ancho: int
    alto: int
    fecha_ingreso: date
    estado: EstadoPlancha = EstadoPlancha.disponible

class PlanchaCreate(PlanchaBase):
    pass

class PlanchaOut(PlanchaBase):
    id: int

    class Config:
        orm_mode = True

class PlanchaUpdate(BaseModel):
    tipo: Optional[str] = None
    ancho: Optional[int] = None
    alto: Optional[int] = None
    fecha_ingreso: Optional[date] = None
    estado: Optional[EstadoPlancha] = None 