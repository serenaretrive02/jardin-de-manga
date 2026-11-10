import { useState } from 'react';
import { FLORES, GENEROS } from '../data/flores';
import SpriteFlor from './SpriteFlor';

// Etapas de una planta, en orden, con lo que hace falta para llegar a cada una.
const ETAPAS = [
  { clave: 'semilla', nombre: 'Semilla', como: 'Recién plantada: 0 capítulos.' },
  { clave: 'brote', nombre: 'Brote', como: 'Ya empezaste: menos de la mitad.' },
  { clave: 'creciendo', nombre: 'Creciendo', como: 'Pasaste la mitad.' },
  { clave: 'flor', nombre: 'En flor', como: 'Lo terminaste: florece según su género.' },
];

// Botón flotante "?" que abre la leyenda: cómo se ve la flor a medida que avanzás.
// El panel se abre con un clic (funciona igual en compu y en celular) y se cierra con otro.
export default function GuiaCrecimiento() {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className="guia">
      {abierta && (
        <section className="guia__panel ventana" id="guia-panel" aria-label="Cómo crece tu flor">
          <header className="ventana__barra">
            <h2 className="ventana__titulo">como_crece.exe</h2>
            <button className="guia__cerrar" onClick={() => setAbierta(false)} aria-label="Cerrar la guía">
              ×
            </button>
          </header>
          <div className="ventana__cuerpo">
            <p className="guia__intro">Cada vez que tocás <strong>Regar +1</strong> sumás un capítulo y tu planta crece:</p>
            <ol className="guia__etapas">
              {ETAPAS.map((etapa, indice) => (
                <li key={etapa.clave} className="guia__etapa">
                  <SpriteFlor clave="romance" etapa={etapa.clave} tamano={3} />
                  <strong>
                    {indice + 1}. {etapa.nombre}
                  </strong>
                  <span>{etapa.como}</span>
                </li>
              ))}
            </ol>
            <div className="guia__marchita">
              <SpriteFlor etapa="marchita" tamano={2} />
              <p>
                Si lo marcás como <strong>Abandonado</strong>, la planta se marchita. ¡Volvé a regarla y revive!
              </p>
            </div>

            <h3 className="guia__subtitulo">Cada género florece distinto</h3>
            <ul className="guia__flores">
              {GENEROS.map((genero) => (
                <li key={genero.valor} title={FLORES[genero.valor].significado}>
                  <SpriteFlor clave={genero.valor} tamano={2} />
                  <span>
                    <strong>{genero.etiqueta}</strong>
                    {FLORES[genero.valor].nombre}
                  </span>
                </li>
              ))}
            </ul>
            <p className="campo__ayuda">¿Querés saber más? Preguntale a Nana IA, la abeja de la esquina.</p>
          </div>
        </section>
      )}

      <button
        className="boton-flotante boton-flotante--guia"
        onClick={() => setAbierta(!abierta)}
        aria-expanded={abierta}
        aria-controls="guia-panel"
        title="¿Cómo crece tu flor?"
      >
        ?
        <span className="boton-flotante__etiqueta">¿Cómo crece tu flor?</span>
      </button>
    </div>
  );
}
