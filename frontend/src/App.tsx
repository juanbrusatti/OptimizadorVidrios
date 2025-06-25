import './App.css';
import { FaBoxes, FaProjectDiagram, FaFileInvoiceDollar, FaCut, FaDollarSign, FaHome, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Stock from './pages/Stock';

const sidebarItems = [
  { label: 'Dashboard', icon: <FaHome />, key: 'dashboard', path: '/' },
  { label: 'Stock', icon: <FaBoxes />, key: 'stock', path: '/stock' },
  { label: 'Proyectos', icon: <FaProjectDiagram />, key: 'proyectos', path: '/proyectos' },
  { label: 'Presupuestos', icon: <FaFileInvoiceDollar />, key: 'presupuestos', path: '/presupuestos' },
  { label: 'Optimizador', icon: <FaCut />, key: 'optimizador', path: '/optimizador' },
  { label: 'Precios', icon: <FaDollarSign />, key: 'precios', path: '/precios' },
];

const proyectosRecientes = [
  { cliente: 'Constructora del Sol', proyecto: 'Edificio "Amanecer"', estado: 'En Proceso', fecha: '2025-07-15' },
  { cliente: 'Familia Pérez', proyecto: 'Casa Familiar', estado: 'Terminado', fecha: '2025-06-10' },
];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <main className="main-panel">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Gestión de Stock</span>
            <FaBoxes />
          </div>
          <div className="dashboard-card-main">1,250 Planchas</div>
          <div className="dashboard-card-sub">+320 sobrantes disponibles</div>
          <button className="dashboard-card-btn" onClick={() => navigate('/stock')}>Ir a Stock <span>→</span></button>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Proyectos en Curso</span>
            <FaProjectDiagram />
          </div>
          <div className="dashboard-card-main">12 Proyectos</div>
          <div className="dashboard-card-sub">3 proyectos finalizados este mes</div>
          <button className="dashboard-card-btn">Ver Proyectos <span>→</span></button>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Generar Presupuesto</span>
            <FaFileInvoiceDollar />
          </div>
          <div className="dashboard-card-main">Nuevo Cliente</div>
          <div className="dashboard-card-sub">Crea y envía presupuestos</div>
          <button className="dashboard-card-btn">Crear Presupuesto <span>→</span></button>
        </div>
      </div>
      <div className="dashboard-row">
        <div className="dashboard-block dashboard-block-wide">
          <div className="dashboard-block-header">
            Proyectos Recientes
            <button className="dashboard-block-btn">Ver Todos <span>→</span></button>
          </div>
          <div className="dashboard-block-table">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Fecha de Entrega</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectosRecientes.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{p.cliente}</strong><br />
                      <span className="proyecto-nombre">{p.proyecto}</span>
                    </td>
                    <td><span className={`estado ${p.estado === 'En Proceso' ? 'en-proceso' : 'terminado'}`}>{p.estado}</span></td>
                    <td>{p.fecha}</td>
                    <td><button className="tabla-ver-btn">Ver</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dashboard-block">
          <div className="dashboard-block-header">Optimizador de Cortes</div>
          <div className="dashboard-block-desc">Calcula la distribución óptima de cortes para minimizar el desperdicio.</div>
          <button className="dashboard-block-btn optimizar">✂️ Optimizar un Proyecto</button>
        </div>
        <div className="dashboard-block">
          <div className="dashboard-block-header">Administrar Precios</div>
          <div className="dashboard-block-desc">Actualiza la lista de precios por tipo y espesor de vidrio.</div>
          <button className="dashboard-block-btn">Modificar Precios</button>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [active, setActive] = useState('dashboard');
  const navigate = useNavigate();
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo"><FaBoxes /></span>
          <span className="sidebar-title">Vidriería Acme</span>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <button
              key={item.key}
              className={`sidebar-nav-btn${active === item.key ? ' active' : ''}`}
              onClick={() => { setActive(item.key); navigate(item.path); }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-user"><FaUser /> Usuario Admin</span>
        </div>
      </aside>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </div>
  );
}

export default App;
