// Eventos de un club (lecturas conjuntas, watch parties, debates...).
// Ruta: clubes/{codigo}/eventos/{id}
// Cualquier miembro puede crear un evento; lo editan o eliminan quien lo creó o la administradora.
// Todos los miembros pueden anotarse ("voy") o borrarse.
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

function coleccionEventos(codigo) {
  return collection(db, 'clubes', codigo, 'eventos');
}

// CONSULTAR (ordenados por fecha)
export async function obtenerEventos(codigo) {
  const resultado = await getDocs(query(coleccionEventos(codigo), orderBy('fecha', 'asc')));
  return resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
}

// AGREGAR
export async function crearEvento(codigo, uid, datos) {
  await addDoc(coleccionEventos(codigo), {
    titulo: datos.titulo.trim(),
    tipo: datos.tipo,
    fecha: datos.fecha, // texto "2026-11-15T19:30"
    lugar: datos.lugar.trim(),
    descripcion: datos.descripcion.trim(),
    asistentes: [uid], // quien lo crea, va
    creadoPor: uid,
    creadoEn: serverTimestamp(),
  });
}

// MODIFICAR los datos del evento
export async function actualizarEvento(codigo, id, datos) {
  await updateDoc(doc(db, 'clubes', codigo, 'eventos', id), {
    titulo: datos.titulo.trim(),
    tipo: datos.tipo,
    fecha: datos.fecha,
    lugar: datos.lugar.trim(),
    descripcion: datos.descripcion.trim(),
  });
}

// MODIFICAR: anotarse o borrarse del evento
export async function cambiarAsistencia(codigo, id, uid, voy) {
  await updateDoc(doc(db, 'clubes', codigo, 'eventos', id), {
    asistentes: voy ? arrayUnion(uid) : arrayRemove(uid),
  });
}

// ELIMINAR
export async function eliminarEvento(codigo, id) {
  await deleteDoc(doc(db, 'clubes', codigo, 'eventos', id));
}
