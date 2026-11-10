import { MAX_CAPITULOS, MAX_TITULO } from './flores';

// Convierte el texto de un campo numérico en número, o null si está vacío.
function aNumero(valor) {
  return valor === '' || valor === null || valor === undefined ? null : Number(valor);
}

function errorDeCantidad(valor) {
  const numero = aNumero(valor);
  if (numero === null) return null;
  if (!Number.isInteger(numero) || numero < 0) return 'Usá un número entero, sin decimales ni negativos.';
  if (numero > MAX_CAPITULOS) return `Como máximo ${MAX_CAPITULOS}.`;
  return null;
}

// Revisa los datos de una planta antes de guardarla.
// Devuelve un objeto con los errores encontrados (vacío si está todo bien).
// Se usa al plantar y al editar.
export function validarPlanta({ titulo, capitulosTotales, capitulosLeidos }) {
  const errores = {};
  const tituloLimpio = titulo.trim();

  if (tituloLimpio === '') {
    errores.titulo = 'Escribí el nombre del manga o anime.';
  } else if (tituloLimpio.length > MAX_TITULO) {
    errores.titulo = `El título puede tener hasta ${MAX_TITULO} caracteres.`;
  }

  const errorTotales = errorDeCantidad(capitulosTotales);
  if (errorTotales) errores.capitulos = errorTotales;

  if (capitulosLeidos !== undefined) {
    const errorLeidos = errorDeCantidad(capitulosLeidos);
    const leidos = aNumero(capitulosLeidos) ?? 0;
    const totales = aNumero(capitulosTotales) ?? 0;
    if (errorLeidos) {
      errores.leidos = errorLeidos;
    } else if (!errores.capitulos && totales > 0 && leidos > totales) {
      errores.leidos = `No puede superar el total (${totales}).`;
    }
  }

  return errores;
}
