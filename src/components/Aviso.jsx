import { useEffect } from 'react';
import { reproducir } from '../services/sonidos';

// Mensaje flotante de éxito o error. Se cierra solo a los 3,5 segundos.
// onCerrar es el setter setAviso de App: los setters de useState no cambian entre renders,
// por eso el efecto no se reinicia en cada render.
export default function Aviso({ aviso, onCerrar }) {
  // Cada aviso nuevo suena: su sonido propio (plantar, regar...) o el de éxito/error.
  useEffect(() => {
    if (aviso) reproducir(aviso.sonido ?? (aviso.tipo === 'error' ? 'error' : 'exito'));
  }, [aviso]);

  useEffect(() => {
    if (!aviso) return;
    const temporizador = setTimeout(() => onCerrar(null), 3500);
    // Limpieza: si llega otro aviso antes, se cancela el temporizador anterior.
    return () => clearTimeout(temporizador);
  }, [aviso, onCerrar]);

  if (!aviso) return null;

  return (
    <div
      className={`aviso aviso--${aviso.tipo}`}
      role={aviso.tipo === 'error' ? 'alert' : 'status'}
    >
      <span>{aviso.texto}</span>
      <button className="aviso__cerrar" onClick={() => onCerrar(null)} aria-label="Cerrar aviso">
        ×
      </button>
    </div>
  );
}
