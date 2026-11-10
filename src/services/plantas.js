// Operaciones con Cloud Firestore.
// Cada visitante tiene su propio jardín en: users/{uid}/plantas/{plantaId}
import {
  addDoc,
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

// MODIFICAR: actualiza solo los campos que cambian (estado, capítulos, etc.).
export async function actualizarPlanta(uid, id, cambios) {
  await updateDoc(doc(db, 'users', uid, 'plantas', id), cambios);
}

// ELIMINAR: borra la planta de la base.
export async function eliminarPlanta(uid, id) {
  await deleteDoc(doc(db, 'users', uid, 'plantas', id));
}
