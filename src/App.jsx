import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, configCompleta } from './firebase';
import {
  actualizarPlanta,
  agregarPlanta,
  eliminarPlanta,
  obtenerPlantas,
} from './services/plantas';
import FormularioPlanta from './components/FormularioPlanta';
import ListaJardin from './components/ListaJardin';
import './App.css';

// Consulta las plantas en Firestore y actualiza los estados de la interfaz.
async function cargarPlantas(uid, setPlantas, setCargando, setError) {
  setCargando(true);
  setError('');
  try {
    const datos = await obtenerPlantas(uid);
    setPlantas(datos);
  } catch (error) {
    console.error(error);
    setError('No se pudo cargar tu jardín.');
  } finally {
    setCargando(false);
  }
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [plantas, setPlantas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  // 1) Al abrir la app: iniciar sesión anónima (sin registro).
  useEffect(() => {
    if (!configCompleta) return;

    const cancelar = onAuthStateChanged(auth, (usuarioActual) => {
      if (usuarioActual) {
        setUsuario(usuarioActual);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error(error);
          setError('No se pudo conectar con Firebase.');
          setCargando(false);
        });
      }
    });

    return cancelar; // limpieza: deja de escuchar al desmontar
  }, []);

  // 2) Cuando ya sabemos quién es el usuario: traer su jardín.
  useEffect(() => {
    if (usuario) {
      cargarPlantas(usuario.uid, setPlantas, setCargando, setError);
    }
  }, [usuario]);

  async function manejarAgregar(datos) {
    setGuardando(true);
    setError('');
    try {
      await agregarPlanta(usuario.uid, datos);
      await cargarPlantas(usuario.uid, setPlantas, setCargando, setError);
      return true;
    } catch (error) {
      console.error(error);
      setError('No se pudo guardar.');
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function manejarActualizar(id, cambios) {
    try {
      await actualizarPlanta(usuario.uid, id, cambios);
      await cargarPlantas(usuario.uid, setPlantas, setCargando, setError);
    } catch (error) {
      console.error(error);
      setError('No se pudo actualizar.');
    }
  }

  async function manejarEliminar(id) {
    try {
      await eliminarPlanta(usuario.uid, id);
      await cargarPlantas(usuario.uid, setPlantas, setCargando, setError);
    } catch (error) {
      console.error(error);
      setError('No se pudo eliminar.');
    }
  }

  if (!configCompleta) {
    return (
      <main>
        <h1>Jardín de Manga</h1>
        <p role="alert">
          Falta configurar Firebase: copiá .env.example como .env, completá los valores y
          reiniciá npm run dev.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>🌸 Jardín de Manga</h1>
      <p>Cada manga o anime que seguís es una flor. Leé, regá y mirá crecer tu jardín.</p>

      <FormularioPlanta onAgregar={manejarAgregar} guardando={guardando} />

      {error && <p role="alert" className="error">{error}</p>}

      <h2>Mi jardín</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <ListaJardin
          plantas={plantas}
          onActualizar={manejarActualizar}
          onEliminar={manejarEliminar}
        />
      )}
    </main>
  );
}
