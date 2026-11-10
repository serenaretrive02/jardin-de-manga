// Indicador de carga con estética de videojuego: una barra que se llena por bloques.
export default function BarraCarga({ texto = 'Cargando...' }) {
  return (
    <div className="carga" role="status">
      <p className="carga__texto">{texto}</p>
      <div className="carga__barra" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="carga__bloque" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  );
}
