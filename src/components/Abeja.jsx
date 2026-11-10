import { useEffect, useState } from 'react';
import { ABEJA, ABEJA_PARPADEO, PALETA_ABEJA } from '../data/sprites';
import PixelSprite from './PixelSprite';

// Abeja pixelada que parpadea cada tanto.
// useEffect arranca un temporizador y su limpieza lo detiene al desmontar el componente.
export default function Abeja({ tamano = 3, etiqueta }) {
  const [ojosCerrados, setOjosCerrados] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setOjosCerrados(true);
      setTimeout(() => setOjosCerrados(false), 180);
    }, 3200);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <PixelSprite
      filas={ojosCerrados ? ABEJA_PARPADEO : ABEJA}
      paleta={PALETA_ABEJA}
      tamano={tamano}
      etiqueta={etiqueta}
    />
  );
}
