from pydantic import BaseModel
from typing import Optional

class ClienteBase(BaseModel):
    nombre: str
    tel: Optional[str] = None
    email: Optional[str] = None
    direccion: Optional[str] = None

class ClienteCreate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    id: int

    class Config:
        orm_mode = True 