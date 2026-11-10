import TarjetaPlanta from './TarjetaPlanta';

// Recorre el array de plantas con map y arma una tarjeta por cada una.
export default function ListaJardin({ plantas, onActualizar, onEliminar }) {
  if (plantas.length === 0) {
    return <p>Tu jardín está vacío. ¡Plantá tu primer manga o anime!</p>;
  }

  return (
    <ul className="jardin">
      {plantas.map((planta) => (
        <TarjetaPlanta
          key={planta.id}
          planta={planta}
          onActualizar={onActualizar}
          onEliminar={onEliminar}
        />
      ))}
    </ul>
  );
}
