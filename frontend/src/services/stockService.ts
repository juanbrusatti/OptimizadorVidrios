export async function fetchPlanchas() {
  const res = await fetch('http://localhost:8000/planchas/');
  if (!res.ok) throw new Error('Error al obtener planchas');
  return res.json();
}

export async function createPlancha(plancha: any) {
  const res = await fetch('http://localhost:8000/planchas/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plancha),
  });
  if (!res.ok) throw new Error('Error al crear plancha');
  return res.json();
}

export async function updatePlancha(id: number, plancha: any) {
  const res = await fetch(`http://localhost:8000/planchas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plancha),
  });
  if (!res.ok) throw new Error('Error al actualizar plancha');
  return res.json();
}

export async function deletePlancha(id: number) {
  const res = await fetch(`http://localhost:8000/planchas/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar plancha');
  return res.json();
} 