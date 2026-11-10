import { useState } from 'react';
import { FLORES, GENEROS, MAX_TITULO } from '../data/flores';
import { validarPlanta } from '../data/validaciones';
import BuscadorObras from './BuscadorObras';
import SpriteFlor from './SpriteFlor';
import Ventana from './Ventana';

// Formulario para "plantar" un manga o anime nuevo.
// Se puede completar buscando en la API (Kitsu) o escribiendo a mano.
export default function FormularioPlanta({ onAgregar, guardando }) {
  const [tipo, setTipo] = useState('manga');
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('romance');
  const [capitulosTotales, setCapitulosTotales] = useState('');
  const [obra, setObra] = useState(null); // obra elegida en la API (portada e id)
  const [errores, setErrores] = useState({});

  function cambiarTipo(nuevoTipo) {
    setTipo(nuevoTipo);
    setObra(null); // una obra de manga no sirve si ahora elegimos anime
  }

  // Cuando se elige un resultado del buscador, se completan los campos.
  function elegirObra(elegida) {
    setTitulo(elegida.titulo.slice(0, MAX_TITULO));
    setCapitulosTotales(elegida.capitulos ? String(elegida.capitulos) : '');
    setGenero(elegida.genero);
    setObra(elegida);
    setErrores({});
  }

  async function manejarEnvio(evento) {
    evento.preventDefault(); // evita que el formulario recargue la página

    const nuevosErrores = validarPlanta({ titulo, capitulosTotales });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return; // hay errores: no se envía

    const ok = await onAgregar({
      titulo: titulo.trim(),
      tipo,
      genero,
      capitulosLeidos: 0,
      capitulosTotales: Number(capitulosTotales) || 0,
      estado: 'pendiente',
      // Solo si vino de la API, se guardan la portada y el id de Kitsu
      ...(obra && { kitsuId: obra.kitsuId }),
      ...(obra?.portada && { portada: obra.portada }),
    });

    if (ok) {
      setTitulo('');
      setCapitulosTotales('');
      setObra(null);
    }
  }

  const flor = FLORES[genero];
  const palabra = tipo === 'anime' ? 'Episodios' : 'Capítulos';

  return (
    <Ventana titulo="plantar.exe" className="ventana--formulario">
      <div className="selector-tipo" role="group" aria-label="¿Qué vas a plantar?">
        {['manga', 'anime'].map((opcion) => (
          <button
            key={opcion}
            type="button"
            className="selector-tipo__opcion"
            aria-pressed={tipo === opcion}
            onClick={() => cambiarTipo(opcion)}
          >
            {opcion === 'manga' ? 'Manga' : 'Anime'}
          </button>
        ))}
      </div>

      <BuscadorObras tipo={tipo} onElegir={elegirObra} />

      <p className="separador">
        <span>{obra ? 'revisá los datos' : 'o completalo a mano'}</span>
      </p>

      <form className="formulario" onSubmit={manejarEnvio} noValidate>
        {obra && (
          <div className="obra-elegida">
            {obra.portada && <img src={obra.portada} alt="" />}
            <p>
              Datos traídos de <strong>Kitsu</strong>
              <br />
              <span className="campo__ayuda">Podés corregir cualquier campo.</span>
            </p>
            <button type="button" className="boton boton--chico" onClick={() => setObra(null)}>
              Quitar
            </button>
          </div>
        )}

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
            <label htmlFor="capitulos">{palabra}</label>
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
        </div>
        {errores.capitulos ? (
          <p className="campo__error">{errores.capitulos}</p>
        ) : (
          <p className="campo__ayuda">Si no sabés cuántos son (o sigue en emisión), dejalo vacío.</p>
        )}

        <div className="vista-previa">
          <SpriteFlor clave={genero} tamano={4} etiqueta={`Vista previa: ${flor.nombre}`} />
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
