// "Cerebro" de Nana IA: busca en la base de conocimiento el tema que mejor coincide con la pregunta.
// No usa servicios externos: todo se resuelve en el navegador con métodos de arrays.
import { CATALOGO_FLORES, ESTADOS, FLORES } from '../data/flores';
import { GRACIAS, SALUDOS, TEMAS } from '../data/conocimiento';

// Pasa a minúsculas, quita tildes y signos: "¿Cómo PLANTO?" -> " como planto "
export function normalizar(texto) {
  const limpio = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // quita las tildes
    .replace(/[^a-z0-9+ ]/g, ' ') // signos -> espacios
    .replace(/\s+/g, ' ');
  return ` ${limpio.trim()} `;
}

// Una clave coincide si aparece al COMIENZO de una palabra de la pregunta:
// "anonim" coincide con "anonima", pero "api" NO coincide con "capital".
function coincide(pregunta, clave) {
  return pregunta.includes(` ${clave}`);
}

// Puntaje de un tema: suma el largo de cada clave que aparece en la pregunta
// (así "crear club" pesa más que "club" solo).
function puntaje(tema, pregunta) {
  return tema.claves
    .filter((clave) => coincide(pregunta, clave))
    .reduce((total, clave) => total + clave.length, 0);
}

function respuestaFlores() {
  const lista = Object.values(CATALOGO_FLORES).map(
    (flor) => `${flor.nombre}${flor.genero ? ` (${flor.genero})` : ' (avatar)'}`,
  );
  return {
    texto: `En Nana hay ${lista.length} flores. Las 6 primeras florecen en tu jardín según el género; las otras se pueden elegir como avatar:`,
    pasos: lista,
  };
}

function respuestaSignificado(pregunta) {
  // find: busca si la pregunta nombra alguna flor en particular.
  // Se usan las palabras distintivas del nombre y del nombre japonés (no "flor" ni "de").
  const flor = Object.values(CATALOGO_FLORES).find((f) =>
    normalizar(`${f.nombre} ${f.japones}`)
      .trim()
      .split(' ')
      .filter((palabra) => palabra.length > 3 && !['flor', 'violeta', 'inventada'].includes(palabra))
      .some((palabra) => coincide(pregunta, palabra)),
  );
  if (flor) {
    return { texto: `${flor.nombre} (${flor.japones}): ${flor.significado}` };
  }
  return {
    texto: 'Cada flor tiene un significado según el hanakotoba, el lenguaje japonés de las flores:',
    pasos: Object.values(FLORES).map((f) => `${f.nombre} (${f.japones}): ${f.significado}`),
  };
}

function respuestaJardin(plantas) {
  if (!plantas.length) {
    return { texto: 'Tu jardín todavía está vacío. ¿Querés que te explique cómo plantar tu primer manga?' };
  }
  const capitulos = plantas.reduce((total, p) => total + p.capitulosLeidos, 0);
  const porEstado = ESTADOS.map(
    (estado) => `${estado.etiqueta}: ${plantas.filter((p) => p.estado === estado.valor).length}`,
  );
  return {
    texto: `Tenés ${plantas.length} ${plantas.length === 1 ? 'planta' : 'plantas'} y ${capitulos} capítulos/episodios regados en total.`,
    pasos: porEstado,
  };
}

// Devuelve { texto, pasos? } para mostrar en el chat.
export function responder(preguntaOriginal, { plantas = [] } = {}) {
  const pregunta = normalizar(preguntaOriginal);
  if (!pregunta.trim()) return { texto: 'Escribime una pregunta sobre Nana y te ayudo.' };

  // map + sort: calculamos el puntaje de cada tema y nos quedamos con el mejor
  const [mejor] = TEMAS.map((tema) => ({ tema, puntos: puntaje(tema, pregunta) })).sort(
    (a, b) => b.puntos - a.puntos,
  );

  if (mejor.puntos > 0) {
    const { tema } = mejor;
    if (tema.dinamico === 'flores') return respuestaFlores();
    if (tema.dinamico === 'significado') return respuestaSignificado(pregunta);
    if (tema.dinamico === 'jardin') return respuestaJardin(plantas);
    return { texto: tema.respuesta, pasos: tema.pasos };
  }

  if (SALUDOS.some((s) => pregunta.startsWith(` ${s}`))) {
    return { texto: '¡Hola! Soy Nana IA, la abeja jardinera. Preguntame cómo usar tu jardín o la comunidad.' };
  }
  if (GRACIAS.some((g) => coincide(pregunta, g))) {
    return { texto: '¡De nada! Que florezca mucho tu jardín.' };
  }

  return {
    texto:
      'Mmm, eso no lo sé. Solo sé sobre Nana: tu jardín, las flores, los clubes, las misiones y los eventos. Probá con alguna de estas preguntas:',
    sugerir: true,
  };
}
