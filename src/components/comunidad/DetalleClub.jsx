import { useState } from 'react';
import { nombreDe } from '../../data/comunidad';
import BarraCarga from '../BarraCarga';
import Ventana from '../Ventana';
import Avatar from './Avatar';
import BotonEliminar from './BotonEliminar';
import IconoEditar from './IconoEditar';
import ListaEventos from './ListaEventos';
import TableroMisiones from './TableroMisiones';

// Vista de un club: datos, miembros y pestañas de misiones y eventos.
export default function DetalleClub({
  club,
  perfiles,
  misiones,
  eventos,
  uid,
  ahora,
  cargando,
  ocupado,
  acciones, // objeto con todas las funciones que vienen de Comunidad
}) {
  const [pestana, setPestana] = useState('misiones');
  const esAdmin = club.adminUid === uid;

  return (
    <Ventana titulo={`club_${club.id}.exe`} className="ventana--club">
      <div className="club__cabecera">
        <div>
          <h2 className="club__nombre">{club.nombre}</h2>
          {club.descripcion && <p className="club__descripcion">{club.descripcion}</p>}
        </div>
        <div className="club__codigo">
          <span>Código</span>
          <strong>{club.id}</strong>
          <button className="boton boton--chico boton--buscar" onClick={acciones.compartirClub}>
            Invitar ↗
          </button>
        </div>
      </div>

      <div className="club__acciones">
        {esAdmin ? (
          <>
            <span className="insignia insignia--admin">Sos la administradora</span>
            <button className="boton boton--chico boton--editar" onClick={acciones.editarClub} disabled={ocupado}>
              <IconoEditar /> Editar club
            </button>
            <BotonEliminar etiqueta={club.nombre} texto="Eliminar club" disabled={ocupado} onConfirmar={acciones.eliminarClub} />
          </>
        ) : (
          <>
            <span className="insignia">Sos miembro</span>
            <BotonEliminar etiqueta={club.nombre} texto="Salir del club" disabled={ocupado} onConfirmar={acciones.salirDelClub} />
          </>
        )}
      </div>

      <section className="miembros" aria-label="Miembros">
        <h3 className="miembros__titulo">
          Miembros ({club.miembros.length})
        </h3>
        <ul className="miembros__lista">
          {club.miembros.map((miembro) => (
            <li key={miembro} className="miembro">
              <Avatar flor={perfiles[miembro]?.flor} tamano={2} />
              <span>
                {nombreDe(perfiles, miembro)}
                {miembro === uid && ' (vos)'}
              </span>
              {miembro === club.adminUid && <span className="insignia insignia--admin">Admin</span>}
              {esAdmin && miembro !== uid && (
                <BotonEliminar
                  etiqueta={`a ${nombreDe(perfiles, miembro)} del club`}
                  disabled={ocupado}
                  onConfirmar={() => acciones.quitarMiembro(miembro)}
                />
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="pestanas pestanas--chicas" role="tablist">
        <button role="tab" aria-selected={pestana === 'misiones'} className="pestana" onClick={() => setPestana('misiones')}>
          Misiones ({misiones.length})
        </button>
        <button role="tab" aria-selected={pestana === 'eventos'} className="pestana" onClick={() => setPestana('eventos')}>
          Eventos ({eventos.length})
        </button>
      </div>

      {cargando ? (
        <BarraCarga texto="Cargando club..." />
      ) : pestana === 'misiones' ? (
        <TableroMisiones
          misiones={misiones}
          perfiles={perfiles}
          uid={uid}
          hoy={ahora.slice(0, 10)}
          esAdmin={esAdmin}
          ocupado={ocupado}
          onNueva={acciones.nuevaMision}
          onEditar={acciones.editarMision}
          onEliminar={acciones.eliminarMision}
          onMover={acciones.moverMision}
          onCompartir={acciones.compartirMision}
        />
      ) : (
        <ListaEventos
          eventos={eventos}
          perfiles={perfiles}
          uid={uid}
          ahora={ahora}
          esAdmin={esAdmin}
          ocupado={ocupado}
          onNuevo={acciones.nuevoEvento}
          onEditar={acciones.editarEvento}
          onEliminar={acciones.eliminarEvento}
          onAsistencia={acciones.cambiarAsistencia}
          onCompartir={acciones.compartirEvento}
        />
      )}
    </Ventana>
  );
}
