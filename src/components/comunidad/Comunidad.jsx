import { useEffect, useState } from 'react';
import { ahoraLocal, nombreDe } from '../../data/comunidad';
import { FLORES } from '../../data/flores';
import { actualizarClub, crearClub, eliminarClub, obtenerMisClubes, quitarMiembro, unirseAClub } from '../../services/clubes';
import { compartir, enlaceDeClub } from '../../services/compartir';
import { cambiarAsistencia, actualizarEvento, crearEvento, eliminarEvento, obtenerEventos } from '../../services/eventos';
import { actualizarMision, crearMision, eliminarMision, obtenerMisiones } from '../../services/misiones';
import { guardarPerfil, obtenerPerfil, obtenerPerfiles } from '../../services/perfiles';
import BarraCarga from '../BarraCarga';
import Modal from '../Modal';
import Ventana from '../Ventana';
import Avatar from './Avatar';
import DetalleClub from './DetalleClub';
import FormClub from './FormClub';
import FormEvento from './FormEvento';
import FormMision from './FormMision';
import FormPerfil from './FormPerfil';
import IconoEditar from './IconoEditar';

// Sección "Comunidad": perfil, clubes de lectura, misiones y eventos.
export default function Comunidad({ usuario, codigoInicial, onAviso }) {
  const uid = usuario.uid;
  const [perfil, setPerfil] = useState(null);
  const [clubes, setClubes] = useState([]);
  const [idClub, setIdClub] = useState(null);
  const [perfiles, setPerfiles] = useState({}); // perfiles de los miembros del club abierto
  const [misiones, setMisiones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoClub, setCargandoClub] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [codigo, setCodigo] = useState(codigoInicial ?? '');
  const [ahora] = useState(ahoraLocal); // se calcula una sola vez al entrar
  const [modal, setModal] = useState(null); // { tipo: 'perfil'|'club'|'mision'|'evento', datos }

  const club = clubes.find((c) => c.id === idClub) ?? null;
  // Texto con los miembros: el efecto 2 solo se repite si cambia el club o sus miembros.
  const claveMiembros = club ? club.miembros.join(',') : '';

  // 1) Al entrar: traer el perfil y los clubes de la persona.
  useEffect(() => {
    async function cargarInicial() {
      try {
        const [miPerfil, misClubes] = await Promise.all([obtenerPerfil(uid), obtenerMisClubes(uid)]);
        setPerfil(miPerfil);
        setClubes(misClubes);
        if (misClubes.length > 0) setIdClub(misClubes[0].id);
      } catch (error) {
        console.error(error);
        onAviso({ tipo: 'error', texto: 'No se pudo cargar la comunidad.' });
      } finally {
        setCargando(false);
      }
    }
    cargarInicial();
  }, [uid, onAviso]);

  // 2) Cada vez que se abre otro club (o cambian sus miembros): traer perfiles, misiones y eventos.
  useEffect(() => {
    if (!idClub || !claveMiembros) return;
    let vigente = true; // si se cambia de club antes de que llegue la respuesta, se ignora
    async function cargarClub() {
      setCargandoClub(true);
      try {
        const [datosPerfiles, datosMisiones, datosEventos] = await Promise.all([
          obtenerPerfiles(claveMiembros.split(',')),
          obtenerMisiones(idClub),
          obtenerEventos(idClub),
        ]);
        if (!vigente) return;
        setPerfiles(datosPerfiles);
        setMisiones(datosMisiones);
        setEventos(datosEventos);
      } catch (error) {
        console.error(error);
        if (vigente) onAviso({ tipo: 'error', texto: 'No se pudo cargar el club.' });
      } finally {
        if (vigente) setCargandoClub(false);
      }
    }
    cargarClub();
    return () => {
      vigente = false; // limpieza del efecto
    };
  }, [idClub, claveMiembros, onAviso]);

  // Ejecuta una operación con Firebase, vuelve a consultar lo que cambió y RECIÉN DESPUÉS avisa.
  // recargar: 'contenido' (misiones y eventos), 'club' (datos y miembros) o 'clubes' (la lista entera).
  async function ejecutar(operacion, textoExito, textoError, recargar = 'contenido') {
    setOcupado(true);
    try {
      const resultado = await operacion();
      if (recargar === 'contenido') {
        const [datosMisiones, datosEventos] = await Promise.all([obtenerMisiones(idClub), obtenerEventos(idClub)]);
        setMisiones(datosMisiones);
        setEventos(datosEventos);
      } else {
        const misClubes = await obtenerMisClubes(uid);
        setClubes(misClubes);
        if (recargar === 'clubes') setIdClub(typeof resultado === 'string' ? resultado : misClubes[0]?.id ?? null);
      }
      onAviso({ tipo: 'exito', texto: textoExito });
      setModal(null);
      return true;
    } catch (error) {
      console.error(error);
      onAviso({ tipo: 'error', texto: textoError });
      return false;
    } finally {
      setOcupado(false);
    }
  }

  async function guardarMiPerfil(datos) {
    setOcupado(true);
    try {
      await guardarPerfil(uid, datos, !perfil);
      setPerfil(await obtenerPerfil(uid));
      if (club) setPerfiles(await obtenerPerfiles(club.miembros));
      onAviso({ tipo: 'exito', texto: `¡Hola, ${datos.apodo.trim()}!` });
      setModal(null);
    } catch (error) {
      console.error(error);
      onAviso({ tipo: 'error', texto: 'No se pudo guardar tu perfil.' });
    } finally {
      setOcupado(false);
    }
  }

  async function unirme(evento) {
    evento.preventDefault();
    const limpio = codigo.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(limpio)) {
      onAviso({ tipo: 'error', texto: 'El código tiene 6 letras o números.' });
      return;
    }
    if (clubes.some((c) => c.id === limpio)) {
      setIdClub(limpio);
      onAviso({ tipo: 'exito', texto: 'Ya sos parte de ese club.' });
      return;
    }
    const ok = await ejecutar(
      async () => {
        await unirseAClub(limpio, uid);
        return limpio;
      },
      '¡Te uniste al club!',
      'No encontramos un club con ese código, o está lleno.',
      'clubes',
    );
    if (ok) {
      setCodigo('');
      window.history.replaceState(null, '', window.location.pathname); // limpia ?club= de la dirección
    }
  }

  async function avisoCompartir(datos) {
    try {
      const resultado = await compartir(datos);
      if (resultado === 'copiado') onAviso({ tipo: 'exito', texto: 'Copiado: pegalo donde quieras compartirlo' });
    } catch (error) {
      console.error(error);
      onAviso({ tipo: 'error', texto: 'No se pudo compartir.' });
    }
  }

  // Todas las acciones del club, agrupadas para pasarlas como una sola prop.
  const acciones = {
    compartirClub: () =>
      avisoCompartir({
        titulo: `Club ${club.nombre} en Nana`,
        texto: `¡Sumate a mi club de lectura "${club.nombre}" en Nana! Código: ${club.id}`,
        url: enlaceDeClub(club.id),
      }),
    editarClub: () => setModal({ tipo: 'club', datos: club }),
    eliminarClub: () => ejecutar(() => eliminarClub(club.id), 'Club eliminado', 'No se pudo eliminar el club.', 'clubes'),
    salirDelClub: () => ejecutar(() => quitarMiembro(club.id, uid), 'Saliste del club', 'No se pudo salir del club.', 'clubes'),
    quitarMiembro: (miembro) =>
      ejecutar(() => quitarMiembro(club.id, miembro), `${nombreDe(perfiles, miembro)} ya no está en el club`, 'No se pudo quitar al miembro.', 'club'),

    nuevaMision: () => setModal({ tipo: 'mision', datos: null }),
    editarMision: (mision) => setModal({ tipo: 'mision', datos: mision }),
    eliminarMision: (mision) =>
      ejecutar(() => eliminarMision(club.id, mision.id), 'Misión eliminada', 'No se pudo eliminar la misión.'),
    moverMision: (mision, estado) =>
      ejecutar(
        () => actualizarMision(club.id, mision.id, { estado }),
        estado === 'hecha' ? `¡Misión cumplida: "${mision.titulo}"!` : 'Misión actualizada',
        'No se pudo mover la misión.',
      ),
    compartirMision: (mision) =>
      avisoCompartir({
        titulo: 'Misión en Nana',
        texto: `Misión del club "${club.nombre}": ${mision.titulo} (para ${nombreDe(perfiles, mision.asignadaA)})${mision.fechaLimite ? `, hasta el ${mision.fechaLimite.split('-').reverse().join('/')}` : ''}.`,
        url: enlaceDeClub(club.id),
      }),

    nuevoEvento: () => setModal({ tipo: 'evento', datos: null }),
    editarEvento: (evento) => setModal({ tipo: 'evento', datos: evento }),
    eliminarEvento: (evento) =>
      ejecutar(() => eliminarEvento(club.id, evento.id), 'Evento eliminado', 'No se pudo eliminar el evento.'),
    cambiarAsistencia: (evento, voy) =>
      ejecutar(
        () => cambiarAsistencia(club.id, evento.id, uid, voy),
        voy ? `¡Te anotaste a "${evento.titulo}"!` : 'Te borraste del evento',
        'No se pudo actualizar tu asistencia.',
      ),
    compartirEvento: (evento) =>
      avisoCompartir({
        titulo: evento.titulo,
        texto: `${evento.titulo} · ${new Date(evento.fecha).toLocaleString('es-AR')}${evento.lugar ? ` · ${evento.lugar}` : ''} (club "${club.nombre}" en Nana)`,
        url: enlaceDeClub(club.id),
      }),
  };

  function guardarModal(datos) {
    const { tipo, datos: inicial } = modal;
    if (tipo === 'perfil') return guardarMiPerfil(datos);
    if (tipo === 'club' && inicial)
      return ejecutar(() => actualizarClub(club.id, datos), 'Club actualizado', 'No se pudo guardar el club.', 'club');
    if (tipo === 'club')
      return ejecutar(() => crearClub(uid, datos), `¡Creaste el club "${datos.nombre.trim()}"!`, 'No se pudo crear el club.', 'clubes');
    if (tipo === 'mision' && inicial)
      return ejecutar(() => actualizarMision(club.id, inicial.id, { ...datos, titulo: datos.titulo.trim(), descripcion: datos.descripcion.trim() }), 'Misión actualizada', 'No se pudo guardar la misión.');
    if (tipo === 'mision')
      return ejecutar(() => crearMision(club.id, uid, datos), `Misión asignada a ${nombreDe(perfiles, datos.asignadaA)}`, 'No se pudo crear la misión.');
    if (tipo === 'evento' && inicial)
      return ejecutar(() => actualizarEvento(club.id, inicial.id, datos), 'Evento actualizado', 'No se pudo guardar el evento.');
    return ejecutar(() => crearEvento(club.id, uid, datos), `Evento "${datos.titulo.trim()}" creado`, 'No se pudo crear el evento.');
  }

  if (cargando) {
    return (
      <Ventana titulo="comunidad.exe">
        <BarraCarga texto="Cargando comunidad..." />
      </Ventana>
    );
  }

  // Primera vez: hay que elegir un apodo antes de entrar a la comunidad.
  if (!perfil) {
    return (
      <div className="bienvenida">
        <Ventana titulo="perfil_nuevo.exe">
          <p className="bienvenida__texto">
            ¡Bienvenida a la comunidad de Nana! Armá clubes de lectura con tus amigas, asignen misiones y
            organicen eventos. Primero, contanos cómo te llamamos.
          </p>
          <FormPerfil guardando={ocupado} onGuardar={guardarMiPerfil} />
        </Ventana>
      </div>
    );
  }

  const miembrosParaAsignar = club
    ? club.miembros.map((miembro) => ({ uid: miembro, nombre: miembro === uid ? `${nombreDe(perfiles, miembro)} (vos)` : nombreDe(perfiles, miembro) }))
    : [];

  return (
    <div className="comunidad">
      <div className="comunidad__lateral">
        <Ventana titulo="perfil.exe">
          <div className="perfil">
            <Avatar flor={perfil.flor} tamano={4} />
            <div>
              <p className="perfil__apodo">{perfil.apodo}</p>
              <p className="campo__ayuda">Flor: {FLORES[perfil.flor].nombre}</p>
            </div>
            <button
              className="boton boton--chico boton--editar"
              onClick={() => setModal({ tipo: 'perfil', datos: perfil })}
              aria-label="Editar perfil"
            >
              <IconoEditar />
            </button>
          </div>
        </Ventana>

        <Ventana titulo={`mis_clubes.exe (${clubes.length})`}>
          {clubes.length === 0 ? (
            <p className="campo__ayuda">Todavía no estás en ningún club. Creá uno o unite con un código.</p>
          ) : (
            <ul className="lista-clubes">
              {clubes.map((c) => (
                <li key={c.id}>
                  <button
                    className="club-item"
                    aria-current={c.id === idClub}
                    onClick={() => setIdClub(c.id)}
                  >
                    <strong>{c.nombre}</strong>
                    <span>
                      {c.miembros.length} {c.miembros.length === 1 ? 'miembro' : 'miembros'}
                      {c.adminUid === uid && ' · Admin'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button className="boton boton--principal crear-club" onClick={() => setModal({ tipo: 'club', datos: null })}>
            + Crear club
          </button>

          <form className="unirse" onSubmit={unirme}>
            <label htmlFor="codigo-club">¿Te pasaron un código?</label>
            <div className="buscador__form">
              <input
                id="codigo-club"
                value={codigo}
                onChange={(evento) => setCodigo(evento.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={6}
                autoComplete="off"
              />
              <button type="submit" className="boton boton--buscar" disabled={ocupado}>
                Unirme
              </button>
            </div>
          </form>
        </Ventana>
      </div>

      {club ? (
        <DetalleClub
          club={club}
          perfiles={perfiles}
          misiones={misiones}
          eventos={eventos}
          uid={uid}
          ahora={ahora}
          cargando={cargandoClub}
          ocupado={ocupado}
          acciones={acciones}
        />
      ) : (
        <Ventana titulo="club.exe">
          <div className="vacio">
            <Avatar flor={perfil.flor} tamano={6} />
            <p>Elegí un club, creá uno nuevo o unite con el código que te pasaron.</p>
          </div>
        </Ventana>
      )}

      {modal && (
        <Modal
          titulo={
            { perfil: 'editar_perfil.exe', club: modal.datos ? 'editar_club.exe' : 'nuevo_club.exe', mision: modal.datos ? 'editar_mision.exe' : 'nueva_mision.exe', evento: modal.datos ? 'editar_evento.exe' : 'nuevo_evento.exe' }[modal.tipo]
          }
          onCerrar={() => setModal(null)}
        >
          {modal.tipo === 'perfil' && <FormPerfil inicial={modal.datos} guardando={ocupado} onGuardar={guardarModal} onCancelar={() => setModal(null)} />}
          {modal.tipo === 'club' && <FormClub inicial={modal.datos} guardando={ocupado} onGuardar={guardarModal} onCancelar={() => setModal(null)} />}
          {modal.tipo === 'mision' && (
            <FormMision inicial={modal.datos} miembros={miembrosParaAsignar} guardando={ocupado} onGuardar={guardarModal} onCancelar={() => setModal(null)} />
          )}
          {modal.tipo === 'evento' && <FormEvento inicial={modal.datos} guardando={ocupado} onGuardar={guardarModal} onCancelar={() => setModal(null)} />}
        </Modal>
      )}
    </div>
  );
}
