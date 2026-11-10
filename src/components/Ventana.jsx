import Adorno from './Adorno';

// Marco con estética de ventana de computadora retro (barra de título + botones).
// Recibe el contenido como "children": lo que se escribe entre <Ventana> y </Ventana>.
// adorno (opcional): "izq" o "der" agrega una enredadera con flores en esa esquina.
export default function Ventana({ titulo, children, className = '', adorno }) {
  return (
    <section className={`ventana ${className}`}>
      {adorno && <Adorno tipo="enredadera" posicion={`arriba-${adorno}`} />}
      <header className="ventana__barra">
        <h2 className="ventana__titulo">{titulo}</h2>
        <span className="ventana__botones" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </header>
      <div className="ventana__cuerpo">{children}</div>
    </section>
  );
}
