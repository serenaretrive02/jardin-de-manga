import { CATALOGO_FLORES } from '../../data/flores';
import SpriteFlor from '../SpriteFlor';

// Avatar de cada jardinera: su flor favorita en pixel art.
export default function Avatar({ flor = 'romance', tamano = 2 }) {
  return (
    <span className="avatar">
      <SpriteFlor clave={flor} tamano={tamano} etiqueta={CATALOGO_FLORES[flor]?.nombre} />
    </span>
  );
}
