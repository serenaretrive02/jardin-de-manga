import { useState } from 'react';
import { GENEROS } from '../data/flores';

// Formulario para "plantar" un manga o anime nuevo.
export default function FormularioPlanta({ onAgregar, guardando }) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('manga');
  const [genero, setGenero] = useState('romance');
  const [capitulosTotales, setCapitulosTotales] = useState('');

  async function manejarEnvio(evento) {
    evento.preventDefault(); // evita que el formulario recargue la página

    const ok = await onAgregar({
      titulo: titulo.trim(),
      tipo,
      genero,
      capitulosLeidos: 0,
      capitulosTotales: Number(capitulosTotales) || 0,
      estado: 'pendiente',
    });

    if (ok) {
      setTitulo('');
      setCapitulosTotales('');
    }
  }

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Plantar algo nuevo</h2>

      <label>
        Título
        <input
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          required
        />
      </label>

      <label>
        Tipo
        <select value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
          <option value="manga">Manga</option>
          <option value="anime">Anime</option>
        </select>
      </label>

      <label>
        Género
        <select value={genero} onChange={(evento) => setGenero(evento.target.value)}>
          {GENEROS.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.etiqueta}
            </option>
          ))}
        </select>
      </label>

      <label>
        Capítulos totales
        <input
          type="number"
          min="0"
          value={capitulosTotales}
          onChange={(evento) => setCapitulosTotales(evento.target.value)}
        />
      </label>

      <button type="submit" disabled={guardando}>
        {guardando ? 'Guardando...' : 'Plantar'}
      </button>
    </form>
  );
}
