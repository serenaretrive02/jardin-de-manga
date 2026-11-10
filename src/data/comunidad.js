// Datos fijos de la comunidad: tipos de misiones, de eventos y sus estados.

// Las misiones son las "tareas" del club. Solo la administradora del club puede crearlas y asignarlas.
export const TIPOS_MISION = [
  { valor: 'lectura', etiqueta: 'Leer capítulos', color: '#D7F59A' },
  { valor: 'episodios', etiqueta: 'Ver episodios', color: '#BFE6FB' },
  { valor: 'resena', etiqueta: 'Escribir reseña', color: '#F9C6CF' },
  { valor: 'fanart', etiqueta: 'Hacer fan art', color: '#E5D4FF' },
  { valor: 'teoria', etiqueta: 'Teoría / debate', color: '#FFE58A' },
  { valor: 'recomendar', etiqueta: 'Recomendar obra', color: '#FFD1B3' },
];

// Columnas del tablero (como un tablero Kanban).
export const ESTADOS_MISION = [
  { valor: 'pendiente', etiqueta: 'Por hacer' },
  { valor: 'en-curso', etiqueta: 'Haciendo' },
  { valor: 'hecha', etiqueta: 'Hecha' },
];

export const TIPOS_EVENTO = [
  { valor: 'lectura', etiqueta: 'Lectura conjunta' },
  { valor: 'watch-party', etiqueta: 'Watch party' },
  { valor: 'debate', etiqueta: 'Debate' },
  { valor: 'intercambio', etiqueta: 'Intercambio de mangas' },
];

export const MAX_MIEMBROS = 30;

// find: busca el objeto completo a partir del valor guardado en la base.
export function buscarOpcion(lista, valor) {
  return lista.find((opcion) => opcion.valor === valor) ?? lista[0];
}

// Código de invitación de 6 letras (sin letras confusas como O/0 o I/1).
export function generarCodigo() {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += letras[Math.floor(Math.random() * letras.length)];
  }
  return codigo;
}

// Fecha y hora LOCAL en formato "2026-11-15T19:30" (toISOString daría la hora UTC, 3 h adelantada).
export function ahoraLocal() {
  const ahora = new Date();
  return new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

// Nombre para mostrar de un miembro (si todavía no eligió apodo).
export function nombreDe(perfiles, uid) {
  return perfiles[uid]?.apodo ?? `Jardinera #${uid.slice(0, 4).toUpperCase()}`;
}

// ---------- Validaciones (devuelven un objeto con los errores) ----------

export function validarPerfil({ apodo }) {
  const errores = {};
  const limpio = apodo.trim();
  if (limpio.length < 2) errores.apodo = 'El apodo tiene que tener al menos 2 letras.';
  else if (limpio.length > 24) errores.apodo = 'Como máximo 24 caracteres.';
  return errores;
}

export function validarClub({ nombre, descripcion }) {
  const errores = {};
  const limpio = nombre.trim();
  if (limpio.length < 3) errores.nombre = 'El nombre del club tiene que tener al menos 3 letras.';
  else if (limpio.length > 40) errores.nombre = 'Como máximo 40 caracteres.';
  if (descripcion.trim().length > 200) errores.descripcion = 'La descripción puede tener hasta 200 caracteres.';
  return errores;
}

export function validarMision({ titulo, descripcion, asignadaA }) {
  const errores = {};
  const limpio = titulo.trim();
  if (limpio.length < 3) errores.titulo = 'Escribí la misión (al menos 3 letras).';
  else if (limpio.length > 80) errores.titulo = 'Como máximo 80 caracteres.';
  if (descripcion.trim().length > 300) errores.descripcion = 'Hasta 300 caracteres.';
  if (!asignadaA) errores.asignadaA = 'Elegí a quién se la asignás.';
  return errores;
}

export function validarEvento({ titulo, fecha, lugar, descripcion }) {
  const errores = {};
  const limpio = titulo.trim();
  if (limpio.length < 3) errores.titulo = 'Poné un nombre al evento (al menos 3 letras).';
  else if (limpio.length > 80) errores.titulo = 'Como máximo 80 caracteres.';
  if (!fecha) errores.fecha = 'Elegí la fecha y la hora.';
  if (lugar.trim().length > 120) errores.lugar = 'Hasta 120 caracteres.';
  if (descripcion.trim().length > 300) errores.descripcion = 'Hasta 300 caracteres.';
  return errores;
}
