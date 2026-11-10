import { useState } from 'react';
import { ESTADOS, FLORES, avanceDePlanta, etapaDePlanta } from '../data/flores';
import { ICONOS, PALETA_BASE } from '../data/sprites';
import PixelSprite from './PixelSprite';
import SpriteFlor from './SpriteFlor';

// Muestra una planta (un manga/anime) con su dibujo, su avance y sus acciones.
export default function TarjetaPlanta({ planta, ocupada, onActualizar, onEliminar, onEditar }) {
  const [confirmando, setConfirmando] = useState(false);

  const etapa = etapaDePlanta(planta);
  const flor = FLORES[planta.genero];
  const avance = avanceDePlanta(planta);
  const llegoAlFinal =
    planta.capitulosTotales > 0 && planta.capitulosLeidos >= planta.capitulosTotales;
  const palabraCapitulo = planta.tipo === 'anime' ? 'ep.' : 'cap.';

  // Regar suma un capítulo. Además:
  // - si estaba "pendiente", pasa a "leyendo" (empezaste a leerlo)
  // - si llega al último capítulo, florece sola (pasa a "terminado")
  function regar() {
    const leidos = planta.capitulosLeidos + 1;
    const cambios = { capitulosLeidos: leidos };
    let mensaje = `Regaste "${planta.titulo}" (${leidos} ${palabraCapitulo})`;

    if (planta.estado === 'pendiente') cambios.estado = 'leyendo';
    // Una planta marchita (abandonada) revive si la volvés a regar.
    if (planta.estado === 'abandonado') {
      cambios.estado = 'leyendo';
      mensaje = `¡"${planta.titulo}" revivió! (${leidos} ${palabraCapitulo})`;
    }
    if (planta.capitulosTotales > 0 && leidos === planta.capitulosTotales) {
      cambios.estado = 'terminado';
      mensaje = `¡"${planta.titulo}" floreció! Lo terminaste`;
    }
    onActualizar(planta.id, cambios, mensaje);
  }

  // Si se marca "Terminado" y faltaban capítulos, se completan automáticamente.
  function cambiarEstado(evento) {
    const nuevo = ESTADOS.find((estado) => estado.valor === evento.target.value);
    const cambios = { estado: nuevo.valor };
    if (nuevo.valor === 'terminado' && planta.capitulosTotales > planta.capitulosLeidos) {
      cambios.capitulosLeidos = planta.capitulosTotales;
    }
    onActualizar(planta.id, cambios, `"${planta.titulo}": ${nuevo.etiqueta}`);
  }

  return (
    <li className={`tarjeta tarjeta--${etapa.clave}`} aria-busy={ocupada}>
      <div className="tarjeta__barra">
        <span>{flor.nombre}</span>
        <span className="tarjeta__etapa">{etapa.texto}</span>
      </div>

      <div className="tarjeta__maceta">
        <SpriteFlor
          clave={planta.genero}
          etapa={etapa.clave}
          tamano={6}
          etiqueta={`${flor.nombre} en etapa ${etapa.texto}`}
        />
      </div>

      <div className="tarjeta__info">
        <div className="tarjeta__cabecera">
          {planta.portada && (
            <img src={planta.portada} alt={`Portada de ${planta.titulo}`} className="tarjeta__portada" loading="lazy" />
          )}
          <div>
            <h3 className="tarjeta__titulo" title={planta.titulo}>
              {planta.titulo}
            </h3>
            <p className="tarjeta__tipo">{planta.tipo === 'anime' ? 'Anime' : 'Manga'}</p>
          </div>
        </div>

        <p className="tarjeta__capitulos">
          {planta.capitulosLeidos}
          {planta.capitulosTotales > 0 && ` / ${planta.capitulosTotales}`} {palabraCapitulo}
        </p>
        {avance !== null && (
          <div
            className="progreso"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(avance * 100)}
            aria-label="Avance de lectura"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={i < Math.round(avance * 10) ? 'lleno' : ''} />
            ))}
          </div>
        )}

        <label className="tarjeta__estado">
          <span className="sr-only">Estado</span>
          <select value={planta.estado} onChange={cambiarEstado} disabled={ocupada}>
            {ESTADOS.map((estado) => (
              <option key={estado.valor} value={estado.valor}>
                {estado.etiqueta}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Las acciones van siempre al final de la tarjeta, en un lugar fijo */}
      <div className={`tarjeta__acciones ${confirmando ? 'tarjeta__acciones--confirmar' : ''}`}>
        {confirmando ? (
          <>
            <p className="tarjeta__pregunta">¿Compostar esta planta?</p>
            <button
              className="boton boton--peligro"
              onClick={() => onEliminar(planta.id, planta.titulo)}
              disabled={ocupada}
            >
              Sí
            </button>
            <button className="boton" onClick={() => setConfirmando(false)}>
              No
            </button>
          </>
        ) : (
          <>
            <button
              className="boton boton--agua"
              onClick={regar}
              disabled={ocupada || llegoAlFinal}
              title={llegoAlFinal ? 'Ya llegaste al último capítulo' : 'Sumar un capítulo'}
            >
              <PixelSprite filas={ICONOS.gota} paleta={PALETA_BASE} tamano={2} />
              {llegoAlFinal ? 'Completo' : 'Regar +1'}
            </button>
            <button
              className="boton boton--icono boton--editar"
              onClick={() => onEditar(planta)}
              disabled={ocupada}
              aria-label={`Editar ${planta.titulo}`}
              title="Editar"
            >
              <PixelSprite filas={ICONOS.lapiz} paleta={PALETA_BASE} tamano={2} />
            </button>
            <button
              className="boton boton--icono"
              onClick={() => setConfirmando(true)}
              disabled={ocupada}
              aria-label={`Compostar ${planta.titulo}`}
              title="Compostar (eliminar)"
            >
              <PixelSprite filas={ICONOS.compost} paleta={PALETA_BASE} tamano={2} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
