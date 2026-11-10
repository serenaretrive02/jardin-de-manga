// Dibujos en pixel art hechos a mano.
// Cada dibujo es un ARRAY de textos: cada texto es una fila y cada letra es un píxel.
// La letra indica el color (ver PALETA_BASE) y el punto "." es un píxel transparente.
// El componente <PixelSprite /> recorre este array con map y dibuja un cuadradito por letra.

export const PALETA_BASE = {
  K: '#1E2B1F', // contorno
  L: '#F7B7A3', // maceta (luz)
  O: '#E8826F', // maceta
  o: '#B85C4F', // maceta (sombra)
  S: '#7A5236', // tierra
  B: '#9C6B43', // semilla
  b: '#C08A5B', // semilla (brillo)
  G: '#4E9A3A', // tallo
  g: '#2F6B26', // verde oscuro
  H: '#9ED36A', // hoja
  W: '#FFFFFF', // brillo blanco
  d: '#B59B71', // hoja seca
  D: '#866E4C', // tallo seco
  A: '#5BB8F0', // agua
  a: '#2E86C1', // agua (sombra)
};

// Maceta: es la misma para todas las plantas (6 filas de 16 píxeles).
const MACETA = [
  '..KKKKKKKKKKKK..',
  '..KLOOOOOOOOoK..',
  '..KKKKKKKKKKKK..',
  '...KLOOOOOOoK...',
  '...KLOOOOOOoK...',
  '....KKKKKKKK....',
];

// Parte de arriba de cada etapa (10 filas de 16 píxeles).
const VACIO = '................';

const PLANTAS = {
  semilla: [
    VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO,
    '.......KK.......',
    '......KBbK......',
    '...SSSKBBKSSS...',
  ],
  brote: [
    VACIO, VACIO, VACIO, VACIO, VACIO,
    '....KK....KK....',
    '...KHHK..KHHK...',
    '....KHHKKHHK....',
    '......KGGK......',
    '...SSSKGGKSSS...',
  ],
  creciendo: [
    VACIO,
    '.......KK.......',
    '......KgHK......',
    '......KgHK......',
    '..KK..KGGK..KK..',
    '.KHHK.KGGK.KHHK.',
    '.KHHHKKGGKKHHHK.',
    '..KKKKKGGKKKKK..',
    '......KGGK......',
    '...SSSKGGKSSS...',
  ],
  // La flor usa las letras P (pétalo), p (pétalo sombra) y C (centro):
  // cada género les asigna sus propios colores.
  flor: [
    '.....KK..KK.....',
    '....KPPKKPPK....',
    '...KPPWPPPPpK...',
    '...KPPPCCPPpK...',
    '...KpPPCCPPpK...',
    '....KPPKKPpK....',
    '..KK.KKGGKK.KK..',
    '.KHHKKKGGKKKHHK.',
    '..KKK.KGGK.KKK..',
    '...SSSKGGKSSS...',
  ],
  marchita: [
    VACIO, VACIO, VACIO,
    '..........KK....',
    '.........KddK...',
    '........KdDK....',
    '..KK...KDDK.....',
    '.KddK.KDDK......',
    '..KKKKDDK.......',
    '...SSSKDDKSSS...',
  ],
};

// Une la planta con la maceta: devuelve un array nuevo de 16 filas.
export function spriteDeEtapa(etapa) {
  return [...PLANTAS[etapa], ...MACETA];
}

// Íconos chicos (8 x 8) para los botones.
export const ICONOS = {
  gota: [
    '...KK...',
    '..KAAK..',
    '..KAAK..',
    '.KAWAAK.',
    '.KAWAAK.',
    'KAAAAaaK',
    '.KAAaaK.',
    '..KKKK..',
  ],
  compost: [
    '..KKKK..',
    'KKKKKKKK',
    '.KdDdDK.',
    '.KdDdDK.',
    '.KdDdDK.',
    '.KdDdDK.',
    '.KdDdDK.',
    '..KKKK..',
  ],
  semilla: [
    '........',
    '...KK...',
    '..KbBK..',
    '.KbBBBK.',
    '.KBBBBK.',
    '..KBBK..',
    '...KK...',
    '........',
  ],
};
