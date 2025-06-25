from sqlalchemy import Column, Integer, String
from app.db.base_class import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    tel = Column(String, nullable=True)
    email = Column(String, nullable=True)
    direccion = Column(String, nullable=True) 