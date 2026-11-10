import { CORAZON, DESTELLO, ENREDADERA, PALETA_ADORNOS } from '../data/decoracion';
import PixelSprite from './PixelSprite';

const DIBUJOS = { enredadera: ENREDADERA, destello: DESTELLO, corazon: CORAZON };

// Adorno decorativo en pixel art (enredadera, destello o corazón).
// Es solo decoración: los lectores de pantalla lo ignoran y no recibe clics.
// posicion: clase extra para ubicarlo (por ejemplo "arriba-izq" o "arriba-der").
export default function Adorno({ tipo = 'enredadera', tamano = 3, posicion = '' }) {
  return (
    <span className={`adorno adorno--${tipo} ${posicion ? `adorno--${posicion}` : ''}`} aria-hidden="true">
      <PixelSprite filas={DIBUJOS[tipo]} paleta={PALETA_ADORNOS} tamano={tamano} />
    </span>
  );
}
