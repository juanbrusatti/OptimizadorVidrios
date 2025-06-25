from app.db.session import engine
from app.models import cliente, plancha
from app.db.base_class import Base

# Importa aquí todos los modelos para que Base los registre

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Base de datos inicializada y tablas creadas.") 