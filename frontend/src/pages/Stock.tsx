import React, { useEffect, useState } from 'react';
import './Stock.css';
import { fetchPlanchas, createPlancha, updatePlancha, deletePlancha } from '../services/stockService';

interface Plancha {
  id?: number;
  tipo: string;
  ancho: number;
  alto: number;
  fecha_ingreso: string;
  estado: string;
  es_sobrante: boolean;
}

const initialForm: Plancha = {
  tipo: '',
  ancho: 0,
  alto: 0,
  fecha_ingreso: '',
  estado: 'disponible',
  es_sobrante: false,
};

export default function Stock() {
  const [planchas, setPlanchas] = useState<Plancha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Plancha>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [formType, setFormType] = useState<'completa' | 'sobrante'>('completa');

  const load = () => {
    setLoading(true);
    fetchPlanchas()
      .then(data => {
        setPlanchas(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el stock');
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const planchasCompletas = planchas.filter(p => !p.es_sobrante);
  const sobrantes = planchas.filter(p => p.es_sobrante);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let val: string | number | boolean = value;
    if (type === 'checkbox' && 'checked' in e.target) {
      val = (e.target as HTMLInputElement).checked;
    }
    setForm(f => ({
      ...f,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePlancha(editId, form);
      } else {
        await createPlancha(form);
      }
      setForm(initialForm);
      setEditId(null);
      load();
    } catch {
      setError('Error al guardar');
    }
  };

  const handleEdit = (p: Plancha) => {
    setForm({ ...p });
    setEditId(p.id!);
    setFormType(p.es_sobrante ? 'sobrante' : 'completa');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    await deletePlancha(id);
    load();
  };

  if (loading) return <div className="stock-page">Cargando stock...</div>;
  if (error) return <div className="stock-page">{error}</div>;

  return (
    <div className="stock-page">
      <h2>Agregar/Editar Plancha o Sobrante</h2>
      <form className="stock-form" onSubmit={handleSubmit}>
        <select name="es_sobrante" value={formType} onChange={e => {
          setFormType(e.target.value as 'completa' | 'sobrante');
          setForm(f => ({ ...f, es_sobrante: e.target.value === 'sobrante' }));
        }}>
          <option value="completa">Plancha Completa</option>
          <option value="sobrante">Sobrante</option>
        </select>
        <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" required />
        <input name="ancho" type="number" value={form.ancho} onChange={handleChange} placeholder="Ancho (mm)" required />
        <input name="alto" type="number" value={form.alto} onChange={handleChange} placeholder="Alto (mm)" required />
        <input name="fecha_ingreso" type="date" value={form.fecha_ingreso} onChange={handleChange} required />
        <select name="estado" value={form.estado} onChange={handleChange} required>
          <option value="disponible">Disponible</option>
          <option value="usada">Usada</option>
          <option value="rota">Rota</option>
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setForm(initialForm); setEditId(null); }}>Cancelar</button>}
      </form>

      <h2>Stock de Planchas Completas</h2>
      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Ancho</th>
              <th>Alto</th>
              <th>Fecha Ingreso</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planchasCompletas.map((p) => (
              <tr key={p.id}>
                <td>{p.tipo}</td>
                <td>{p.ancho} mm</td>
                <td>{p.alto} mm</td>
                <td>{p.fecha_ingreso}</td>
                <td>{p.estado}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id!)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{marginTop: '2.5rem'}}>Stock de Sobrantes</h2>
      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Ancho</th>
              <th>Alto</th>
              <th>Fecha Ingreso</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sobrantes.map((s) => (
              <tr key={s.id}>
                <td>{s.tipo}</td>
                <td>{s.ancho} mm</td>
                <td>{s.alto} mm</td>
                <td>{s.fecha_ingreso}</td>
                <td><span className={`sobrante-estado ${s.estado === 'disponible' ? 'disponible' : 'reservado'}`}>{s.estado}</span></td>
                <td>
                  <button onClick={() => handleEdit(s)}>Editar</button>
                  <button onClick={() => handleDelete(s.id!)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 