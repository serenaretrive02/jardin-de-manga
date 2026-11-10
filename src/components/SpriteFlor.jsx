import { CATALOGO_FLORES } from '../data/flores';
import { PALETA_BASE, spriteDeEtapa } from '../data/sprites';
import PixelSprite from './PixelSprite';

// Dibuja una flor del catálogo (rosa, girasol, loto...) en la etapa indicada.
// clave: la clave del catálogo; etapa: semilla, brote, creciendo, flor o marchita.
export default function SpriteFlor({ clave = 'romance', etapa = 'flor', tamano = 4, etiqueta }) {
  const flor = CATALOGO_FLORES[clave] ?? CATALOGO_FLORES.romance;
  return (
    <PixelSprite
      filas={spriteDeEtapa(etapa, flor.forma)}
      paleta={{ ...PALETA_BASE, ...flor.colores }}
      tamano={tamano}
      etiqueta={etiqueta}
    />
  );
}
