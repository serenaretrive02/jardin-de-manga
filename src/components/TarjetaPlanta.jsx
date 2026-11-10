import { ESTADOS, FLORES, etapaDePlanta } from '../data/flores';

// Muestra una planta (un manga/anime) y sus acciones.
export default function TarjetaPlanta({ planta, onActualizar, onEliminar }) {
  const etapa = etapaDePlanta(planta);
  const flor = FLORES[planta.genero];

  return (
    <li className="tarjeta">
      <p className="planta">{etapa.emoji}</p>
      <h3>{planta.titulo}</h3>
      <p>
        {planta.tipo} · {flor.nombre} · {etapa.texto}
      </p>
      <p>
        Capítulos: {planta.capitulosLeidos}
        {planta.capitulosTotales > 0 && ` / ${planta.capitulosTotales}`}
      </p>

      <select
        value={planta.estado}
        onChange={(evento) => onActualizar(planta.id, { estado: evento.target.value })}
      >
        {ESTADOS.map((estado) => (
          <option key={estado.valor} value={estado.valor}>
            {estado.etiqueta}
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          onActualizar(planta.id, { capitulosLeidos: planta.capitulosLeidos + 1 })
        }
      >
        +1 capítulo
      </button>

      <button onClick={() => onEliminar(planta.id)}>Eliminar</button>
    </li>
  );
}
