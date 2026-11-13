import { useEffect, useState } from 'react';
import { GENEROS, MAX_RESENA, MAX_TITULO } from '../data/flores';
import { validarPlanta, validarResena } from '../data/validaciones';
import Puntuacion from './Puntuacion';
import Ventana from './Ventana';

// Ventana emergente para corregir los datos de una planta ya plantada.
export default function EditarPlanta({ planta, guardando, onGuardar, onCancelar }) {
  // El formulario arranca con los valores actuales de la planta.
  const [titulo, setTitulo] = useState(planta.titulo);
  const [genero, setGenero] = useState(planta.genero);
  const [capitulosLeidos, setCapitulosLeidos] = useState(String(planta.capitulosLeidos));
  const [capitulosTotales, setCapitulosTotales] = useState(
    planta.capitulosTotales > 0 ? String(planta.capitulosTotales) : '',
  );
  // v1.2 · Puntuación y reseña (solo se muestran si la historia terminó o ya tenía una).
  const [puntuacion, setPuntuacion] = useState(planta.puntuacion ?? 0);
  const [resena, setResena] = useState(planta.resena ?? '');
  const conResena =
    planta.estado === 'terminado' || planta.estado === 'abandonado' || Boolean(planta.puntuacion || planta.resena);
  const [errores, setErrores] = useState({});

  // Cerrar con la tecla Escape. La limpieza quita el "escuchador" al cerrar la ventana.
  useEffect(() => {
    function alApretarTecla(evento) {
      if (evento.key === 'Escape') onCancelar();
    }
    window.addEventListener('keydown', alApretarTecla);
    return () => window.removeEventListener('keydown', alApretarTecla);
  }, [onCancelar]);

  function manejarEnvio(evento) {
    evento.preventDefault();
    const nuevosErrores = {
      ...validarPlanta({ titulo, capitulosTotales, capitulosLeidos }),
      ...(conResena ? validarResena({ resena }) : {}),
    };
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const leidos = Number(capitulosLeidos) || 0;
    const totales = Number(capitulosTotales) || 0;
    const cambios = { titulo: titulo.trim(), genero, capitulosLeidos: leidos, capitulosTotales: totales };

    // El estado tiene que seguir siendo coherente con los capítulos:
    // si estaba en flor pero ahora faltan capítulos, vuelve a "leyendo";
    // si los capítulos llegaron al total, florece.
    if (planta.estado === 'terminado' && totales > 0 && leidos < totales) cambios.estado = 'leyendo';
    if (planta.estado !== 'abandonado' && totales > 0 && leidos === totales) cambios.estado = 'terminado';

    // null = borrar el campo en Firestore (sin puntuación o reseña vacía).
    if (conResena) {
      cambios.puntuacion = puntuacion || null;
      cambios.resena = resena.trim() || null;
    }

    onGuardar(cambios);
  }

  const palabra = planta.tipo === 'anime' ? 'Episodios' : 'Capítulos';

  return (
    <div className="modal-fondo" onClick={onCancelar}>
      {/* stopPropagation: un clic dentro de la ventana no la cierra */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Editar ${planta.titulo}`}
        onClick={(evento) => evento.stopPropagation()}
      >
        <Ventana titulo="editar.exe">
          <form className="formulario" onSubmit={manejarEnvio} noValidate>
            <div className="campo">
              <label htmlFor="editar-titulo">Título</label>
              <input
                id="editar-titulo"
                value={titulo}
                onChange={(evento) => setTitulo(evento.target.value)}
                maxLength={MAX_TITULO + 20}
                aria-invalid={Boolean(errores.titulo)}
                autoFocus
              />
              {errores.titulo && <p className="campo__error">{errores.titulo}</p>}
            </div>

            <div className="campo">
              <label htmlFor="editar-genero">Género (cambia la flor)</label>
              <select
                id="editar-genero"
                value={genero}
                onChange={(evento) => setGenero(evento.target.value)}
              >
                {GENEROS.map((opcion) => (
                  <option key={opcion.valor} value={opcion.valor}>
                    {opcion.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo-doble">
              <div className="campo">
                <label htmlFor="editar-leidos">{palabra} vistos</label>
                <input
                  id="editar-leidos"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={capitulosLeidos}
                  onChange={(evento) => setCapitulosLeidos(evento.target.value)}
                  aria-invalid={Boolean(errores.leidos)}
                />
              </div>
              <div className="campo">
                <label htmlFor="editar-totales">Total</label>
                <input
                  id="editar-totales"
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
            {(errores.leidos || errores.capitulos) && (
              <p className="campo__error">{errores.leidos || errores.capitulos}</p>
            )}

            {conResena && (
              <fieldset className="resena">
                <legend>Tu reseña</legend>
                <div className="campo">
                  <span className="campo__etiqueta" id="editar-puntuacion">Puntuación</span>
                  <Puntuacion
                    valor={puntuacion}
                    onCambiar={(n) => setPuntuacion(n === puntuacion ? 0 : n)}
                    titulo={titulo}
                  />
                  <p className="campo__ayuda">
                    {puntuacion ? `${puntuacion} de 5 sakuras · tocá la misma para quitarla` : 'Sin puntuar'}
                  </p>
                </div>
                <div className="campo">
                  <label htmlFor="editar-resena">¿Qué te pareció? (opcional)</label>
                  <textarea
                    id="editar-resena"
                    rows={3}
                    value={resena}
                    onChange={(evento) => {
                      setResena(evento.target.value);
                      // al corregir el texto se borra el error y vuelve a verse el contador
                      if (errores.resena) setErrores(({ resena: _quitado, ...resto }) => resto);
                    }}
                    placeholder="Ej: El final me hizo llorar"
                    maxLength={MAX_RESENA + 40}
                    aria-invalid={Boolean(errores.resena)}
                    aria-describedby="resena-ayuda"
                  />
                  <p id="resena-ayuda" className={errores.resena ? 'campo__error' : 'campo__ayuda'}>
                    {errores.resena ?? `${resena.trim().length} / ${MAX_RESENA}`}
                  </p>
                </div>
              </fieldset>
            )}

            <div className="modal__acciones">
              <button type="button" className="boton" onClick={onCancelar}>
                Cancelar
              </button>
              <button type="submit" className="boton boton--principal" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </Ventana>
      </div>
    </div>
  );
}
