import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import { auth, configCompleta } from './firebase';
import { reproducir } from './services/sonidos';
import {
  actualizarPlanta,
  agregarPlanta,
  eliminarPlanta,
  obtenerPlantas,
} from './services/plantas';
import Aviso from './components/Aviso';
import BarraCarga from './components/BarraCarga';
import Comunidad from './components/comunidad/Comunidad';
import AbejaVoladora from './components/AbejaVoladora';
import GuiaCrecimiento from './components/GuiaCrecimiento';
import Modal from './components/Modal';
import NanaIA from './components/NanaIA';
import EditarPlanta from './components/EditarPlanta';
import FormularioPlanta from './components/FormularioPlanta';
import BotonSonido from './components/BotonSonido';
import Herbario from './components/Herbario';
import JardinFiltrado from './components/JardinFiltrado';
import SpriteFlor from './components/SpriteFlor';
import Ventana from './components/Ventana';
import './App.css';
import './Comunidad.css';
import './Extras.css';

// Si se abrió un enlace de invitación (…/?club=ABC123), se guarda el código.
const codigoInvitacion = new URLSearchParams(window.location.search).get('club');

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
  // Sección visible: 'jardin' o 'comunidad'. Con una invitación, se abre directo la comunidad.
  const [seccion, setSeccion] = useState(codigoInvitacion ? 'comunidad' : 'jardin');
  const [confirmarSalida, setConfirmarSalida] = useState(false);

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
      setAviso({ tipo: 'exito', texto: `Plantaste "${datos.titulo}"`, sonido: 'plantar' });
      return true;
    } catch (error) {
      console.error(error);
      setAviso({ tipo: 'error', texto: 'No se pudo plantar. Intentá de nuevo.' });
      return false;
    } finally {
      setGuardando(false);
    }
  }

  // sonido: 'regar', 'florecer'... (si no se indica, suena el de éxito)
  async function manejarActualizar(id, cambios, mensaje, sonido) {
    setIdOcupada(id);
    try {
      await actualizarPlanta(usuario.uid, id, cambios);
      // Se vuelve a consultar para mostrar lo que realmente quedó guardado.
      const datos = await obtenerPlantas(usuario.uid);
      setPlantas(datos);
      setAviso({ tipo: 'exito', texto: mensaje, sonido });
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
      setAviso({ tipo: 'exito', texto: `"${titulo}" volvió a la tierra`, sonido: 'compostar' });
    } catch (error) {
      console.error(error);
      setAviso({ tipo: 'error', texto: 'No se pudo compostar la planta.' });
    } finally {
      setIdOcupada(null);
    }
  }

  // Clic suave al tocar pestañas, chips y botones flotantes (un solo "escuchador" para toda la app).
  useEffect(() => {
    function alHacerClic(evento) {
      if (evento.target.closest('.pestana, .chip, .selector-tipo__opcion, .boton-flotante--guia')) reproducir('click');
    }
    document.addEventListener('click', alHacerClic);
    return () => document.removeEventListener('click', alHacerClic); // limpieza
  }, []);

  // Cerrar sesión: al ser anónima, Firebase crea enseguida una identidad NUEVA (jardín vacío).
  async function cerrarSesion() {
    setConfirmarSalida(false);
    setPlantas([]);
    setCargando(true);
    try {
      await signOut(auth); // onAuthStateChanged recibe null y vuelve a entrar como anónima nueva
      setAviso({ tipo: 'exito', texto: 'Cerraste sesión. ¡Empezás un jardín nuevo!' });
    } catch (error) {
      console.error(error);
      setAviso({ tipo: 'error', texto: 'No se pudo cerrar la sesión.' });
      setCargando(false);
    }
  }

  const logo = <SpriteFlor clave="romance" tamano={4} />;

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
        <div className="encabezado__extra">
          <BotonSonido />
        </div>
      </header>

      <nav className="pestanas" role="tablist" aria-label="Secciones">
        <button role="tab" aria-selected={seccion === 'jardin'} className="pestana" onClick={() => setSeccion('jardin')}>
          Mi jardín
        </button>
        <button role="tab" aria-selected={seccion === 'comunidad'} className="pestana" onClick={() => setSeccion('comunidad')}>
          Comunidad
        </button>
        <button role="tab" aria-selected={seccion === 'herbario'} className="pestana" onClick={() => setSeccion('herbario')}>
          Herbario
        </button>
      </nav>

      {seccion === 'jardin' ? (
        <main className="contenido">
          <FormularioPlanta onAgregar={manejarAgregar} guardando={guardando} />

          <Ventana titulo={`mi_jardin.exe (${plantas.length})`} className="ventana--jardin">
            {cargando ? (
              <BarraCarga texto="Cargando jardín..." />
            ) : (
              <JardinFiltrado
                plantas={plantas}
                idOcupada={idOcupada}
                onActualizar={manejarActualizar}
                onEliminar={manejarEliminar}
                onEditar={setEditando}
              />
            )}
          </Ventana>
        </main>
      ) : seccion === 'herbario' ? (
        <main>
          <Herbario plantas={plantas} />
        </main>
      ) : (
        <main>
          {usuario ? (
            <Comunidad key={usuario.uid} usuario={usuario} codigoInicial={codigoInvitacion} onAviso={setAviso} />
          ) : (
            <Ventana titulo="comunidad.exe">
              <BarraCarga texto="Conectando..." />
            </Ventana>
          )}
        </main>
      )}

      <footer className="pie">
        {usuario && (
          <p className="pie__sesion">
            Jardinera anónima #{usuario.uid.slice(0, 5).toUpperCase()}
            <button className="boton boton--chico" onClick={() => setConfirmarSalida(true)}>
              Cerrar sesión
            </button>
          </p>
        )}
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

      {confirmarSalida && (
        <Modal titulo="cerrar_sesion.exe" onCerrar={() => setConfirmarSalida(false)}>
          <div className="formulario">
            <p>
              Nana te reconoce de forma <strong>anónima</strong> (sin usuario ni contraseña). Si cerrás sesión,
              empezás de cero con un <strong>jardín nuevo y vacío</strong>, y no vas a poder volver a este jardín
              ni a tus clubes.
            </p>
            <p className="campo__ayuda">Si solo querés cambiar tu apodo o tu flor, editá tu perfil en Comunidad.</p>
            <div className="modal__acciones">
              <button className="boton" onClick={() => setConfirmarSalida(false)}>
                Cancelar
              </button>
              <button className="boton boton--peligro" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </Modal>
      )}

      <AbejaVoladora />
      <GuiaCrecimiento />
      <NanaIA plantas={plantas} />
      <Aviso aviso={aviso} onCerrar={setAviso} />
    </div>
  );
}
