import { CATALOGO_FLORES } from '../data/flores';
import SpriteFlor from './SpriteFlor';
import Ventana from './Ventana';

const ETAPAS = ['semilla', 'brote', 'creciendo', 'flor'];

// Herbario: el catálogo de todas las flores de Nana, con su significado y cómo conseguirlas.
export default function Herbario({ plantas }) {
  return (
    <Ventana titulo={`herbario.exe (${Object.keys(CATALOGO_FLORES).length} flores)`} className="ventana--herbario">
      <p className="herbario__intro">
        Cada género de manga o anime florece con una flor distinta. Sus significados vienen del{' '}
        <strong>hanakotoba</strong>, el lenguaje japonés de las flores. Las tres últimas se eligen como avatar en
        tu perfil.
      </p>
      <ul className="herbario">
        {Object.entries(CATALOGO_FLORES).map(([clave, flor]) => {
          const enMiJardin = plantas.filter((p) => p.genero === clave);
          const florecidas = enMiJardin.filter((p) => p.estado === 'terminado').length;
          return (
            <li key={clave} className="herbario__flor">
              <div className="herbario__dibujo">
                <SpriteFlor clave={clave} tamano={5} etiqueta={flor.nombre} />
              </div>
              <div className="herbario__datos">
                <h3>{flor.nombre}</h3>
                <p className="herbario__japones">{flor.japones === 'inventada' ? 'Flor inventada por Nana' : `En japonés: ${flor.japones}`}</p>
                <p>{flor.significado}</p>
                <p className="insignia">{flor.genero ? `Florece con: ${flor.genero}` : 'Avatar del perfil'}</p>
                {flor.genero && (
                  <p className="campo__ayuda">
                    En tu jardín: {enMiJardin.length} {enMiJardin.length === 1 ? 'planta' : 'plantas'}
                    {florecidas > 0 && ` (${florecidas} en flor)`}
                  </p>
                )}
                {flor.genero && (
                  <div className="herbario__etapas" aria-label={`Etapas de ${flor.nombre}`}>
                    {ETAPAS.map((etapa) => (
                      <SpriteFlor key={etapa} clave={clave} etapa={etapa} tamano={2} />
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Ventana>
  );
}
