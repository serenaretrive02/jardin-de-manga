import { useState } from 'react';
import { FLORES, GENEROS } from '../../data/flores';
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
          {GENEROS.map((genero) => (
            <label key={genero.valor} className="selector-flor__opcion" title={FLORES[genero.valor].nombre}>
              <input
                type="radio"
                name="flor"
                value={genero.valor}
                checked={flor === genero.valor}
                onChange={() => setFlor(genero.valor)}
              />
              <Avatar flor={genero.valor} tamano={3} />
              <span className="sr-only">{FLORES[genero.valor].nombre}</span>
            </label>
          ))}
        </div>
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
