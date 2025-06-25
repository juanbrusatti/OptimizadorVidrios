import React, { ReactNode } from 'react';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">VidriosApp</div>
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/stock">Gestión de Stock</a></li>
            <li><a href="/proyectos">Proyectos</a></li>
            <li><a href="/presupuestos">Presupuestos</a></li>
            <li><a href="/precios">Modificar Precios</a></li>
            <li><a href="/optimizador">Optimizador de Cortes</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 