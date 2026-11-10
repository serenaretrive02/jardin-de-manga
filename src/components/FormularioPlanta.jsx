import { useState } from 'react';
import { FLORES, GENEROS, MAX_CAPITULOS, MAX_TITULO } from '../data/flores';
import { PALETA_BASE, spriteDeEtapa } from '../data/sprites';
import PixelSprite from './PixelSprite';
import Ventana from './Ventana';

// Revisa los datos antes de enviarlos. Devuelve un objeto con los errores encontrados.
function validar(titulo, capitulosTotales) {
  const errores = {};
  const tituloLimpio = titulo.trim();

  if (tituloLimpio === '') {
    errores.titulo = 'Escribí el nombre del manga o anime.';
  } else if (tituloLimpio.length > MAX_TITULO) {
    errores.titulo = `El título puede tener hasta ${MAX_TITULO} caracteres.`;
  }

  if (capitulosTotales !== '') {
    const numero = Number(capitulosTotales);
    if (!Number.isInteger(numero) || numero < 0) {
      errores.capitulos = 'Usá un número entero, sin decimales ni negativos.';
    } else if (numero > MAX_CAPITULOS) {
      errores.capitulos = `Como máximo ${MAX_CAPITULOS} capítulos.`;
    }
  }

  return errores;
}

// Formulario para "plantar" un manga o anime nuevo.
export default function FormularioPlanta({ onAgregar, guardando }) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('manga');
  const [genero, setGenero] = useState('romance');
  const [capitulosTotales, setCapitulosTotales] = useState('');
  const [errores, setErrores] = useState({});

  async function manejarEnvio(evento) {
    evento.preventDefault(); // evita que el formulario recargue la página

    const nuevosErrores = validar(titulo, capitulosTotales);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return; // hay errores: no se envía

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

  const flor = FLORES[genero];

  return (
    <Ventana titulo="plantar.exe" className="ventana--formulario">
      <form className="formulario" onSubmit={manejarEnvio} noValidate>
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            placeholder="Ej: Frieren"
            maxLength={MAX_TITULO + 20}
            aria-invalid={Boolean(errores.titulo)}
            aria-describedby="titulo-ayuda"
          />
          <p id="titulo-ayuda" className={errores.titulo ? 'campo__error' : 'campo__ayuda'}>
            {errores.titulo ?? `${titulo.trim().length} / ${MAX_TITULO}`}
          </p>
        </div>

        <div className="campo-doble">
          <div className="campo">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
              <option value="manga">Manga</option>
              <option value="anime">Anime</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="capitulos">{tipo === 'anime' ? 'Episodios' : 'Capítulos'}</label>
            <input
              id="capitulos"
              type="number"
              inputMode="numeric"
              min="0"
              value={capitulosTotales}
              onChange={(evento) => setCapitulosTotales(evento.target.value)}
              placeholder="?"
              aria-invalid={Boolean(errores.capitulos)}
            />
          </div>
        </div>
        {errores.capitulos ? (
          <p className="campo__error">{errores.capitulos}</p>
        ) : (
          <p className="campo__ayuda">Si no sabés cuántos son, dejalo vacío.</p>
        )}

        <div className="campo">
          <label htmlFor="genero">Género</label>
          <select id="genero" value={genero} onChange={(evento) => setGenero(evento.target.value)}>
            {GENEROS.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="vista-previa">
          <PixelSprite
            filas={spriteDeEtapa('flor')}
            paleta={{ ...PALETA_BASE, ...flor.colores }}
            tamano={4}
            etiqueta={`Vista previa: ${flor.nombre}`}
          />
          <p>
            Cuando lo termines va a florecer como <strong>{flor.nombre}</strong>.
          </p>
        </div>

        <button type="submit" className="boton boton--principal" disabled={guardando}>
          {guardando ? 'Plantando...' : 'Plantar'}
        </button>
      </form>
    </Ventana>
  );
}
