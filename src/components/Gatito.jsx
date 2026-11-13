import { useEffect, useState } from 'react';
import { CORAZON, GATO, PALETA_ADORNOS, PALETA_GATO } from '../data/decoracion';
import { reproducir } from '../services/sonidos';
import PixelSprite from './PixelSprite';

// v1.2 · Gatito dormilón que duerme sobre el pasto. Si lo tocás, maúlla y aparece un corazón.
export default function Gatito() {
  const [mimado, setMimado] = useState(false);

  // El corazón desaparece solo al segundo. La limpieza cancela el temporizador.
  useEffect(() => {
    if (!mimado) return;
    const temporizador = setTimeout(() => setMimado(false), 1100);
    return () => clearTimeout(temporizador);
  }, [mimado]);

  function mimar() {
    reproducir('miau');
    setMimado(true);
  }

  return (
    <button type="button" className="gatito" onClick={mimar} aria-label="Gatito dormilón: tocalo para mimarlo" title="¡Mimame!">
      {mimado ? (
        <span className="gatito__corazon" aria-hidden="true">
          <PixelSprite filas={CORAZON} paleta={PALETA_ADORNOS} tamano={3} />
        </span>
      ) : (
        <span className="gatito__zzz" aria-hidden="true">
          z<span>z</span>
        </span>
      )}
      <PixelSprite filas={GATO} paleta={PALETA_GATO} tamano={4} />
    </button>
  );
}
