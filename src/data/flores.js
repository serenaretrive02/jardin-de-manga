// Catálogo de flores de Nana (v0.4.1).
// - forma: qué dibujo usa (ver CABEZAS en sprites.js)
// - colores: pintan las letras P, p, C y c del dibujo
// - japones / significado: su sentido según el hanakotoba, el lenguaje japonés de las flores
// - genero: el género de manga/anime que la hace florecer (las 3 últimas son solo avatares)
export const CATALOGO_FLORES = {
  romance: {
    nombre: 'Rosa',
    forma: 'rosa',
    colores: { P: '#F06A8A', p: '#C2415F', C: '#FFD1DC', c: '#C2415F' },
    japones: 'bara',
    significado: 'Amor. Es la flor de las historias de romance.',
    genero: 'Romance',
  },
  accion: {
    nombre: 'Girasol',
    forma: 'girasol',
    colores: { P: '#FFC83D', p: '#E09A12', C: '#9A5B22', c: '#5C3511' },
    japones: 'himawari',
    significado: 'Admiración y energía: siempre mira hacia el sol, como un protagonista que no se rinde.',
    genero: 'Acción',
  },
  fantasia: {
    nombre: 'Tulipán violeta',
    forma: 'tulipan',
    colores: { P: '#B58CFF', p: '#8458D6', C: '#FFE58A', c: '#8458D6' },
    japones: 'chūrippu',
    significado: 'Amor eterno y nobleza, como los reinos de fantasía.',
    genero: 'Fantasía',
  },
  comedia: {
    nombre: 'Margarita',
    forma: 'margarita',
    colores: { P: '#FFFFFF', p: '#D9DDE3', C: '#FFC83D', c: '#E09A12' },
    japones: 'deijī',
    significado: 'Inocencia y alegría: ideal para las comedias que te sacan una sonrisa.',
    genero: 'Comedia',
  },
  drama: {
    nombre: 'Flor de cerezo',
    forma: 'cerezo',
    colores: { P: '#FFB7D0', p: '#E68AAE', C: '#C2415F', c: '#C2415F' },
    japones: 'sakura',
    significado: 'La belleza de lo que dura poco: la flor de las historias que emocionan.',
    genero: 'Drama',
  },
  misterio: {
    nombre: 'Hibisco',
    forma: 'hibisco',
    colores: { P: '#E8453C', p: '#A92B25', C: '#FFD23F', c: '#A92B25' },
    japones: 'haibisukasu',
    significado: 'Belleza delicada que esconde algo más: perfecta para el misterio.',
    genero: 'Misterio',
  },
  estrella: {
    nombre: 'Flor estelar',
    forma: 'estrella',
    colores: { P: '#9FE7F5', p: '#4FB3D9', C: '#FFE58A', c: '#E09A12' },
    japones: 'inventada',
    significado: 'Flor inventada de Nana: guarda los deseos para el próximo capítulo.',
    genero: null,
  },
  campanilla: {
    nombre: 'Campanilla',
    forma: 'campanilla',
    colores: { P: '#7C8CF8', p: '#4B58C4', C: '#FFFFFF', c: '#4B58C4' },
    japones: 'kikyō',
    significado: 'Amor que no cambia y honestidad.',
    genero: null,
  },
  loto: {
    nombre: 'Loto',
    forma: 'loto',
    colores: { P: '#FFD1DC', p: '#F06A8A', C: '#FFE58A', c: '#E09A12' },
    japones: 'hasu',
    significado: 'Pureza y volver a empezar: florece aunque nazca en el barro.',
    genero: null,
  },
};

// Las flores de cada género (las que crecen en el jardín).
export const FLORES = {
  romance: CATALOGO_FLORES.romance,
  accion: CATALOGO_FLORES.accion,
  fantasia: CATALOGO_FLORES.fantasia,
  comedia: CATALOGO_FLORES.comedia,
  drama: CATALOGO_FLORES.drama,
  misterio: CATALOGO_FLORES.misterio,
};

// Claves válidas para el avatar (las mismas que acepta la regla de Firestore del perfil).
export const FLORES_AVATAR = Object.keys(CATALOGO_FLORES);

export const GENEROS = [
  { valor: 'romance', etiqueta: 'Romance' },
  { valor: 'accion', etiqueta: 'Acción' },
  { valor: 'fantasia', etiqueta: 'Fantasía' },
  { valor: 'comedia', etiqueta: 'Comedia' },
  { valor: 'drama', etiqueta: 'Drama' },
  { valor: 'misterio', etiqueta: 'Misterio' },
];

export const ESTADOS = [
  { valor: 'pendiente', etiqueta: 'Pendiente' },
  { valor: 'leyendo', etiqueta: 'Leyendo / Viendo' },
  { valor: 'terminado', etiqueta: 'Terminado' },
  { valor: 'abandonado', etiqueta: 'Abandonado' },
];

export const MAX_TITULO = 120;
export const MAX_CAPITULOS = 5000;
export const MAX_RESENA = 280; // v1.2: largo máximo de la reseña (como un posteo corto)

// Avance de 0 a 1, o null si no se conoce el total de capítulos.
export function avanceDePlanta(planta) {
  if (planta.capitulosTotales <= 0) return null;
  return Math.min(planta.capitulosLeidos / planta.capitulosTotales, 1);
}

// Decide qué dibujo mostrar según el estado y el avance.
export function etapaDePlanta(planta) {
  if (planta.estado === 'abandonado') return { clave: 'marchita', texto: 'Marchita' };
  if (planta.estado === 'terminado') return { clave: 'flor', texto: 'En flor' };
  if (planta.capitulosLeidos === 0) return { clave: 'semilla', texto: 'Semilla' };

  const avance = avanceDePlanta(planta) ?? 0;
  if (avance < 0.5) return { clave: 'brote', texto: 'Brote' };
  return { clave: 'creciendo', texto: 'Creciendo' };
}
