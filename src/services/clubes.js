// Clubes de lectura (grupos). Ruta: clubes/{codigo}
// El id del documento ES el código de invitación: así, para unirse, alcanza con conocer el código.
// Quien crea el club es su administradora (adminUid).
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';
import { generarCodigo } from '../data/comunidad';

// CONSULTAR: los clubes donde la persona es miembro.
export async function obtenerMisClubes(uid) {
  const consulta = query(collection(db, 'clubes'), where('miembros', 'array-contains', uid));
  const resultado = await getDocs(consulta);
  return resultado.docs
    .map((documento) => ({ id: documento.id, ...documento.data() }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// AGREGAR: crea un club con un código nuevo. Quien lo crea queda como administradora.
export async function crearClub(uid, { nombre, descripcion }) {
  // Si por casualidad el código ya existe, Firebase rechaza la escritura: se prueba con otro.
  for (let intento = 0; intento < 3; intento++) {
    const codigo = generarCodigo();
    try {
      await setDoc(doc(db, 'clubes', codigo), {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        adminUid: uid,
        miembros: [uid],
        creadoEn: serverTimestamp(),
      });
      return codigo;
    } catch (error) {
      if (intento === 2) throw error;
    }
  }
}

// MODIFICAR: nombre y descripción (solo la administradora).
export async function actualizarClub(codigo, { nombre, descripcion }) {
  await updateDoc(doc(db, 'clubes', codigo), {
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
  });
}

// MODIFICAR: unirse con el código (arrayUnion agrega el uid a la lista sin repetirlo).
export async function unirseAClub(codigo, uid) {
  await updateDoc(doc(db, 'clubes', codigo.trim().toUpperCase()), { miembros: arrayUnion(uid) });
}

// MODIFICAR: salir del club (o, si es la administradora, quitar a otra persona).
export async function quitarMiembro(codigo, uid) {
  await updateDoc(doc(db, 'clubes', codigo), { miembros: arrayRemove(uid) });
}

// ELIMINAR: borra el club junto con sus misiones y eventos (solo la administradora).
// Firestore no borra las subcolecciones solo, así que se borran en un mismo lote (batch).
export async function eliminarClub(codigo) {
  const [misiones, eventos] = await Promise.all([
    getDocs(collection(db, 'clubes', codigo, 'misiones')),
    getDocs(collection(db, 'clubes', codigo, 'eventos')),
  ]);
  const lote = writeBatch(db);
  misiones.docs.forEach((documento) => lote.delete(documento.ref));
  eventos.docs.forEach((documento) => lote.delete(documento.ref));
  lote.delete(doc(db, 'clubes', codigo));
  await lote.commit();
}
