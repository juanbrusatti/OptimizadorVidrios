from sqlalchemy import Column, Integer, String, Date, Enum
from app.db.base_class import Base
import enum

class EstadoPlancha(str, enum.Enum):
    disponible = "disponible"
    usada = "usada"
    rota = "rota"

class Plancha(Base):
    __tablename__ = "planchas"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, nullable=False)
    ancho = Column(Integer, nullable=False)
    alto = Column(Integer, nullable=False)
    fecha_ingreso = Column(Date, nullable=False)
    estado = Column(Enum(EstadoPlancha), default=EstadoPlancha.disponible, nullable=False)
    es_sobrante = Column(Integer, default=0, nullable=False)  # 0 = False, 1 = True 