import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Aquí irán las demás rutas: stock, proyectos, etc. */}
      </Routes>
    </Router>
  );
};

export default App;