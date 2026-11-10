import { useState } from 'react';
import { ESTADOS_MISION, TIPOS_MISION, buscarOpcion, nombreDe } from '../../data/comunidad';
import BotonEliminar from './BotonEliminar';
import IconoEditar from './IconoEditar';

// Tablero estilo Kanban: una columna por estado ("Por hacer", "Haciendo", "Hecha").
// filter elige las misiones de cada columna y map las dibuja.
export default function TableroMisiones({
  misiones,
  perfiles,
  uid,
  hoy,
  esAdmin,
  ocupado,
  onNueva,
  onEditar,
  onEliminar,
  onMover,
  onCompartir,
}) {
  const [soloMias, setSoloMias] = useState(false);

  const visibles = soloMias ? misiones.filter((mision) => mision.asignadaA === uid) : misiones;

  return (
    <div className="tablero">
      <div className="tablero__barra">
        <label className="interruptor">
          <input type="checkbox" checked={soloMias} onChange={(evento) => setSoloMias(evento.target.checked)} />
          Solo mis misiones
        </label>
        {esAdmin ? (
          <button className="boton boton--principal boton--chico" onClick={onNueva}>
            + Nueva misión
          </button>
        ) : (
          <p className="campo__ayuda">Solo la administradora asigna misiones.</p>
        )}
      </div>

      <div className="tablero__columnas">
        {ESTADOS_MISION.map((estado, indice) => {
          const columna = visibles.filter((mision) => mision.estado === estado.valor);
          return (
            <section key={estado.valor} className={`columna columna--${estado.valor}`}>
              <h4 className="columna__titulo">
                {estado.etiqueta} <span>{columna.length}</span>
              </h4>
              {columna.length === 0 && <p className="columna__vacia">Nada por acá</p>}
              <ul className="columna__lista">
                {columna.map((mision) => {
                  const tipo = buscarOpcion(TIPOS_MISION, mision.tipo);
                  const esMia = mision.asignadaA === uid;
                  const vencida = mision.fechaLimite && mision.fechaLimite < hoy && mision.estado !== 'hecha';
                  return (
                    <li key={mision.id} className={`mision ${esMia ? 'mision--mia' : ''}`}>
                      <span className="mision__tipo" style={{ '--chip': tipo.color }}>
                        {tipo.etiqueta}
                      </span>
                      <h5 className="mision__titulo">{mision.titulo}</h5>
                      {mision.descripcion && <p className="mision__detalle">{mision.descripcion}</p>}
                      <p className="mision__dato">
                        Para: <strong>{esMia ? 'vos' : nombreDe(perfiles, mision.asignadaA)}</strong>
                      </p>
                      {mision.fechaLimite && (
                        <p className={`mision__dato ${vencida ? 'mision__dato--vencida' : ''}`}>
                          Hasta: {mision.fechaLimite.split('-').reverse().join('/')}
                          {vencida && ' (vencida)'}
                        </p>
                      )}

                      <div className="mision__acciones">
                        {esMia && indice > 0 && (
                          <button
                            className="boton boton--chico"
                            disabled={ocupado}
                            onClick={() => onMover(mision, ESTADOS_MISION[indice - 1].valor)}
                            aria-label={`Volver a ${ESTADOS_MISION[indice - 1].etiqueta}`}
                          >
                            ◀
                          </button>
                        )}
                        {esMia && indice < ESTADOS_MISION.length - 1 && (
                          <button
                            className="boton boton--chico boton--agua"
                            disabled={ocupado}
                            onClick={() => onMover(mision, ESTADOS_MISION[indice + 1].valor)}
                          >
                            {indice === 0 ? 'Empezar ▶' : 'Terminar ▶'}
                          </button>
                        )}
                        <button
                          className="boton boton--chico"
                          onClick={() => onCompartir(mision)}
                          aria-label={`Compartir ${mision.titulo}`}
                          title="Compartir"
                        >
                          ↗
                        </button>
                        {esAdmin && (
                          <>
                            <button
                              className="boton boton--chico boton--editar"
                              disabled={ocupado}
                              onClick={() => onEditar(mision)}
                              aria-label={`Editar ${mision.titulo}`}
                              title="Editar"
                            >
                              <IconoEditar />
                            </button>
                            <BotonEliminar
                              etiqueta={mision.titulo}
                              disabled={ocupado}
                              onConfirmar={() => onEliminar(mision)}
                            />
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
