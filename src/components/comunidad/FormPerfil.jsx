import { useState } from 'react';
import { CATALOGO_FLORES, FLORES_AVATAR } from '../../data/flores';
import { validarPerfil } from '../../data/comunidad';
import Avatar from './Avatar';

// Formulario para crear o editar el perfil público (apodo + flor favorita).
export default function FormPerfil({ inicial, guardando, onGuardar, onCancelar }) {
  const [apodo, setApodo] = useState(inicial?.apodo ?? '');
  const [flor, setFlor] = useState(inicial?.flor ?? 'romance');
  const [errores, setErrores] = useState({});

  function manejarEnvio(evento) {
    evento.preventDefault();
    const nuevos = validarPerfil({ apodo });
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onGuardar({ apodo, flor });
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="perfil-apodo">¿Cómo te llamamos?</label>
        <input
          id="perfil-apodo"
          value={apodo}
          onChange={(evento) => setApodo(evento.target.value)}
          placeholder="Tu apodo"
          maxLength={30}
          aria-invalid={Boolean(errores.apodo)}
          autoFocus
        />
        {errores.apodo ? (
          <p className="campo__error">{errores.apodo}</p>
        ) : (
          <p className="campo__ayuda">Es lo que van a ver los demás en tus clubes.</p>
        )}
      </div>

      <fieldset className="campo selector-flor">
        <legend>Tu flor (avatar)</legend>
        <div className="selector-flor__opciones">
          {FLORES_AVATAR.map((clave) => (
            <label key={clave} className="selector-flor__opcion" title={CATALOGO_FLORES[clave].nombre}>
              <input
                type="radio"
                name="flor"
                value={clave}
                checked={flor === clave}
                onChange={() => setFlor(clave)}
              />
              <Avatar flor={clave} tamano={3} />
              <span className="sr-only">{CATALOGO_FLORES[clave].nombre}</span>
            </label>
          ))}
        </div>
        <p className="campo__ayuda">
          {CATALOGO_FLORES[flor].nombre}: {CATALOGO_FLORES[flor].significado}
        </p>
      </fieldset>

      <div className="modal__acciones">
        {onCancelar && (
          <button type="button" className="boton" onClick={onCancelar}>
            Cancelar
          </button>
        )}
        <button type="submit" className="boton boton--principal" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
