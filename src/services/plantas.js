// Operaciones con Cloud Firestore.
// Cada visitante tiene su propio jardín en: users/{uid}/plantas/{plantaId}
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

function coleccionPlantas(uid) {
  return collection(db, 'users', uid, 'plantas');
}

// CONSULTAR: trae todas las plantas del usuario, de la más nueva a la más vieja.
export async function obtenerPlantas(uid) {
  const consulta = query(coleccionPlantas(uid), orderBy('creadoEn', 'desc'));
  const resultado = await getDocs(consulta);
  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}

// AGREGAR: crea una planta nueva (un manga o anime).
export async function agregarPlanta(uid, datos) {
  await addDoc(coleccionPlantas(uid), {
    ...datos,
    creadoEn: serverTimestamp(),
  });
}

// MODIFICAR: actualiza solo los campos que cambian (estado, capítulos, puntuación, etc.).
// Si un cambio vale null, ese campo se BORRA del documento con deleteField()
// (por ejemplo, al quitar la puntuación o dejar la reseña vacía).
export async function actualizarPlanta(uid, id, cambios) {
  const datos = Object.fromEntries(
    Object.entries(cambios).map(([campo, valor]) => [campo, valor === null ? deleteField() : valor]),
  );
  await updateDoc(doc(db, 'users', uid, 'plantas', id), datos);
}

// ELIMINAR: borra la planta de la base.
export async function eliminarPlanta(uid, id) {
  await deleteDoc(doc(db, 'users', uid, 'plantas', id));
}
