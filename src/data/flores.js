// Cada género de manga/anime se asocia a una flor.
// v0.1: solo nombre y emoji. (Más adelante: significado según el hanakotoba e ilustraciones propias.)
export const FLORES = {
  romance: { nombre: 'Rosa', emoji: '🌹' },
  accion: { nombre: 'Girasol', emoji: '🌻' },
  fantasia: { nombre: 'Tulipán', emoji: '🌷' },
  comedia: { nombre: 'Margarita', emoji: '🌼' },
  drama: { nombre: 'Flor de cerezo', emoji: '🌸' },
  misterio: { nombre: 'Hibisco', emoji: '🌺' },
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

// Devuelve cómo se ve la planta según su avance.
export function etapaDePlanta(planta) {
  if (planta.estado === 'abandonado') return { emoji: '🥀', texto: 'Marchita' };
  if (planta.estado === 'terminado') {
    return { emoji: FLORES[planta.genero].emoji, texto: 'En flor' };
  }
  if (planta.capitulosLeidos === 0) return { emoji: '🫘', texto: 'Semilla' };

  const avance = planta.capitulosTotales > 0
    ? planta.capitulosLeidos / planta.capitulosTotales
    : 0;

  if (avance < 0.5) return { emoji: '🌱', texto: 'Brote' };
  return { emoji: '🌿', texto: 'Creciendo' };
}
