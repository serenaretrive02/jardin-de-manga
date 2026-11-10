import { useEffect, useState } from 'react';
import { GENEROS, MAX_TITULO } from '../data/flores';
import { validarPlanta } from '../data/validaciones';
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
    const nuevosErrores = validarPlanta({ titulo, capitulosTotales, capitulosLeidos });
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
