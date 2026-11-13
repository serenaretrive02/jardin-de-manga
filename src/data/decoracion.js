// v1.1 · Adornos kawaii en pixel art, dibujados igual que las flores:
// cada dibujo es un array de textos (una fila por texto, una letra por píxel, "." = transparente).

export const PALETA_ADORNOS = {
  K: '#1E2B1F', // contorno
  T: '#8A5A3B', // tallo de la enredadera
  P: '#F49AB0', // pétalo
  p: '#FCD3DC', // pétalo claro
  R: '#D9475F', // centro de la flor
  G: '#6DBE45', // hoja
  g: '#3F8A2E', // hoja oscura
  H: '#9ED36A', // brillo de la hoja
  W: '#FFFFFF', // margarita
  Y: '#FFC83D', // centro amarillo / destello
  y: '#FFE9A0', // destello claro
};

// Enredadera con flores de cerezo para la esquina de las ventanas (28 x 24).
export const ENREDADERA = [
  '.KK.KK....KK............KK..',
  'KppKppK..KHK.....KKK...KHK..',
  'KpPRPpK.KGgK....KpPpK.KGgK..',
  '.KRRRKTTKgKTT...KPRPKTKgK...',
  'KpPRPpK..K...KTTKpPpK..K....',
  'KppKppK.....KgK..KKK........',
  '.KKTKK......KGgK............',
  '...T.........KHK............',
  '...T..........KK............',
  '...T.K......................',
  '...TKgK.....................',
  '...TKGgK....................',
  '..T..KHK....................',
  '..T...KK....................',
  '..T.K.......................',
  '..TKgK......................',
  '..TKGgK.....................',
  '..T.KHK.....................',
  '...T.KK.....................',
  '..KKK.......................',
  '.KpPpK......................',
  '.KPRPK......................',
  '.KpPpK......................',
  '..KKK.......................',
];

// Destello de cuatro puntas (5 x 5).
export const DESTELLO = ['..y..', '..Y..', 'yYWYy', '..Y..', '..y..'];

// Corazón (7 x 6).
export const CORAZON = ['.KK.KK.', 'KpPKPPK', 'KPPPPPK', '.KPPPK.', '..KPK..', '...K...'];

// v1.2 · Flor de cerezo (sakura) para puntuar (7 x 7). Se pinta gris con CSS cuando está "vacía".
export const SAKURA = ['.KK.KK.', 'KpPKPpK', 'KPPRPPK', '.KRYRK.', 'KPPRPPK', 'KpPKPpK', '.KK.KK.'];

// Baldosa de pasto con margaritas (32 x 16). No tiene contorno: el verde de fondo lo pone el CSS.
export const PASTO = [
  '................................',
  '..g.........................W...',
  '.gHg..g.............g......WYW..',
  '.g.g.gHg...W.......gHg......W...',
  '.....g.g..WYW......g.g..........',
  '...........W............g...g...',
  '..................g....gHg.gHg..',
  '....g...g........gHg...g.g.g.g..',
  '...gHg.gHg.......g.g............',
  '...g.g.g.g...........W..........',
  '....................WYW.........',
  '.........W...........W....g.....',
  '........WYW..............gHg....',
  '.........W.....g.........g.g....',
  '..............gHg...............',
  '..............g.g...............',
];

// Convierte un dibujo en una imagen SVG para usarla como fondo que se repite (background-image).
// Usa map dos veces, igual que PixelSprite, pero arma el SVG como texto.
export function spriteComoFondo(filas, paleta) {
  const rects = filas
    .map((fila, y) =>
      fila
        .split('')
        .map((letra, x) => (letra === '.' ? '' : `<rect x='${x}' y='${y}' width='1' height='1' fill='${paleta[letra]}'/>`))
        .join(''),
    )
    .join('');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${filas[0].length} ${filas.length}' shape-rendering='crispEdges'>${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// v1.2 · Gatito dormilón (18 x 10) que duerme la siesta sobre el pasto del pie de página.
// Usa los colores de los adornos más dos propios: O = naranja, o = crema.
export const PALETA_GATO = { ...PALETA_ADORNOS, O: '#F2A45A', o: '#FFF3DF' };
export const GATO = [
  '..K....K..........',
  '.KoK..KoK.........',
  '.KPoKKoPKKKKKKK...',
  'KoooooooKOOOOOOKK.',
  'KoKKoKKoKoOoOoOOOK',
  'KoooPoooKooooOoOOK',
  'KooooooooooooooOOK',
  '.KooooooooooooooOK',
  '.KKoooooooooooOOKK',
  '..KKKKKKKKKKKKKKK.',
];
