import { ICONOS, PALETA_BASE } from '../data/sprites';
import PixelSprite from './PixelSprite';
import TarjetaPlanta from './TarjetaPlanta';

// Recorre el array de plantas con map y arma una tarjeta por cada una.
export default function ListaJardin({ plantas, idOcupada, onActualizar, onEliminar }) {
  if (plantas.length === 0) {
    return (
      <div className="vacio">
        <PixelSprite filas={ICONOS.semilla} paleta={PALETA_BASE} tamano={6} />
        <p>Tu jardín está vacío.</p>
        <p>Plantá tu primer manga o anime con el formulario.</p>
      </div>
    );
  }

  return (
    <ul className="jardin">
      {plantas.map((planta) => (
        <TarjetaPlanta
          key={planta.id}
          planta={planta}
          ocupada={idOcupada === planta.id}
          onActualizar={onActualizar}
          onEliminar={onEliminar}
        />
      ))}
    </ul>
  );
}
