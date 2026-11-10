// Marco con estética de ventana de computadora retro (barra de título + botones).
// Recibe el contenido como "children": lo que se escribe entre <Ventana> y </Ventana>.
export default function Ventana({ titulo, children, className = '' }) {
  return (
    <section className={`ventana ${className}`}>
      <header className="ventana__barra">
        <h2 className="ventana__titulo">{titulo}</h2>
        <span className="ventana__botones" aria-hidden="true">
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </span>
      </header>
      <div className="ventana__cuerpo">{children}</div>
    </section>
  );
}
