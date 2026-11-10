import { useState } from 'react';
import { cambiarSonido, reproducir, sonidoActivado } from '../services/sonidos';
import PixelSprite from './PixelSprite';

const PALETA = { K: '#1E2B1F', W: '#FFFFFF', R: '#E8453C' };
// Parlante pixelado (10 x 8) con ondas o con una cruz.
const CON_SONIDO = [
  '...K......',
  '..KK...K..',
  'KKWK.K..K.',
  'KWWK..K.K.',
  'KWWK..K.K.',
  'KKWK.K..K.',
  '..KK...K..',
  '...K......',
];
const SIN_SONIDO = [
  '...K......',
  '..KK......',
  'KKWK.R..R.',
  'KWWK..RR..',
  'KWWK..RR..',
  'KKWK.R..R.',
  '..KK......',
  '...K......',
];

// Botón para activar o apagar los sonidos.
export default function BotonSonido() {
  const [activo, setActivo] = useState(sonidoActivado);

  function alternar() {
    const nuevo = !activo;
    cambiarSonido(nuevo);
    setActivo(nuevo);
    if (nuevo) reproducir('exito');
  }

  return (
    <button
      className="boton boton--chico boton-sonido"
      onClick={alternar}
      aria-pressed={activo}
      title={activo ? 'Apagar sonidos' : 'Activar sonidos'}
    >
      <PixelSprite filas={activo ? CON_SONIDO : SIN_SONIDO} paleta={PALETA} tamano={3} />
      <span>{activo ? 'Sonido' : 'Silencio'}</span>
    </button>
  );
}
