import { ICONOS, PALETA_BASE } from '../../data/sprites';
import PixelSprite from '../PixelSprite';

// Lápiz pixelado (el mismo que en las tarjetas del jardín).
export default function IconoEditar() {
  return <PixelSprite filas={ICONOS.lapiz} paleta={PALETA_BASE} tamano={2} />;
}
