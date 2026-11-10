import { useEffect } from 'react';
import Ventana from './Ventana';

// Ventana emergente reutilizable: fondo oscuro + ventana retro en el centro.
// Se cierra con Escape, tocando afuera o desde los botones del formulario.
export default function Modal({ titulo, onCerrar, children }) {
  useEffect(() => {
    function alApretarTecla(evento) {
      if (evento.key === 'Escape') onCerrar();
    }
    window.addEventListener('keydown', alApretarTecla);
    return () => window.removeEventListener('keydown', alApretarTecla); // limpieza
  }, [onCerrar]);

  return (
    <div className="modal-fondo" onClick={onCerrar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(evento) => evento.stopPropagation()}
      >
        <Ventana titulo={titulo}>{children}</Ventana>
      </div>
    </div>
  );
}
