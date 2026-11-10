import { useState } from 'react';
import { TIPOS_EVENTO, validarEvento } from '../../data/comunidad';

// Formulario para crear o editar un evento del club.
export default function FormEvento({ inicial, guardando, onGuardar, onCancelar }) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [tipo, setTipo] = useState(inicial?.tipo ?? 'lectura');
  const [fecha, setFecha] = useState(inicial?.fecha ?? '');
  const [lugar, setLugar] = useState(inicial?.lugar ?? '');
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? '');
  const [errores, setErrores] = useState({});

  function manejarEnvio(evento) {
    evento.preventDefault();
    const datos = { titulo, tipo, fecha, lugar, descripcion };
    const nuevos = validarEvento(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onGuardar(datos);
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="evento-titulo">Nombre del evento</label>
        <input
          id="evento-titulo"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Ej: Maratón de Frieren"
          maxLength={90}
          aria-invalid={Boolean(errores.titulo)}
          autoFocus
        />
        {errores.titulo && <p className="campo__error">{errores.titulo}</p>}
      </div>

      <div className="campo-doble">
        <div className="campo">
          <label htmlFor="evento-tipo">Tipo</label>
          <select id="evento-tipo" value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
            {TIPOS_EVENTO.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="evento-fecha">Fecha y hora</label>
          <input
            id="evento-fecha"
            type="datetime-local"
            value={fecha}
            onChange={(evento) => setFecha(evento.target.value.slice(0, 16))}
            aria-invalid={Boolean(errores.fecha)}
          />
        </div>
      </div>
      {errores.fecha && <p className="campo__error">{errores.fecha}</p>}

      <div className="campo">
        <label htmlFor="evento-lugar">Lugar o enlace (opcional)</label>
        <input
          id="evento-lugar"
          value={lugar}
          onChange={(evento) => setLugar(evento.target.value)}
          placeholder="Ej: Discord del club / Biblioteca UADE"
          aria-invalid={Boolean(errores.lugar)}
        />
        {errores.lugar && <p className="campo__error">{errores.lugar}</p>}
      </div>

      <div className="campo">
        <label htmlFor="evento-descripcion">Detalle (opcional)</label>
        <textarea
          id="evento-descripcion"
          value={descripcion}
          onChange={(evento) => setDescripcion(evento.target.value)}
          rows={3}
          aria-invalid={Boolean(errores.descripcion)}
        />
        {errores.descripcion && <p className="campo__error">{errores.descripcion}</p>}
      </div>

      <div className="modal__acciones">
        <button type="button" className="boton" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="boton boton--principal" disabled={guardando}>
          {guardando ? 'Guardando...' : inicial ? 'Guardar' : 'Crear evento'}
        </button>
      </div>
    </form>
  );
}
