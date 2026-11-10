import { useState } from 'react';
import { validarClub } from '../../data/comunidad';

// Formulario para crear o editar un club de lectura.
export default function FormClub({ inicial, guardando, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '');
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? '');
  const [errores, setErrores] = useState({});

  function manejarEnvio(evento) {
    evento.preventDefault();
    const nuevos = validarClub({ nombre, descripcion });
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onGuardar({ nombre, descripcion });
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="club-nombre">Nombre del club</label>
        <input
          id="club-nombre"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Ej: Club Shojo de los viernes"
          maxLength={50}
          aria-invalid={Boolean(errores.nombre)}
          autoFocus
        />
        {errores.nombre && <p className="campo__error">{errores.nombre}</p>}
      </div>
      <div className="campo">
        <label htmlFor="club-descripcion">Descripción (opcional)</label>
        <textarea
          id="club-descripcion"
          value={descripcion}
          onChange={(evento) => setDescripcion(evento.target.value)}
          placeholder="¿Qué leen? ¿Cuándo se juntan?"
          rows={3}
          aria-invalid={Boolean(errores.descripcion)}
        />
        <p className={errores.descripcion ? 'campo__error' : 'campo__ayuda'}>
          {errores.descripcion ?? `${descripcion.trim().length} / 200`}
        </p>
      </div>
      {!inicial && (
        <p className="campo__ayuda">
          Vas a ser la <strong>administradora</strong>: la única que puede asignar misiones.
        </p>
      )}
      <div className="modal__acciones">
        <button type="button" className="boton" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="boton boton--principal" disabled={guardando}>
          {guardando ? 'Guardando...' : inicial ? 'Guardar' : 'Crear club'}
        </button>
      </div>
    </form>
  );
}
