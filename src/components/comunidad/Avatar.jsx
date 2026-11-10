import { FLORES } from '../../data/flores';
import { PALETA_BASE, spriteDeEtapa } from '../../data/sprites';
import PixelSprite from '../PixelSprite';

// Avatar de cada jardinera: su flor favorita en pixel art.
export default function Avatar({ flor = 'romance', tamano = 2 }) {
  return (
    <span className="avatar">
      <PixelSprite
        filas={spriteDeEtapa('flor')}
        paleta={{ ...PALETA_BASE, ...(FLORES[flor] ?? FLORES.romance).colores }}
        tamano={tamano}
      />
    </span>
  );
}
