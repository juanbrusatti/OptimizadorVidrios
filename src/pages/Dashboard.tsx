import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <h1>Bienvenido al Sistema de Gestión de Vidrios</h1>
      <div className="quick-access">
        <a className="quick-btn" href="/stock">Gestión de Stock</a>
        <a className="quick-btn" href="/proyectos">Proyectos en curso</a>
        <a className="quick-btn" href="/presupuestos">Generación de presupuestos</a>
        <a className="quick-btn" href="/optimizador">Optimizador de cortes</a>
        <a className="quick-btn" href="/precios">Administración de precios</a>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 