// Sonidos de Nana, estilo "chiptune" (como las consolas retro).
// No usan archivos de audio: se generan en el momento con la Web Audio API del navegador.
// La preferencia (con o sin sonido) se recuerda en localStorage: es solo una preferencia
// de este navegador, NO un dato de la app (los datos se guardan en Firebase).

const CLAVE_PREFERENCIA = 'nana-sonido';
let contexto = null; // se crea recién con el primer sonido (los navegadores lo exigen tras un clic)

function leerPreferencia() {
  try {
    return localStorage.getItem(CLAVE_PREFERENCIA) !== 'no';
  } catch {
    return true;
  }
}

let activado = leerPreferencia();

export function sonidoActivado() {
  return activado;
}

export function cambiarSonido(valor) {
  activado = valor;
  try {
    localStorage.setItem(CLAVE_PREFERENCIA, valor ? 'si' : 'no');
  } catch {
    // si el navegador no deja guardar, la preferencia dura solo esta visita
  }
}

// Una nota: frecuencia (Hz), cuándo empieza (s), cuánto dura (s), tipo de onda y volumen.
// "hasta" permite deslizar la frecuencia (por ejemplo, una gota que cae).
function nota(frecuencia, inicio, duracion, { tipo = 'square', volumen = 0.05, hasta } = {}) {
  const ahora = contexto.currentTime + inicio;
  const oscilador = contexto.createOscillator();
  const ganancia = contexto.createGain();
  oscilador.type = tipo;
  oscilador.frequency.setValueAtTime(frecuencia, ahora);
  if (hasta) oscilador.frequency.exponentialRampToValueAtTime(hasta, ahora + duracion);
  ganancia.gain.setValueAtTime(volumen, ahora);
  ganancia.gain.exponentialRampToValueAtTime(0.0001, ahora + duracion);
  oscilador.connect(ganancia).connect(contexto.destination);
  oscilador.start(ahora);
  oscilador.stop(ahora + duracion + 0.02);
}

// Cada sonido es una lista de notas.
const SONIDOS = {
  // clic suave de botones de navegación
  click: () => nota(1200, 0, 0.03, { volumen: 0.02 }),
  // plantar: tres notas que suben (do-mi-sol)
  plantar: () => {
    [523, 659, 784].forEach((f, i) => nota(f, i * 0.07, 0.1, { tipo: 'triangle', volumen: 0.07 }));
  },
  // regar: dos gotitas de agua
  regar: () => {
    nota(1400, 0, 0.09, { tipo: 'sine', volumen: 0.08, hasta: 600 });
    nota(1600, 0.11, 0.09, { tipo: 'sine', volumen: 0.06, hasta: 700 });
  },
  // florecer: arpegio alegre con un brillito al final
  florecer: () => {
    [523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.08, 0.14, { tipo: 'triangle', volumen: 0.07 }));
    nota(2093, 0.34, 0.18, { tipo: 'sine', volumen: 0.04 });
  },
  // compostar / eliminar: notas que bajan
  compostar: () => {
    [392, 330, 262].forEach((f, i) => nota(f, i * 0.08, 0.1, { volumen: 0.04 }));
  },
  // misión cumplida: fanfarria corta
  mision: () => {
    [659, 784, 1319].forEach((f, i) => nota(f, i * 0.09, 0.12, { volumen: 0.05 }));
  },
  // anotarse a un evento
  evento: () => {
    nota(784, 0, 0.08, { tipo: 'triangle', volumen: 0.07 });
    nota(1175, 0.09, 0.12, { tipo: 'triangle', volumen: 0.07 });
  },
  // éxito genérico (guardar, crear club...)
  exito: () => {
    nota(660, 0, 0.08, { tipo: 'triangle', volumen: 0.06 });
    nota(990, 0.08, 0.12, { tipo: 'triangle', volumen: 0.06 });
  },
  // error: zumbido grave
  error: () => {
    nota(180, 0, 0.12, { volumen: 0.05 });
    nota(140, 0.14, 0.16, { volumen: 0.05 });
  },
  // la abeja: un zumbidito
  abeja: () => nota(240, 0, 0.18, { tipo: 'sawtooth', volumen: 0.025, hasta: 300 }),
  // burbuja de chat
  burbuja: () => nota(700, 0, 0.06, { tipo: 'sine', volumen: 0.05, hasta: 1000 }),
};

export function reproducir(nombre) {
  if (!activado || !SONIDOS[nombre]) return;
  try {
    contexto ??= new (window.AudioContext || window.webkitAudioContext)();
    if (contexto.state === 'suspended') contexto.resume();
    SONIDOS[nombre]();
  } catch (error) {
    console.warn('No se pudo reproducir el sonido', error);
  }
}
