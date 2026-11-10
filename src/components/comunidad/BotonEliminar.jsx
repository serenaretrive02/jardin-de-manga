import { useState } from 'react';

// Botón de eliminar que pide confirmación en dos pasos.
export default function BotonEliminar({ etiqueta, disabled, onConfirmar, texto = '✕' }) {
  const [confirmando, setConfirmando] = useState(false);
  if (confirmando) {
    return (
      <span className="confirmar">
        <span>¿Borrar?</span>
        <button className="boton boton--chico boton--peligro" disabled={disabled} onClick={onConfirmar}>
          Sí
        </button>
        <button className="boton boton--chico" onClick={() => setConfirmando(false)}>
          No
        </button>
      </span>
    );
  }
  return (
    <button
      className="boton boton--chico boton--icono-chico"
      disabled={disabled}
      onClick={() => setConfirmando(true)}
      aria-label={`Eliminar ${etiqueta}`}
      title="Eliminar"
    >
      {texto}
    </button>
  );
}
