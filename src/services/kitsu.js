// Búsqueda de mangas y animes reales en la API pública de Kitsu (https://kitsu.io).
// Es gratuita y no necesita clave. Se consulta con fetch, como en la guía "Consultas a APIs".
// Documentación: https://kitsu.docs.apiary.io/

const BASE = 'https://kitsu.io/api/edge';

// Qué categorías de Kitsu corresponden a cada género de nuestro jardín.
// El orden importa: se elige el PRIMER género que coincida.
const EQUIVALENCIAS = [
  ['romance', ['Romance']],
  ['fantasia', ['Fantasy', 'Magic', 'Isekai']],
  ['accion', ['Action', 'Adventure', 'Martial Arts', 'Sports', 'Mecha']],
  ['misterio', ['Mystery', 'Thriller', 'Horror', 'Psychological', 'Detective']],
  ['comedia', ['Comedy', 'Slice of Life', 'Parody']],
  ['drama', ['Drama', 'Tragedy']],
];

// find: busca la primera equivalencia que tenga alguna categoría de la obra.
export function generoSugerido(categorias) {
  const encontrada = EQUIVALENCIAS.find(([, nombres]) =>
    nombres.some((nombre) => categorias.includes(nombre)),
  );
  return encontrada ? encontrada[0] : 'drama';
}

// Busca obras por texto. tipo es 'manga' o 'anime'.
export async function buscarObras(texto, tipo) {
  const parametros = new URLSearchParams({
    'filter[text]': texto,
    'page[limit]': '6',
    include: 'categories', // pedimos también las categorías (géneros)
    'fields[categories]': 'title',
  });

  const respuesta = await fetch(`${BASE}/${tipo}?${parametros}`);

  // fetch no falla solo con un 404 o un 500: hay que revisar respuesta.ok
  if (!respuesta.ok) {
    throw new Error(respuesta.status === 429 ? 'LIMITE' : `HTTP ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  // Kitsu manda las categorías aparte, en "included". Armamos un diccionario id -> nombre.
  const categoriasPorId = {};
  (datos.included ?? []).forEach((categoria) => {
    categoriasPorId[categoria.id] = categoria.attributes.title;
  });

  // map: transformamos cada resultado de Kitsu en un objeto simple para nuestra app.
  return datos.data.map((obra) => {
    const a = obra.attributes;
    const categorias = (obra.relationships?.categories?.data ?? [])
      .map((ref) => categoriasPorId[ref.id])
      .filter(Boolean); // filter: descarta las que no encontramos

    return {
      kitsuId: obra.id,
      titulo: a.canonicalTitle,
      capitulos: (tipo === 'anime' ? a.episodeCount : a.chapterCount) ?? null,
      anio: a.startDate ? a.startDate.slice(0, 4) : '',
      portada: a.posterImage?.small ?? '',
      categorias,
      genero: generoSugerido(categorias),
    };
  });
}
