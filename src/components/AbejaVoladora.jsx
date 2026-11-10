import Abeja from './Abeja';

// Abeja decorativa que revolotea por los costados de la pantalla.
// Es solo decoración: no se puede tocar (pointer-events: none) y los lectores de pantalla la ignoran.
// Si la persona pidió "reducir movimiento" en su sistema, la animación se apaga (ver CSS).
export default function AbejaVoladora() {
  return (
    <div className="abeja-voladora" aria-hidden="true">
      <div className="abeja-voladora__aleteo">
        <Abeja tamano={2} />
      </div>
    </div>
  );
}
