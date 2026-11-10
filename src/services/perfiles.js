// Perfil público de cada jardinera: apodo y flor favorita (se ve en los clubes).
// Ruta: users/{uid}  (el jardín privado sigue en users/{uid}/plantas)
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

// CONSULTAR el perfil propio o el de otra persona del club.
export async function obtenerPerfil(uid) {
  const documento = await getDoc(doc(db, 'users', uid));
  return documento.exists() ? { uid, ...documento.data() } : null;
}

// CONSULTAR varios perfiles a la vez (los miembros de un club).
// map arma una consulta por miembro y Promise.all espera a que terminen todas.
export async function obtenerPerfiles(uids) {
  const perfiles = await Promise.all(uids.map((uid) => obtenerPerfil(uid)));
  const porUid = {};
  perfiles.filter(Boolean).forEach((perfil) => {
    porUid[perfil.uid] = perfil;
  });
  return porUid;
}

// AGREGAR o MODIFICAR el perfil propio.
export async function guardarPerfil(uid, { apodo, flor }, esNuevo) {
  await setDoc(
    doc(db, 'users', uid),
    { apodo: apodo.trim(), flor, ...(esNuevo && { creadoEn: serverTimestamp() }) },
    { merge: true },
  );
}
