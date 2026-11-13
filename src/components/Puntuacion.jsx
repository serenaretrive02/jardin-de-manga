import { useState } from 'react';
import { PALETA_ADORNOS, SAKURA } from '../data/decoracion';
import PixelSprite from './PixelSprite';

const VALORES = [1, 2, 3, 4, 5];

// v1.2 · Puntuación de 1 a 5 sakuras (flores de cerezo), como las estrellas de Letterboxd.
// - valor: puntuación actual (0 = sin puntuar)
// - onCambiar(n): se llama al tocar una sakura. Si no se pasa, la puntuación es solo para mirar.
// Al pasar el mouse se "pintan" las sakuras hasta esa posición (estado local "previa").
export default function Puntuacion({ valor = 0, onCambiar, deshabilitada = false, titulo = '', tamano = 3 }) {
  const [previa, setPrevia] = useState(0);
  const pintadas = previa || valor;

  if (!onCambiar) {
    return (
      <span className="puntuacion" role="img" aria-label={`${valor} de 5 sakuras`}>
        {VALORES.map((n) => (
          <span key={n} className={`puntuacion__flor ${n <= valor ? 'puntuacion__flor--llena' : ''}`}>
            <PixelSprite filas={SAKURA} paleta={PALETA_ADORNOS} tamano={tamano} />
          </span>
        ))}
      </span>
    );
  }

  return (
    <div
      className="puntuacion"
      role="group"
      aria-label={`Tu puntuación${titulo ? ` para ${titulo}` : ''}`}
      onMouseLeave={() => setPrevia(0)}
    >
      {VALORES.map((n) => (
        <button
          key={n}
          type="button"
          className={`puntuacion__flor ${n <= pintadas ? 'puntuacion__flor--llena' : ''}`}
          aria-pressed={n === valor}
          aria-label={n === valor ? `Quitar la puntuación (${n} de 5)` : `Puntuar con ${n} de 5`}
          title={n === valor ? 'Tocá de nuevo para quitarla' : `${n} de 5`}
          disabled={deshabilitada}
          onMouseEnter={() => setPrevia(n)}
          onClick={() => onCambiar(n)}
        >
          <PixelSprite filas={SAKURA} paleta={PALETA_ADORNOS} tamano={tamano} />
        </button>
      ))}
    </div>
  );
}
