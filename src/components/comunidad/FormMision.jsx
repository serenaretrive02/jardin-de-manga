import { useState } from 'react';
import { TIPOS_MISION, validarMision } from '../../data/comunidad';

// Formulario de misión (tarea). Solo lo ve la administradora del club.
export default function FormMision({ inicial, miembros, guardando, onGuardar, onCancelar }) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [tipo, setTipo] = useState(inicial?.tipo ?? 'lectura');
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? '');
  const [asignadaA, setAsignadaA] = useState(inicial?.asignadaA ?? '');
  const [fechaLimite, setFechaLimite] = useState(inicial?.fechaLimite ?? '');
  const [errores, setErrores] = useState({});

  function manejarEnvio(evento) {
    evento.preventDefault();
    const datos = { titulo, tipo, descripcion, asignadaA, fechaLimite };
    const nuevos = validarMision(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onGuardar(datos);
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="mision-titulo">Misión</label>
        <input
          id="mision-titulo"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Ej: Leer hasta el capítulo 20"
          maxLength={90}
          aria-invalid={Boolean(errores.titulo)}
          autoFocus
        />
        {errores.titulo && <p className="campo__error">{errores.titulo}</p>}
      </div>

      <div className="campo">
        <span className="campo__etiqueta">Tipo de misión</span>
        <div className="chips" role="radiogroup" aria-label="Tipo de misión">
          {TIPOS_MISION.map((opcion) => (
            <button
              key={opcion.valor}
              type="button"
              role="radio"
              aria-checked={tipo === opcion.valor}
              className="chip"
              style={{ '--chip': opcion.color }}
              onClick={() => setTipo(opcion.valor)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>
      </div>

      <div className="campo-doble">
        <div className="campo">
          <label htmlFor="mision-asignada">Asignar a</label>
          <select
            id="mision-asignada"
            value={asignadaA}
            onChange={(evento) => setAsignadaA(evento.target.value)}
            aria-invalid={Boolean(errores.asignadaA)}
          >
            <option value="">Elegir...</option>
            {miembros.map((miembro) => (
              <option key={miembro.uid} value={miembro.uid}>
                {miembro.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="mision-fecha">Fecha límite</label>
          <input
            id="mision-fecha"
            type="date"
            value={fechaLimite}
            onChange={(evento) => setFechaLimite(evento.target.value)}
          />
        </div>
      </div>
      {errores.asignadaA && <p className="campo__error">{errores.asignadaA}</p>}

      <div className="campo">
        <label htmlFor="mision-descripcion">Detalle (opcional)</label>
        <textarea
          id="mision-descripcion"
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
          {guardando ? 'Guardando...' : inicial ? 'Guardar' : 'Asignar'}
        </button>
      </div>
    </form>
  );
}
