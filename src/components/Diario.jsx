import { useState } from 'react';
import { ESTADOS_CERRADOS, FLORES, fechaDeLectura } from '../data/flores';
import { GATO, PALETA_GATO } from '../data/decoracion';
import PixelSprite from './PixelSprite';
import Puntuacion from './Puntuacion';
import SpriteFlor from './SpriteFlor';
import Ventana from './Ventana';

// v1.2 · Diario de lecturas, como en Letterboxd: todo lo que terminaste (o abandonaste),
// ordenado por fecha, con tus sakuras y tu reseña. No es una colección nueva en Firestore:
// muestra las mismas plantas del jardín (users/{uid}/plantas), filtradas por estado.

const FILTROS = [
  { valor: 'todas', etiqueta: 'Todas', cumple: () => true },
  { valor: 'terminado', etiqueta: 'Terminadas', cumple: (p) => p.estado === 'terminado' },
  { valor: 'abandonado', etiqueta: 'Abandonadas', cumple: (p) => p.estado === 'abandonado' },
  { valor: 'resena', etiqueta: 'Con reseña', cumple: (p) => Boolean(p.resena) },
  { valor: 'sin-puntuar', etiqueta: 'Sin puntuar', cumple: (p) => !p.puntuacion },
];

const ORDENES = [
  { valor: 'reciente', etiqueta: 'Fecha: más recientes' },
  { valor: 'antigua', etiqueta: 'Fecha: más antiguas' },
  { valor: 'puntuacion', etiqueta: 'Mejor puntuadas' },
  { valor: 'titulo', etiqueta: 'Título (A-Z)' },
];

const COMPARAR = {
  reciente: (a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''),
  antigua: (a, b) => (a.fecha ?? '9999').localeCompare(b.fecha ?? '9999'),
  puntuacion: (a, b) => (b.puntuacion ?? 0) - (a.puntuacion ?? 0),
  titulo: (a, b) => a.titulo.localeCompare(b.titulo),
};

