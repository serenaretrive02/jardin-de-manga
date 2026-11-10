// Dibuja un pixel art a partir de un array de textos.
// Recorre las filas con map, y dentro de cada fila recorre las letras con map:
// cada letra se convierte en un cuadradito <rect> de 1 x 1 del color que indica la paleta.
export default function PixelSprite({ filas, paleta, tamano = 4, etiqueta }) {
  const ancho = filas[0].length;
  const alto = filas.length;

  return (
    <svg
      className="pixel-sprite"
      viewBox={`0 0 ${ancho} ${alto}`}
      width={ancho * tamano}
      height={alto * tamano}
      shapeRendering="crispEdges"
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
    >
      {filas.map((fila, y) =>
        fila.split('').map((letra, x) =>
          letra === '.' ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={paleta[letra]} />
          ),
        ),
      )}
    </svg>
  );
}
