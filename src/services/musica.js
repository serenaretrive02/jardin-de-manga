// v1.2 · Música de fondo kawaii, estilo "cajita musical" chiptune.
// Es una melodía ORIGINAL de Nana (no es una canción de nadie) y no usa archivos de audio:
// se toca nota por nota con la Web Audio API, igual que los sonidos de los clics.
// Se apaga y se prende con el mismo botón "Sonido".
import { obtenerContexto } from './sonidos';

const TEMPO = 100; // negras por minuto
const CORCHEA = 60 / TEMPO / 2; // duración de cada paso (s)

// Notas MIDI (60 = do central). null = silencio. 8 compases de 8 corcheas, en do mayor.
const MELODIA = [
  76, 79, 84, 79, 81, 79, 76, null,
  77, 81, 79, 76, 74, 76, 72, null,
  76, 79, 84, 86, 88, 86, 84, 81,
  79, null, 76, 79, 74, null, null, null,
  72, 76, 79, 76, 77, 81, 84, 81,
  79, 76, 72, 76, 74, 77, 81, 79,
  76, 79, 81, 84, 83, 79, 86, 83,
  84, null, 79, 76, 72, null, null, null,
];
// Bajo: dos notas por compás (en la 1.ª y la 5.ª corchea). Acordes: Do, Fa, Lam, Sol, Do, Do, Fa-Sol, Do.
const BAJO = [48, 55, 53, 48, 45, 52, 43, 50, 48, 55, 48, 55, 53, 55, 48, 43];

let principal = null; // volumen general de la música
let temporizador = null;
let paso = 0;
let proximoTiempo = 0;

const frecuencia = (midi) => 440 * 2 ** ((midi - 69) / 12);

// Una nota suave que se apaga sola, como una cajita musical.
function tocar(contexto, midi, inicio, duracion, tipo, volumen) {
  const oscilador = contexto.createOscillator();
  const ganancia = contexto.createGain();
  oscilador.type = tipo;
  oscilador.frequency.value = frecuencia(midi);
  ganancia.gain.setValueAtTime(0.0001, inicio);
  ganancia.gain.exponentialRampToValueAtTime(volumen, inicio + 0.015);
  ganancia.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
  oscilador.connect(ganancia).connect(principal);
  oscilador.start(inicio);
  oscilador.stop(inicio + duracion + 0.05);
}

// "Programador" de notas: cada 100 ms agenda las notas que tocan en el próximo cuarto de segundo.
// Así la música no se atrasa aunque el navegador esté ocupado.
function agendar() {
  const contexto = obtenerContexto();
  while (proximoTiempo < contexto.currentTime + 0.25) {
    const nota = MELODIA[paso % MELODIA.length];
    if (nota) {
      tocar(contexto, nota, proximoTiempo, 0.5, 'triangle', 0.5);
      tocar(contexto, nota + 12, proximoTiempo, 0.25, 'sine', 0.12); // brillito una octava arriba
    }
    if (paso % 4 === 0) {
      const bajo = BAJO[Math.floor(paso / 4) % BAJO.length];
      tocar(contexto, bajo, proximoTiempo, CORCHEA * 3.5, 'sine', 0.45);
    }
    proximoTiempo += CORCHEA;
    paso += 1;
  }
}

export function musicaSonando() {
  return temporizador !== null;
}

export function iniciarMusica() {
  if (temporizador !== null) return;
  const contexto = obtenerContexto();
  if (!contexto) return;
  principal = contexto.createGain();
  principal.gain.setValueAtTime(0.0001, contexto.currentTime);
  principal.gain.exponentialRampToValueAtTime(0.06, contexto.currentTime + 1.5); // entra despacito
  principal.connect(contexto.destination);
  paso = 0;
  proximoTiempo = contexto.currentTime + 0.1;
  temporizador = setInterval(agendar, 100);
}

export function detenerMusica() {
  if (temporizador === null) return;
  clearInterval(temporizador);
  temporizador = null;
  const contexto = obtenerContexto();
  const salida = principal;
  if (contexto && salida) {
    salida.gain.cancelScheduledValues(contexto.currentTime);
    salida.gain.setValueAtTime(salida.gain.value || 0.0001, contexto.currentTime);
    salida.gain.exponentialRampToValueAtTime(0.0001, contexto.currentTime + 0.4);
    setTimeout(() => salida.disconnect(), 600);
  }
  principal = null;
}

// Si la pestaña queda en segundo plano, la música se pausa; al volver, sigue.
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    const contexto = obtenerContexto(false);
    if (!contexto || temporizador === null) return;
    if (document.hidden) contexto.suspend();
    else contexto.resume();
  });
}
