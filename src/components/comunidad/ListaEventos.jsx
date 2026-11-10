import { TIPOS_EVENTO, buscarOpcion, nombreDe } from '../../data/comunidad';
import BotonEliminar from './BotonEliminar';
import IconoEditar from './IconoEditar';

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23', // 20:00 en lugar de 08:00 p. m.
  });
}

// Eventos del club, separados en "próximos" y "pasados" con filter.
export default function ListaEventos({
  eventos,
  perfiles,
  uid,
  ahora,
  esAdmin,
  ocupado,
  onNuevo,
  onEditar,
  onEliminar,
  onAsistencia,
  onCompartir,
}) {
  const proximos = eventos.filter((evento) => evento.fecha >= ahora);
  const pasados = eventos.filter((evento) => evento.fecha < ahora).reverse();

  function tarjeta(evento, pasado) {
    const tipo = buscarOpcion(TIPOS_EVENTO, evento.tipo);
    const voy = evento.asistentes.includes(uid);
    const puedeEditar = evento.creadoPor === uid || esAdmin;
    return (
      <li key={evento.id} className={`evento ${pasado ? 'evento--pasado' : ''}`}>
        <div className="evento__fecha">{formatearFecha(evento.fecha)}</div>
        <div className="evento__cuerpo">
          <span className="evento__tipo">{tipo.etiqueta}</span>
          <h5 className="evento__titulo">{evento.titulo}</h5>
          {evento.lugar && <p className="evento__dato">Dónde: {evento.lugar}</p>}
          {evento.descripcion && <p className="evento__dato">{evento.descripcion}</p>}
          <p className="evento__dato">
            Van ({evento.asistentes.length}):{' '}
            {evento.asistentes.map((id) => (id === uid ? 'vos' : nombreDe(perfiles, id))).join(', ') || 'nadie todavía'}
          </p>
          <div className="mision__acciones">
            {!pasado && (
              <button
                className={`boton boton--chico ${voy ? 'boton--peligro' : 'boton--agua'}`}
                disabled={ocupado}
                onClick={() => onAsistencia(evento, !voy)}
              >
                {voy ? 'Ya no voy' : '¡Voy!'}
              </button>
            )}
            <button
              className="boton boton--chico"
              onClick={() => onCompartir(evento)}
              aria-label={`Compartir ${evento.titulo}`}
              title="Compartir"
            >
              ↗
            </button>
            {puedeEditar && (
              <>
                <button
                  className="boton boton--chico boton--editar"
                  disabled={ocupado}
                  onClick={() => onEditar(evento)}
                  aria-label={`Editar ${evento.titulo}`}
                  title="Editar"
                >
                  <IconoEditar />
                </button>
                <BotonEliminar etiqueta={evento.titulo} disabled={ocupado} onConfirmar={() => onEliminar(evento)} />
              </>
            )}
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="eventos">
      <div className="tablero__barra">
        <p className="campo__ayuda">Cualquier miembro puede proponer un evento.</p>
        <button className="boton boton--principal boton--chico" onClick={onNuevo}>
          + Nuevo evento
        </button>
      </div>

      <h4 className="eventos__subtitulo">Próximos</h4>
      {proximos.length === 0 ? (
        <p className="columna__vacia">No hay eventos próximos. ¡Proponé uno!</p>
      ) : (
        <ul className="eventos__lista">{proximos.map((evento) => tarjeta(evento, false))}</ul>
      )}

      {pasados.length > 0 && (
        <>
          <h4 className="eventos__subtitulo">Pasados</h4>
          <ul className="eventos__lista">{pasados.map((evento) => tarjeta(evento, true))}</ul>
        </>
      )}
    </div>
  );
}
