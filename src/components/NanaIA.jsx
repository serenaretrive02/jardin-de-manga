import { useEffect, useRef, useState } from 'react';
import { SUGERENCIAS } from '../data/conocimiento';
import { responder } from '../services/asistente';
import Abeja from './Abeja';

const BIENVENIDA = {
  de: 'nana',
  texto: '¡Hola! Soy Nana IA, la abeja jardinera. Te explico paso a paso cómo usar Nana. ¿Qué querés saber?',
  sugerir: true,
};

// Asistente virtual: un botón flotante con la abeja que abre una ventana de chat.
export default function NanaIA({ plantas }) {
  const [abierta, setAbierta] = useState(false);
  const [mensajes, setMensajes] = useState([BIENVENIDA]);
  const [texto, setTexto] = useState('');
  const [pensando, setPensando] = useState(false);
  const finDelChat = useRef(null); // referencia al final de la lista, para bajar el scroll

  // Cada vez que llega un mensaje nuevo, se baja hasta el final del chat.
  useEffect(() => {
    finDelChat.current?.scrollIntoView({ block: 'end' });
  }, [mensajes, pensando, abierta]);

  function preguntar(pregunta) {
    if (!pregunta.trim() || pensando) return;
    setMensajes((anteriores) => [...anteriores, { de: 'yo', texto: pregunta.trim() }]);
    setTexto('');
    setPensando(true);
    // Una pequeña pausa para que se note que "está pensando".
    setTimeout(() => {
      const respuesta = responder(pregunta, { plantas });
      setMensajes((anteriores) => [...anteriores, { de: 'nana', ...respuesta }]);
      setPensando(false);
    }, 550);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    preguntar(texto);
  }

  return (
    <div className="nana-ia">
      {abierta && (
        <section className="nana-ia__panel ventana" id="nana-ia-panel" aria-label="Chat con Nana IA">
          <header className="ventana__barra">
            <h2 className="ventana__titulo">nana_ia.exe</h2>
            <button className="guia__cerrar" onClick={() => setAbierta(false)} aria-label="Cerrar el chat">
              ×
            </button>
          </header>

          <div className="nana-ia__mensajes" role="log" aria-live="polite">
            {mensajes.map((mensaje, indice) => (
              <div key={indice} className={`burbuja burbuja--${mensaje.de}`}>
                {mensaje.de === 'nana' && (
                  <span className="burbuja__avatar" aria-hidden="true">
                    <Abeja tamano={2} />
                  </span>
                )}
                <div className="burbuja__texto">
                  <p>{mensaje.texto}</p>
                  {mensaje.pasos && (
                    <ol className="burbuja__pasos">
                      {mensaje.pasos.map((paso) => (
                        <li key={paso}>{paso}</li>
                      ))}
                    </ol>
                  )}
                  {mensaje.sugerir && indice === mensajes.length - 1 && (
                    <div className="chips burbuja__sugerencias">
                      {SUGERENCIAS.map((sugerencia) => (
                        <button key={sugerencia} className="chip" onClick={() => preguntar(sugerencia)}>
                          {sugerencia}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {pensando && (
              <div className="burbuja burbuja--nana">
                <span className="burbuja__avatar" aria-hidden="true">
                  <Abeja tamano={2} />
                </span>
                <p className="burbuja__texto burbuja__pensando">Nana está pensando<span>...</span></p>
              </div>
            )}
            <div ref={finDelChat} />
          </div>

          <form className="nana-ia__form" onSubmit={manejarEnvio}>
            <label htmlFor="pregunta-nana" className="sr-only">
              Tu pregunta para Nana IA
            </label>
            <input
              id="pregunta-nana"
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              placeholder="Ej: ¿cómo riego mi planta?"
              autoComplete="off"
              maxLength={200}
            />
            <button type="submit" className="boton boton--buscar" disabled={pensando || !texto.trim()}>
              Enviar
            </button>
          </form>
        </section>
      )}

      <button
        className="boton-flotante boton-flotante--nana"
        onClick={() => setAbierta(!abierta)}
        aria-expanded={abierta}
        aria-controls="nana-ia-panel"
        title="Preguntale a Nana IA"
      >
        <Abeja tamano={3} etiqueta="Nana IA" />
        <span className="boton-flotante__etiqueta">Preguntale a Nana IA</span>
      </button>
    </div>
  );
}
