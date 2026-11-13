import { useState } from 'react';
import { ESTADOS, FLORES, GENEROS, avanceDePlanta } from '../data/flores';
import { normalizar } from '../services/asistente';
import ListaJardin from './ListaJardin';
import Puntuacion from './Puntuacion';
import SpriteFlor from './SpriteFlor';

const ORDENES = [
  { valor: 'recientes', etiqueta: 'Más recientes' },
  { valor: 'titulo', etiqueta: 'Título (A-Z)' },
  { valor: 'avance', etiqueta: 'Más avanzadas' },
  { valor: 'capitulos', etiqueta: 'Más regadas' },
  { valor: 'puntuacion', etiqueta: 'Mejor puntuadas' }, // v1.2
];

const FILTROS_INICIALES = { texto: '', estado: 'todos', genero: 'todos', tipo: 'todos', orden: 'recientes' };

// Comparadores para sort (cada uno devuelve negativo, cero o positivo).
const COMPARAR = {
  recientes: () => 0, // ya vienen ordenadas por fecha desde Firestore
  titulo: (a, b) => a.titulo.localeCompare(b.titulo),
  avance: (a, b) => (avanceDePlanta(b) ?? 0) - (avanceDePlanta(a) ?? 0),
  capitulos: (a, b) => b.capitulosLeidos - a.capitulosLeidos,
  puntuacion: (a, b) => (b.puntuacion ?? 0) - (a.puntuacion ?? 0),
};

// "Mi ramo" + filtros + lista del jardín.
// Los filtros NO necesitan useEffect: se calculan con filter y sort en cada render.
export default function JardinFiltrado({ plantas, idOcupada, onActualizar, onEliminar, onEditar }) {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  function cambiar(campo, valor) {
    setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
  }

  const busqueda = normalizar(filtros.texto).trim();
  const visibles = plantas
    .filter((p) => !busqueda || normalizar(p.titulo).includes(busqueda))
    .filter((p) => filtros.estado === 'todos' || p.estado === filtros.estado)
    .filter((p) => filtros.genero === 'todos' || p.genero === filtros.genero)
    .filter((p) => filtros.tipo === 'todos' || p.tipo === filtros.tipo)
    .sort(COMPARAR[filtros.orden]);

  const hayFiltros = JSON.stringify(filtros) !== JSON.stringify(FILTROS_INICIALES);

  // ---- Mi ramo: estadísticas del jardín (reduce, filter, map) ----
  const terminadas = plantas.filter((p) => p.estado === 'terminado');
  const capitulos = plantas.reduce((total, p) => total + p.capitulosLeidos, 0);
  const conteoPorGenero = GENEROS.map((g) => ({ ...g, cantidad: plantas.filter((p) => p.genero === g.valor).length }));
  const favorito = [...conteoPorGenero].sort((a, b) => b.cantidad - a.cantidad)[0];
  // v1.2 · Promedio de tus puntuaciones (solo cuentan las plantas puntuadas).
  const puntuadas = plantas.filter((p) => p.puntuacion);
  const promedio = puntuadas.length
    ? puntuadas.reduce((total, p) => total + p.puntuacion, 0) / puntuadas.length
    : null;

  if (plantas.length === 0) {
    return <ListaJardin plantas={plantas} />;
  }

  return (
    <>
      <section className="ramo" aria-label="Mi ramo">
        <div className="ramo__datos">
          <p>
            <strong>{plantas.length}</strong> {plantas.length === 1 ? 'planta' : 'plantas'}
          </p>
          <p>
            <strong>{terminadas.length}</strong> en flor
          </p>
          <p>
            <strong>{capitulos}</strong> caps. regados
          </p>
          {promedio !== null && (
            <p className="ramo__promedio" title={`Promedio de ${puntuadas.length} ${puntuadas.length === 1 ? 'reseña' : 'reseñas'}`}>
              <Puntuacion valor={Math.round(promedio)} tamano={2} />
              <span>
                <strong>{promedio.toFixed(1).replace('.', ',')}</strong> de promedio
              </span>
            </p>
          )}
          {favorito.cantidad > 0 && (
            <p className="ramo__favorito" title={FLORES[favorito.valor].significado}>
              <SpriteFlor clave={favorito.valor} tamano={2} />
              <span>
                Tu género favorito: <strong>{favorito.etiqueta}</strong>
              </span>
            </p>
          )}
        </div>
        <div className="ramo__flores" aria-label={`Mi ramo: ${terminadas.length} flores`}>
          <span className="ramo__titulo">Mi ramo</span>
          {terminadas.length === 0 ? (
            <span className="campo__ayuda">Terminá un manga y su flor se suma a tu ramo.</span>
          ) : (
            terminadas.slice(0, 14).map((p) => (
              <span key={p.id} title={`${p.titulo} · ${FLORES[p.genero].nombre}${p.puntuacion ? ` · ${p.puntuacion}/5` : ''}`}>
                <SpriteFlor clave={p.genero} tamano={2} />
              </span>
            ))
          )}
        </div>
      </section>

      <form className="filtros" onSubmit={(evento) => evento.preventDefault()} role="search" aria-label="Filtrar el jardín">
        <div className="filtros__busqueda">
          <label htmlFor="filtro-texto" className="sr-only">
            Buscar en mi jardín
          </label>
          <input
            id="filtro-texto"
            type="search"
            value={filtros.texto}
            onChange={(evento) => cambiar('texto', evento.target.value)}
            placeholder="Buscar en mi jardín..."
          />
        </div>

        <div className="chips" role="group" aria-label="Filtrar por estado">
          {[{ valor: 'todos', etiqueta: 'Todas' }, ...ESTADOS].map((estado) => {
            const cantidad =
              estado.valor === 'todos' ? plantas.length : plantas.filter((p) => p.estado === estado.valor).length;
            return (
              <button
                key={estado.valor}
                type="button"
                className="chip"
                aria-pressed={filtros.estado === estado.valor}
                onClick={() => cambiar('estado', estado.valor)}
              >
                {estado.etiqueta.split(' /')[0]} ({cantidad})
              </button>
            );
          })}
        </div>

        <div className="filtros__selects">
          <label>
            <span className="sr-only">Género</span>
            <select value={filtros.genero} onChange={(evento) => cambiar('genero', evento.target.value)}>
              <option value="todos">Todos los géneros</option>
              {GENEROS.map((g) => (
                <option key={g.valor} value={g.valor}>
                  {g.etiqueta} · {FLORES[g.valor].nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Tipo</span>
            <select value={filtros.tipo} onChange={(evento) => cambiar('tipo', evento.target.value)}>
              <option value="todos">Manga y anime</option>
              <option value="manga">Solo manga</option>
              <option value="anime">Solo anime</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Ordenar</span>
            <select value={filtros.orden} onChange={(evento) => cambiar('orden', evento.target.value)}>
              {ORDENES.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {o.etiqueta}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="filtros__resumen" role="status">
          Mostrando {visibles.length} de {plantas.length}
          {hayFiltros && (
            <button type="button" className="boton boton--chico" onClick={() => setFiltros(FILTROS_INICIALES)}>
              Limpiar filtros
            </button>
          )}
        </p>
      </form>

      {visibles.length === 0 ? (
        <div className="vacio">
          <SpriteFlor etapa="semilla" tamano={4} />
          <p>Ninguna planta coincide con esos filtros.</p>
        </div>
      ) : (
        <ListaJardin
          plantas={visibles}
          idOcupada={idOcupada}
          onActualizar={onActualizar}
          onEliminar={onEliminar}
          onEditar={onEditar}
        />
      )}
    </>
  );
}
