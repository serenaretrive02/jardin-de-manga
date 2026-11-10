import { useState } from 'react';
import { FLORES } from '../data/flores';
import { buscarObras } from '../services/kitsu';

// Buscador de mangas/animes reales (API de Kitsu).
// La consulta se hace al enviar el formulario (un evento), no en cada letra:
// así se evitan pedidos innecesarios y el límite de consultas de la API.
export default function BuscadorObras({ tipo, onElegir }) {
  const [texto, setTexto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState('');
  const [buscado, setBuscado] = useState(false); // para distinguir "sin resultados" de "todavía no buscó"

  async function manejarBusqueda(evento) {
    evento.preventDefault();
    const consulta = texto.trim();
    if (consulta.length < 2) {
      setError('Escribí al menos 2 letras para buscar.');
      return;
    }

    setBuscando(true);
    setError('');
    try {
      const encontrados = await buscarObras(consulta, tipo);
      setResultados(encontrados);
      setBuscado(true);
    } catch (problema) {
      console.error(problema);
      setResultados([]);
      setError(
        problema.message === 'LIMITE'
          ? 'Demasiadas búsquedas seguidas. Esperá unos segundos.'
          : 'No se pudo consultar la API. Podés completar los datos a mano.',
      );
    } finally {
      setBuscando(false);
    }
  }

  function elegir(obra) {
    onElegir(obra);
    setResultados([]);
    setBuscado(false);
    setTexto('');
  }

  return (
    <div className="buscador">
      <form className="buscador__form" onSubmit={manejarBusqueda} role="search">
        <label htmlFor="busqueda" className="sr-only">
          Buscar {tipo}
        </label>
        <input
          id="busqueda"
          type="search"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder={tipo === 'anime' ? 'Ej: Spy x Family' : 'Ej: Frieren'}
        />
        <button type="submit" className="boton boton--buscar" disabled={buscando}>
          {buscando ? '...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="campo__error" role="alert">{error}</p>}
      {buscando && <p className="campo__ayuda" role="status">Buscando en Kitsu...</p>}

      {buscado && !buscando && resultados.length === 0 && !error && (
        <p className="campo__ayuda">No encontramos nada con ese nombre. Probá con otro o completalo a mano.</p>
      )}

      {resultados.length > 0 && (
        <ul className="resultados">
          {resultados.map((obra) => (
            <li key={obra.kitsuId}>
              <button type="button" className="resultado" onClick={() => elegir(obra)}>
                {obra.portada ? (
                  <img src={obra.portada} alt="" className="resultado__portada" loading="lazy" />
                ) : (
                  <span className="resultado__portada resultado__portada--vacia" />
                )}
                <span className="resultado__texto">
                  <strong>{obra.titulo}</strong>
                  <span>
                    {obra.anio || 's/f'} · {obra.capitulos ?? '?'} {tipo === 'anime' ? 'ep.' : 'cap.'}
                  </span>
                  <span>{FLORES[obra.genero].nombre}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