// "2026-11-13" → objeto Date en hora local (no UTC)
function aFecha(texto) {
  const [anio, mes, dia] = texto.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

function nombreDelMes(texto) {
  if (!texto) return 'Sin fecha';
  const mes = aFecha(texto).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
  return mes.charAt(0).toUpperCase() + mes.slice(1);
}

// Agrupa las entradas por mes (como las páginas de un diario). reduce arma un objeto { mes: [entradas] }.
function agruparPorMes(entradas) {
  const grupos = entradas.reduce((acumulado, entrada) => {
    const mes = nombreDelMes(entrada.fecha);
    (acumulado[mes] ??= []).push(entrada);
    return acumulado;
  }, {});
  return Object.entries(grupos);
}

export default function Diario({ plantas, idOcupada, onActualizar, onEditar, onIrAlJardin }) {
  const [filtro, setFiltro] = useState('todas');
  const [orden, setOrden] = useState('reciente');
  const [borrando, setBorrando] = useState(null); // id de la entrada cuya reseña se está por borrar

  // CONSULTAR: las plantas cuya historia terminó, con la fecha que se muestra en el diario.
  const leidas = plantas
    .filter((p) => ESTADOS_CERRADOS.includes(p.estado))
    .map((p) => ({ ...p, fecha: fechaDeLectura(p) }));

  const puntuadas = leidas.filter((p) => p.puntuacion);
  const conResena = leidas.filter((p) => p.resena);
  const promedio = puntuadas.length ? puntuadas.reduce((t, p) => t + p.puntuacion, 0) / puntuadas.length : null;
  // Cuántas lecturas tienen 5, 4, 3, 2 y 1 sakuras (para el gráfico de barras).
  const distribucion = [5, 4, 3, 2, 1].map((n) => ({ n, cantidad: puntuadas.filter((p) => p.puntuacion === n).length }));
  const maximo = Math.max(1, ...distribucion.map((d) => d.cantidad));

  const criterio = FILTROS.find((f) => f.valor === filtro);
  const visibles = leidas.filter(criterio.cumple).sort(COMPARAR[orden]);
  const porFecha = orden === 'reciente' || orden === 'antigua';
  const grupos = porFecha ? agruparPorMes(visibles) : [['', visibles]];

  // CREAR / MODIFICAR la puntuación tocando una sakura. Tocar la misma la ELIMINA.
  function puntuar(planta, n) {
    if (n === planta.puntuacion) {
      onActualizar(planta.id, { puntuacion: null }, `Quitaste la puntuación de "${planta.titulo}"`);
      return;
    }
    onActualizar(planta.id, { puntuacion: n }, `Le diste ${n} ${n === 1 ? 'sakura' : 'sakuras'} a "${planta.titulo}"`, 'florecer');
  }

  // ELIMINAR la reseña completa (sakuras + texto). La planta sigue en el jardín y en el diario.
  async function borrarResena(planta) {
    const ok = await onActualizar(
      planta.id,
      { puntuacion: null, resena: null },
      `Borraste tu reseña de "${planta.titulo}"`,
      'compostar',
    );
    if (ok) setBorrando(null);
  }

  if (leidas.length === 0) {
    return (
      <Ventana titulo="diario.exe (0)" className="ventana--diario" adorno="izq">
        <div className="vacio diario__vacio">
          <PixelSprite filas={GATO} paleta={PALETA_GATO} tamano={5} etiqueta="Gatito esperando" />
          <p>
            <strong>Tu diario todavía está en blanco.</strong>
          </p>
          <p className="campo__ayuda">
            Cuando termines un manga o anime (o lo abandones), se anota acá con la fecha. Después podés
            puntuarlo con sakuras y escribir qué te pareció, como en Letterboxd.
          </p>
          <button type="button" className="boton boton--principal" onClick={onIrAlJardin}>
            Ir a mi jardín
          </button>
        </div>
      </Ventana>
    );
  }

  return (
    <Ventana titulo={`diario.exe (${leidas.length})`} className="ventana--diario" adorno="izq">
      <p className="diario__intro">
        Tu diario de lecturas: todo lo que <strong>terminaste o abandonaste</strong>, con la fecha, tus sakuras y tu
        reseña. Tocá una sakura para puntuar, o el lápiz para escribir la reseña y cambiar la fecha.
      </p>

      <section className="diario__resumen" aria-label="Resumen del diario">
        <div className="diario__numeros">
          <p>
            <strong>{leidas.length}</strong> {leidas.length === 1 ? 'leída' : 'leídas'}
          </p>
          <p>
            <strong>{puntuadas.length}</strong> {puntuadas.length === 1 ? 'puntuada' : 'puntuadas'}
          </p>
          <p>
            <strong>{conResena.length}</strong> {conResena.length === 1 ? 'reseña' : 'reseñas'}
          </p>
          {promedio !== null && (
            <p className="diario__promedio">
              <strong>{promedio.toFixed(1).replace('.', ',')}</strong> de promedio
            </p>
          )}
        </div>
        <div className="diario__grafico" role="img" aria-label={distribucion.map((d) => `${d.n} sakuras: ${d.cantidad}`).join(', ')}>
          <span className="diario__grafico-titulo">Tus puntuaciones</span>
          {distribucion.map((d) => (
            <div key={d.n} className="diario__barra">
              <span className="diario__barra-etiqueta">{d.n}</span>
              <span className="diario__barra-fondo">
                <span className="diario__barra-relleno" style={{ width: `${(d.cantidad / maximo) * 100}%` }} />
              </span>
              <span className="diario__barra-cantidad">{d.cantidad}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="diario__filtros">
        <div className="chips" role="group" aria-label="Filtrar el diario">
          {FILTROS.map((f) => (
            <button
              key={f.valor}
              type="button"
              className="chip"
              aria-pressed={filtro === f.valor}
              onClick={() => setFiltro(f.valor)}
            >
              {f.etiqueta} ({leidas.filter(f.cumple).length})
            </button>
          ))}
        </div>
        <label className="diario__orden">
          <span className="sr-only">Ordenar el diario</span>
          <select value={orden} onChange={(evento) => setOrden(evento.target.value)}>
            {ORDENES.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.etiqueta}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visibles.length === 0 ? (
        <div className="vacio">
          <SpriteFlor etapa="semilla" tamano={4} />
          <p>No hay lecturas con ese filtro.</p>
        </div>
      ) : (
        grupos.map(([mes, entradas]) => (
          <section key={mes || 'todas'} className="diario__mes" aria-label={mes || 'Lecturas'}>
            {mes && <h3 className="diario__mes-titulo">{mes}</h3>}
            <ul className="diario__lista">
              {entradas.map((p) => {
                const ocupada = idOcupada === p.id;
                const fecha = p.fecha ? aFecha(p.fecha) : null;
                return (
                  <li key={p.id} className="entrada" aria-busy={ocupada}>
                    <div className="entrada__dia" title={p.terminadoEn ? 'Fecha en que terminó' : 'Fecha en que la plantaste'}>
                      {fecha ? (
                        <>
                          <strong>{fecha.getDate()}</strong>
                          <span>{fecha.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '')}</span>
                        </>
                      ) : (
                        <span>—</span>
                      )}
                    </div>

                    <div className="entrada__poster">
                      {p.portada ? (
                        <img src={p.portada} alt={`Portada de ${p.titulo}`} loading="lazy" />
                      ) : (
                        <SpriteFlor
                          clave={p.genero}
                          etapa={p.estado === 'abandonado' ? 'marchita' : 'flor'}
                          tamano={3}
                          etiqueta={FLORES[p.genero].nombre}
                        />
                      )}
                    </div>

                    <div className="entrada__info">
                      <h4 className="entrada__titulo" title={p.titulo}>
                        {p.titulo}
                      </h4>
                      <p className="entrada__datos">
                        <span className={`insignia insignia--${p.estado}`}>
                          {p.estado === 'terminado' ? 'En flor' : 'Marchita'}
                        </span>
                        {p.tipo === 'anime' ? 'Anime' : 'Manga'} · {p.capitulosLeidos}{' '}
                        {p.tipo === 'anime' ? 'ep.' : 'cap.'}
                      </p>
                      <Puntuacion
                        valor={p.puntuacion ?? 0}
                        onCambiar={(n) => puntuar(p, n)}
                        deshabilitada={ocupada}
                        titulo={p.titulo}
                      />
                      {p.resena ? (
                        <p className="entrada__cita">“{p.resena}”</p>
                      ) : (
                        <p className="campo__ayuda">Sin reseña todavía.</p>
                      )}
                    </div>

                    <div className="entrada__acciones">
                      {borrando === p.id ? (
                        <>
                          <p className="entrada__pregunta">¿Borrar sakuras y reseña?</p>
                          <button type="button" className="boton boton--peligro boton--chico" onClick={() => borrarResena(p)} disabled={ocupada}>
                            Sí
                          </button>
                          <button type="button" className="boton boton--chico" onClick={() => setBorrando(null)}>
                            No
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="boton boton--chico" onClick={() => onEditar(p)} disabled={ocupada}>
                            {p.resena ? 'Editar reseña' : 'Escribir reseña'}
                          </button>
                          {(p.puntuacion || p.resena) && (
                            <button
                              type="button"
                              className="boton boton--chico boton--borrar-resena"
                              onClick={() => setBorrando(p.id)}
                              disabled={ocupada}
                            >
                              Borrar reseña
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </Ventana>
  );
}
