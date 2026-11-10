// Cada género de manga/anime se asocia a una flor.
// "colores" pinta las letras P, p y C del dibujo de la flor (ver sprites.js).
export const FLORES = {
  romance: {
    nombre: 'Rosa',
    colores: { P: '#F06A8A', p: '#C2415F', C: '#FFD1DC' },
  },
  accion: {
    nombre: 'Girasol',
    colores: { P: '#FFC83D', p: '#E09A12', C: '#7A4A1E' },
  },
  fantasia: {
    nombre: 'Tulipán violeta',
    colores: { P: '#B58CFF', p: '#8458D6', C: '#FFE58A' },
  },
  comedia: {
    nombre: 'Margarita',
    colores: { P: '#FFFFFF', p: '#D9DDE3', C: '#FFC83D' },
  },
  drama: {
    nombre: 'Flor de cerezo',
    colores: { P: '#FFB7D0', p: '#E68AAE', C: '#FFF0F5' },
  },
  misterio: {
    nombre: 'Hibisco',
    colores: { P: '#E8453C', p: '#A92B25', C: '#FFD23F' },
  },
};

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
