// Misiones (tareas) de un club. Ruta: clubes/{codigo}/misiones/{id}
// Las reglas de Firestore garantizan que SOLO la administradora puede crearlas, asignarlas,
// editarlas o eliminarlas. La persona asignada solo puede cambiar su estado.
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

function coleccionMisiones(codigo) {
  return collection(db, 'clubes', codigo, 'misiones');
}

// CONSULTAR
export async function obtenerMisiones(codigo) {
  const resultado = await getDocs(query(coleccionMisiones(codigo), orderBy('creadoEn', 'asc')));
  return resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
}

// AGREGAR (asignar una misión nueva)
export async function crearMision(codigo, uidAdmin, datos) {
  await addDoc(coleccionMisiones(codigo), {
    titulo: datos.titulo.trim(),
    tipo: datos.tipo,
    descripcion: datos.descripcion.trim(),
    asignadaA: datos.asignadaA,
    fechaLimite: datos.fechaLimite,
    estado: 'pendiente',
    creadoPor: uidAdmin,
    creadoEn: serverTimestamp(),
  });
}

// MODIFICAR (la administradora edita todo; la persona asignada solo el estado)
export async function actualizarMision(codigo, id, cambios) {
  await updateDoc(doc(db, 'clubes', codigo, 'misiones', id), cambios);
}

// ELIMINAR
export async function eliminarMision(codigo, id) {
  await deleteDoc(doc(db, 'clubes', codigo, 'misiones', id));
}
