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
  Y: '#FFC83D', // amarillo (lápiz)
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

// ---------------------------------------------------------------
// Cabezas de flor (v0.4.1): cada flor tiene su PROPIA FORMA.
// Letras de color propias de cada flor: P pétalo, p pétalo sombra, C centro, c centro oscuro.
// Todas miden 6 filas x 16 píxeles y se apoyan sobre el mismo tallo.
// ---------------------------------------------------------------
const CABEZAS = {
  // Rosa: pétalos enrollados en espiral
  rosa: [
    '.....KKKKKK.....',
    '....KPPpPPPK....',
    '...KPpPPpPPpK...',
    '...KPPpPPpPPK...',
    '....KpPPPPpK....',
    '.....KKppKK.....',
  ],
  // Girasol: pétalos alrededor de un centro grande y oscuro
  girasol: [
    '....KK.KK.KK....',
    '...KPPKPPKPPK...',
    '..KPPKccccKPPK..',
    '..KPKcCcCccKPK..',
    '..KPPKccccKPPK..',
    '...KPPKPPKPPK...',
  ],
  // Tulipán: copa cerrada con tres puntas
  tulipan: [
    '....K.KKKK.K....',
    '....KPKPPKPK....',
    '....KPPPPPpK....',
    '....KPWPPPpK....',
    '....KPPPPppK....',
    '.....KKppKK.....',
  ],
  // Margarita: pétalos blancos en rueda y centro amarillo
  margarita: [
    '......KKKK......',
    '..KK.KPPPPK.KK..',
    '.KPPKKCCCCKKPPK.',
    '.KPPPKCCCCKPPPK.',
    '..KKPPKKKKPPKK..',
    '....KPPKKPPK....',
  ],
  // Flor de cerezo (sakura): cinco pétalos con muesca
  cerezo: [
    '......K..K......',
    '.....KPKKPK.....',
    '..KKKPPPPPPKKK..',
    '.KPPPPCWCPPPPPK.',
    '..KPPPPCCPPPPK..',
    '...KPPK..KPPK...',
  ],
  // Hibisco: pétalos grandes y un estambre largo que sobresale
  hibisco: [
    '.....KKK..KYK...',
    '....KPPPK.KCK...',
    '...KPPPPPKCKK...',
    '..KPPPpPCCPPPK..',
    '..KPPpPPPPpPPK..',
    '...KKPPKKPPKK...',
  ],
  // Flor estelar (inventada): pétalos en forma de estrella
  estrella: [
    '.......KK.......',
    '......KPPK......',
    '..KKKKKPPKKKKK..',
    '..KPPPPCCPPPPK..',
    '...KPPPCCPPPK...',
    '....KPPKKPPK....',
  ],
  // Campanilla (kikyō): flor en forma de campana
  campanilla: [
    '......KKKK......',
    '.....KPPPWK.....',
    '....KPPPPPPK....',
    '....KPPPPPpK....',
    '...KPpPPPPppK...',
    '...KpKpKKpKpK...',
  ],
  // Loto: pétalos abiertos en capas
  loto: [
    '.......KK.......',
    '......KPPK......',
    '..KK.KPWPPK.KK..',
    '.KPPKKPPPPKKPPK.',
    '.KPPPPpPPpPPPPK.',
    '..KKKKKKKKKKKK..',
  ],
};

// Tallo con hojas, común a todas las flores (4 filas).
const TALLO = [
  '..KK.KKGGKK.KK..',
  '.KHHKKKGGKKKHHK.',
  '..KKK.KGGK.KKK..',
  '...SSSKGGKSSS...',
];

// Une la planta con la maceta: devuelve un array nuevo de 16 filas.
// Si la etapa es "flor", se usa la cabeza de la forma indicada (rosa, girasol...).
export function spriteDeEtapa(etapa, forma = 'rosa') {
  if (etapa === 'flor') return [...CABEZAS[forma], ...TALLO, ...MACETA];
  return [...PLANTAS[etapa], ...MACETA];
}

export const FORMAS = Object.keys(CABEZAS);

// ---------------------------------------------------------------
// Abeja (v0.4.1): decoración y personaje de Nana IA. 16 x 14 píxeles.
// Dos cuadros: ojos abiertos y ojos cerrados (para que parpadee).
// ---------------------------------------------------------------
export const PALETA_ABEJA = {
  K: '#1E2B1F', // contorno, ojos y rayas
  Y: '#FFC83D', // cuerpo amarillo
  W: '#FFFFFF', // alas
  A: '#BFE6FB', // alas (brillo celeste)
  R: '#F7A1B5', // cachetes
};

const ABEJA_CUERPO = [
  '....KK....KK....',
  '...KWWK..KWWK...',
  '...KWAWKKWAWK...',
  '....KWWKKWWK....',
  '.....KKKKKK.....',
  '....KYYYYYYK....',
];
const ABEJA_COLA = [
  '...KKKKKKKKKK...',
  '...KYYYYYYYYK...',
  '....KKKKKKKK....',
  '.....KYYYYK.....',
  '......KKKK......',
  '.......KK.......',
];

export const ABEJA = [
  ...ABEJA_CUERPO,
  '...KYKYYYYKYK...', // ojos abiertos
  '...KYRYKKYRYK...', // cachetes y sonrisa
  ...ABEJA_COLA,
];

export const ABEJA_PARPADEO = [
  ...ABEJA_CUERPO,
  '...KYYYYYYYYK...', // ojos cerrados
  '...KKRYKKYRKK...',
  ...ABEJA_COLA,
];

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
  lapiz: [
    '.....KK.',
    '....KLLK',
    '...KYYK.',
    '..KYYK..',
    '.KYYK...',
    'KbYK....',
    'KbbK....',
    'KKK.....',
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
