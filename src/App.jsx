import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, configCompleta } from './firebase';
import {
  actualizarPlanta,
  agregarPlanta,
  eliminarPlanta,
  obtenerPlantas,
} from './services/plantas';
import { FLORES } from './data/flores';
import { PALETA_BASE, spriteDeEtapa } from './data/sprites';
import Aviso from './components/Aviso';
import BarraCarga from './components/BarraCarga';
import EditarPlanta from './components/EditarPlanta';
import FormularioPlanta from './components/FormularioPlanta';
import ListaJardin from './components/ListaJardin';
import PixelSprite from './components/PixelSprite';
import Ventana from './components/Ventana';
import './App.css';

// Consulta las plantas en Firestore y actualiza los estados de la interfaz.
async function cargarPlantas(uid, setPlantas, setCargando, setAviso) {
  setCargando(true);
  try {
    const datos = await obtenerPlantas(uid);
    setPlantas(datos);
  } catch (error) {
    console.error(error);
    setAviso({ tipo: 'error', texto: 'No se pudo cargar tu jardín. Revisá tu conexión.' });
  } finally {
    setCargando(false);
  }
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [plantas, setPlantas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [idOcupada, setIdOcupada] = useState(null); // planta que se está guardando
  const [aviso, setAviso] = useState(null); // { tipo: 'exito' | 'error', texto }
  const [editando, setEditando] = useState(null); // planta abierta en la ventana de edición

  // 1) Al abrir la app: iniciar sesión anónima (sin registro).
  useEffect(() => {
    if (!configCompleta) return;

    const cancelar = onAuthStateChanged(auth, (usuarioActual) => {
      if (usuarioActual) {
        setUsuario(usuarioActual);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error(error);
          setAviso({ tipo: 'error', texto: 'No se pudo conectar con Firebase.' });
          setCargando(false);
        });
      }
    });

    return cancelar; // limpieza: deja de escuchar al desmontar
  }, []);

  // 2) Cuando ya sabemos quién es el usuario: traer su jardín.
  useEffect(() => {
    if (usuario) {
      cargarPlantas(usuario.uid, setPlantas, setCargando, setAviso);
    }
  }, [usuario]);

  async function manejarAgregar(datos) {
    setGuardando(true);
    try {
      await agregarPlanta(usuario.uid, datos);
      await cargarPlantas(usuario.uid, setPlantas, setCargando, setAviso);
      setAviso({ tipo: 'exito', texto: `Plantaste "${datos.titulo}"` });
      return true;
    } catch (error) {
      console.error(error);
      setAviso({ tipo: 'error', texto: 'No se pudo plantar. Intentá de nuevo.' });
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function manejarActualizar(id, cambios, mensaje) {
    setIdOcupada(id);
    try {
      await actualizarPlanta(usuario.uid, id, cambios);
      // Se vuelve a consultar para mostrar lo que realmente quedó guardado.
      const datos = await obtenerPlantas(usuario.uid);
      setPlantas(datos);
      setAviso({ tipo: 'exito', texto: mensaje });
      return true;
    } catch (error) {
      console.error(error);
      setAviso({ tipo: 'error', texto: 'No se pudo guardar el cambio.' });
      return false;
    } finally {
      setIdOcupada(null);
    }
  }

  async function manejarEdicion(cambios) {
    const ok = await manejarActualizar(editando.id, cambios, `Guardaste los cambios de "${cambios.titulo}"`);
    if (ok) setEditando(null);
  }

  async function manejarEliminar(id, titulo) {
    setIdOcupada(id);
    try {
      await eliminarPlanta(usuario.uid, id);
      const datos = await obtenerPlantas(usuario.uid);
      setPlantas(datos);
      setAviso({ tipo: 'exito', texto: `"${titulo}" volvió a la tierra` });
    } catch (error) {
      console.error(error);
      setAviso({ tipo: 'error', texto: 'No se pudo compostar la planta.' });
    } finally {
      setIdOcupada(null);
    }
  }

  const logo = (
    <PixelSprite
      filas={spriteDeEtapa('flor')}
      paleta={{ ...PALETA_BASE, ...FLORES.romance.colores }}
      tamano={4}
    />
  );

  if (!configCompleta) {
    return (
      <main className="app">
        <Ventana titulo="error.exe">
          <p role="alert">
            Falta configurar Firebase: copiá .env.example como .env, completá los valores y
            reiniciá npm run dev.
          </p>
        </Ventana>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="encabezado">
        <div className="encabezado__logo">{logo}</div>
        <div>
          <h1 className="encabezado__titulo">Nana</h1>
          <p className="encabezado__subtitulo">tu jardín de manga</p>
          <p className="encabezado__lema">
            Cada manga o anime que seguís es una flor. Leé, regá y mirá crecer tu jardín.
          </p>
        </div>
      </header>

      <main className="contenido">
        <FormularioPlanta onAgregar={manejarAgregar} guardando={guardando} />

        <Ventana titulo={`mi_jardin.exe (${plantas.length})`} className="ventana--jardin">
          {cargando ? (
            <BarraCarga texto="Cargando jardín..." />
          ) : (
            <ListaJardin
              plantas={plantas}
              idOcupada={idOcupada}
              onActualizar={manejarActualizar}
              onEliminar={manejarEliminar}
              onEditar={setEditando}
            />
          )}
        </Ventana>
      </main>

      <footer className="pie">
        {usuario && <p>Jardinera anónima #{usuario.uid.slice(0, 5).toUpperCase()}</p>}
        <p>Nana · Hecho con React + Vite + Firebase · Datos de obras: Kitsu · TP2 Desarrollo Frontend II</p>
      </footer>

      {editando && (
        <EditarPlanta
          planta={editando}
          guardando={idOcupada === editando.id}
          onGuardar={manejarEdicion}
          onCancelar={() => setEditando(null)}
        />
      )}

      <Aviso aviso={aviso} onCerrar={setAviso} />
    </div>
  );
}
