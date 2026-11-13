// Base de conocimiento de Nana IA.
// Nana IA solo responde sobre ESTA app. Cada tema tiene:
// - claves: palabras o frases que, si aparecen en la pregunta, indican ese tema
// - respuesta: explicación corta
// - pasos (opcional): instrucciones paso a paso
// Las claves se escriben en minúscula y sin tildes (la pregunta se normaliza igual).
// Una clave coincide con el COMIENZO de una palabra: "plant" sirve para planto, plantar, plantás...

export const SUGERENCIAS = [
  '¿Cómo planto un manga?',
  '¿Cómo crece mi flor?',
  '¿Qué flores hay?',
  '¿Cómo creo un club?',
  '¿Quién asigna las misiones?',
  '¿Cómo filtro mi jardín?',
  '¿Cómo puntúo un manga?',
  '¿Dónde veo lo que leí?',
  '¿Qué es el herbario?',
  '¿Cómo cierro sesión?',
];

export const TEMAS = [
  {
    id: 'que-es',
    claves: ['que es nana', 'para que sirve', 'que hace esta app', 'que es esto', 'de que se trata', 'como funciona la app'],
    respuesta:
      'Nana es tu jardín de manga: cada manga o anime que seguís es una flor que crece mientras avanzás capítulos. Además tiene una Comunidad para armar clubes de lectura con tus amigas.',
  },
  {
    id: 'plantar',
    claves: ['plantar', 'planto', 'como plant', 'agreg', 'sumar un manga', 'sumar un anime', 'nuevo manga', 'nuevo anime', 'anot', 'cargar un manga', 'cargo un manga'],
    respuesta: 'Plantar es agregar un manga o anime a tu jardín.',
    pasos: [
      'Andá a la pestaña "Mi jardín".',
      'En la ventana plantar.exe elegí Manga o Anime.',
      'Buscá el nombre y tocá Buscar, o completalo a mano.',
      'Revisá el título, los capítulos y el género (define la flor).',
      'Tocá PLANTAR. ¡Aparece como semilla!',
    ],
  },
  {
    id: 'buscar',
    claves: ['buscar', 'busqueda', 'api', 'kitsu', 'portada', 'tapa', 'no encuentro'],
    respuesta:
      'El buscador consulta Kitsu, una base de datos pública de anime y manga. Trae el título, la cantidad de capítulos, la portada y te sugiere la flor según el género. Si no encontrás la obra o la búsqueda falla, podés completar todo a mano.',
  },
  {
    id: 'regar',
    claves: ['regar', 'riego', 'rieg', 'sumar capitulo', 'sumo un capitulo', 'avanz', 'capitulo leido', '+1', 'progreso'],
    respuesta: 'Regar suma un capítulo (o episodio) leído y hace crecer tu planta.',
    pasos: [
      'Buscá la tarjeta en tu jardín.',
      'Tocá "Regar +1" cada vez que leas un capítulo.',
      'La primera vez pasa a "Leyendo"; en el último capítulo florece sola.',
    ],
  },
  {
    id: 'crecer',
    claves: ['crece', 'crecer', 'etapa', 'semilla', 'brote', 'creciendo', 'como se ve', 'leyenda', 'dibujo', 'florec'],
    respuesta:
      'Tu planta pasa por 4 etapas: semilla (0 capítulos) → brote (menos de la mitad) → creciendo (más de la mitad) → en flor (terminado). La forma de la flor depende del género. También podés ver la leyenda con el botón "?" de abajo a la izquierda.',
  },
  {
    id: 'marchita',
    claves: ['marchit', 'abandon', 'muere', 'murio', 'seca', 'reviv'],
    respuesta:
      'Si marcás un manga como "Abandonado", su planta se marchita. No pasa nada grave: si la volvés a regar, revive y pasa a "Leyendo".',
  },
  {
    id: 'estados',
    claves: ['estado', 'pendiente', 'leyendo', 'terminado', 'terminar', 'complet'],
    respuesta:
      'Hay 4 estados: Pendiente, Leyendo/Viendo, Terminado (florece y completa los capítulos) y Abandonado (se marchita). Se cambian desde el menú de cada tarjeta.',
  },
  {
    id: 'puntuar',
    claves: ['puntu', 'calific', 'resena', 'opinion', 'estrella', 'sakura', 'letterboxd', 'que me parecio', 'nota del', 'review', 'votar'],
    respuesta:
      'Cuando una historia termina para vos (la terminaste o la abandonaste), su tarjeta muestra 5 sakuras para puntuarla, como en Letterboxd. Tu promedio aparece en "Mi ramo".',
    pasos: [
      'Marcá el manga como Terminado (o Abandonado).',
      'En su tarjeta, tocá de 1 a 5 sakuras. Tocá la misma otra vez para quitar la puntuación.',
      'Para escribir una reseña corta (hasta 280 caracteres), abrí el lápiz y completá "Tu reseña".',
      'Con el orden "Mejor puntuadas" ves arriba tus favoritas.',
      'Todas tus puntuaciones quedan guardadas en la pestaña "Diario".',
    ],
  },
  {
    id: 'diario',
    claves: ['diario', 'visto', 'lo que lei', 'que lei', 'mis leid', 'leidos', 'historial', 'puntuados', 'mis lecturas', 'lecturas', 'mis resenas', 'donde veo mis'],
    respuesta:
      'El Diario es la segunda pestaña, como tu perfil de Letterboxd: ahí queda todo lo que terminaste o abandonaste, agrupado por mes, con la fecha, tus sakuras y tu reseña. Arriba ves cuántas leíste, tu promedio y un gráfico con tus puntuaciones.',
    pasos: [
      'Cuando una planta florece (o la abandonás), se anota sola en el Diario con la fecha de hoy.',
      'Tocá una sakura para puntuarla, o "Escribir reseña" para contar qué te pareció y corregir la fecha.',
      'Filtrá por terminadas, abandonadas, con reseña o sin puntuar, y ordená por fecha, puntuación o título.',
      '"Borrar reseña" quita las sakuras y el texto, pero la lectura sigue en tu diario.',
    ],
  },
  {
    id: 'quiero-leer',
    claves: ['quiero leer', 'quiero ver', 'para despues', 'lista de deseos', 'wishlist', 'pendientes', 'por leer', 'anotar para'],
    respuesta:
      'Para anotar un manga que querés leer más adelante, plantalo y dejalo en "Pendiente": queda como semilla. Con el filtro "Pendiente" ves tu lista de "quiero leer".',
  },
  {
    id: 'editar-planta',
    claves: ['editar', 'edito', 'corregir', 'corrijo', 'cambiar titulo', 'cambiar el genero', 'me equivoque', 'modific', 'lapiz'],
    respuesta: 'Podés corregir cualquier planta con el lápiz amarillo de su tarjeta.',
    pasos: [
      'Tocá el lápiz de la tarjeta.',
      'Cambiá el título, el género (cambia la flor), los capítulos vistos o el total. Si ya la terminaste, también tu puntuación y tu reseña.',
      'Tocá Guardar. Si ponés más capítulos vistos que el total, te avisa.',
    ],
  },
  {
    id: 'eliminar-planta',
    claves: ['elimin', 'borr', 'compost', 'sacar', 'saco', 'quitar planta', 'tacho'],
    respuesta: 'Para sacar una planta del jardín se "composta".',
    pasos: [
      'Tocá el tachito rosa de la tarjeta.',
      'Confirmá con "Sí". Se borra de verdad de la base de datos.',
    ],
  },
  {
    id: 'guardado',
    claves: ['se guarda', 'guardan', 'recargo', 'recargar', 'pierdo', 'perder', 'datos', 'firebase', 'base de datos', 'nube'],
    respuesta:
      'Todo se guarda en la nube (Firebase / Cloud Firestore), no en tu navegador. Si recargás la página, tu jardín sigue igual. Tu jardín es privado: solo lo ves vos.',
  },
  {
    id: 'anonimo',
    claves: ['anonim', 'cuenta', 'registr', 'usuario', 'contrasena', 'login', 'otro celular', 'otro dispositivo', 'otra compu'],
    respuesta:
      'Nana no te pide usuario ni contraseña: te reconoce de forma anónima en este navegador. Por eso, si abrís la app en otro dispositivo, vas a ver un jardín distinto.',
  },
  {
    id: 'cerrar-sesion',
    claves: ['cerrar sesion', 'cierro sesion', 'cierro la sesion', 'sesion', 'salir de la cuenta', 'deslogu', 'empezar de cero', 'otro perfil', 'cambiar de usuario', 'logout'],
    respuesta:
      'Abajo de todo está "Cerrar sesión". Ojo: como el acceso es anónimo, al cerrar sesión empezás con un jardín nuevo y vacío, y no vas a poder volver al anterior.',
    pasos: ['Bajá hasta el pie de la página.', 'Tocá "Cerrar sesión".', 'Leé el aviso y confirmá.'],
  },
  {
    id: 'perfil',
    claves: ['perfil', 'apodo', 'nombre', 'avatar', 'mi flor', 'eliminar perfil', 'borrar perfil'],
    respuesta: 'Tu perfil es tu apodo y tu flor-avatar: es lo que ven los demás en tus clubes.',
    pasos: [
      'Entrá a la pestaña Comunidad (la primera vez te pide crearlo).',
      'En perfil.exe, el lápiz sirve para editarlo.',
      'El tachito elimina tu perfil y te vuelve a mostrar la bienvenida.',
    ],
  },
  {
    id: 'flores',
    claves: ['flores hay', 'que flores', 'cuantas flores hay', 'tipos de flor', 'lista de flores'],
    dinamico: 'flores',
  },
  {
    id: 'significado',
    claves: ['significa', 'significado', 'hanakotoba', 'simboliza', 'representa'],
    dinamico: 'significado',
  },
  {
    id: 'mi-jardin',
    claves: ['cuantas plantas', 'cuantos mangas', 'cuantos animes', 'estadistica', 'cuantas flores tengo', 'resumen de mi jardin', 'como va mi jardin'],
    dinamico: 'jardin',
  },
  {
    id: 'comunidad',
    claves: ['comunidad', 'amig', 'grupo', 'social', 'leer con'],
    respuesta:
      'En la pestaña Comunidad armás clubes de lectura: la creadora es la administradora y reparte misiones, y cualquier miembro puede proponer eventos.',
  },
  {
    id: 'crear-club',
    claves: ['crear club', 'crear un club', 'nuevo club', 'armar un club', 'hacer un club'],
    respuesta: 'Al crear un club quedás como administradora.',
    pasos: [
      'Entrá a Comunidad.',
      'Tocá "+ CREAR CLUB".',
      'Poné un nombre (y una descripción si querés) y tocá "Crear club".',
      'Compartí el código de 6 letras con el botón "Invitar".',
    ],
  },
  {
    id: 'unirse',
    claves: ['unir', 'codigo', 'invitacion', 'entrar a un club', 'sumarme'],
    respuesta: 'Para entrar a un club necesitás su código de 6 letras (o el enlace de invitación).',
    pasos: [
      'Entrá a Comunidad.',
      'En "¿Te pasaron un código?" escribilo.',
      'Tocá "Unirme". Si abriste un enlace de invitación, el código ya está escrito.',
    ],
  },
  {
    id: 'compartir',
    claves: ['compartir', 'invitar', 'mandar', 'enviar', 'whatsapp', 'link', 'enlace'],
    respuesta:
      'Los botones "Invitar ↗" y "↗" comparten el club, una misión o un evento. En el celular se abre el menú de compartir; en la compu se copia el texto para que lo pegues donde quieras.',
  },
  {
    id: 'admin',
    claves: ['administrador', 'admin', 'rol', 'quien asigna', 'asignar', 'permiso', 'puedo crear mision', 'no puedo'],
    respuesta:
      'La administradora es quien creó el club, y es el único rol que puede crear, asignar, editar y borrar misiones, editar el club y quitar miembros. Los demás miembros mueven sus propias misiones y pueden crear eventos.',
  },
  {
    id: 'misiones',
    claves: ['mision', 'tarea', 'reto', 'desafio', 'kanban', 'tablero'],
    respuesta:
      'Las misiones son las tareas del club. Hay 6 tipos: leer capítulos, ver episodios, escribir reseña, hacer fan art, teoría/debate y recomendar una obra. Se ven en un tablero con 3 columnas: Por hacer, Haciendo y Hecha.',
    pasos: [
      'La administradora toca "+ NUEVA MISIÓN", elige el tipo y a quién asignarla.',
      'Quien la recibe la ve con borde rosa y toca "Empezar ▶" y después "Terminar ▶".',
      'Con "Solo mis misiones" ves únicamente las tuyas.',
    ],
  },
  {
    id: 'eventos',
    claves: ['evento', 'watch party', 'juntada', 'lectura conjunta', 'debate', 'intercambio', 'anotarme', 'voy'],
    respuesta: 'Cualquier miembro puede proponer un evento del club.',
    pasos: [
      'Abrí el club y la pestaña "Eventos".',
      'Tocá "+ NUEVO EVENTO", completá nombre, tipo, fecha y lugar.',
      'Los demás tocan "¡Voy!" para anotarse. Quien lo creó (o la administradora) lo puede editar o borrar.',
    ],
  },
  {
    id: 'salir-club',
    claves: ['salir del club', 'irme del club', 'dejar el club', 'eliminar club', 'borrar club', 'quitar miembro', 'echar'],
    respuesta:
      'Un miembro puede "Salir del club". La administradora no sale: puede quitar miembros con la ✕ o "Eliminar club", que borra también sus misiones y eventos.',
  },
  {
    id: 'abeja',
    claves: ['abeja', 'quien sos', 'nana ia', 'como te llamas', 'sos una ia', 'inteligencia'],
    respuesta:
      '¡Soy Nana IA, la abeja jardinera! Respondo preguntas sobre esta app usando una base de conocimiento propia. No me conecto a servicios externos, así no hace falta guardar claves secretas en el navegador.',
  },
  {
    id: 'filtros',
    claves: ['filtr', 'ordenar', 'orden', 'buscar en mi jardin', 'encontrar', 'solo los terminados', 'solo anime', 'solo manga'],
    respuesta: 'Arriba de tu jardín hay filtros para encontrar rápido lo que buscás.',
    pasos: [
      'Escribí parte del título en "Buscar en mi jardín...".',
      'Tocá un estado (Todas, Pendiente, Leyendo, Terminado, Abandonado): cada uno muestra cuántas hay.',
      'Elegí un género, manga o anime, y cómo ordenar (recientes, A-Z, más avanzadas, más regadas o mejor puntuadas).',
      'Con "Limpiar filtros" volvés a ver todo.',
    ],
  },
  {
    id: 'herbario',
    claves: ['herbario', 'catalogo', 'coleccion', 'todas las flores', 'conseguir una flor', 'como consigo'],
    respuesta:
      'El Herbario es la cuarta pestaña: muestra las 9 flores de Nana con su dibujo, su nombre en japonés, su significado, con qué género florecen y cuántas tenés en tu jardín.',
  },
  {
    id: 'ramo',
    claves: ['ramo', 'mi ramo', 'genero favorito', 'favorito'],
    respuesta:
      '"Mi ramo" está arriba de tu jardín: cada manga que terminás suma su flor al ramo. También muestra cuántas plantas tenés, cuántas están en flor, cuántos capítulos regaste, tu género favorito y el promedio de tus puntuaciones.',
  },
  {
    id: 'sonido',
    claves: ['sonido', 'musica', 'cancion', 'melodia', 'silencio', 'mute', 'mutear', 'ruido', 'volumen', 'apagar el sonido'],
    respuesta:
      'Nana tiene una canción de fondo tipo cajita musical (es original, compuesta para la app) y sonidos estilo consola retro al plantar, regar, florecer o compostar. La música empieza cuando tocás la página. Para apagar todo o prenderlo, tocá el botón del parlante arriba a la derecha.',
  },
  {
    id: 'gatito',
    claves: ['gato', 'gatito', 'michi', 'miau'],
    respuesta: 'Abajo de todo, sobre el pasto, duerme un gatito pixelado. Si lo tocás, maúlla y te regala un corazón.',
  },
  {
    id: 'celular',
    claves: ['celular', 'movil', 'telefono', 'pantalla chica'],
    respuesta: 'Nana funciona en la compu y en el celular: en pantallas chicas todo se acomoda en una columna.',
  },
];

export const SALUDOS = ['hola', 'buenas', 'hey', 'holis', 'buen dia', 'buenas tardes', 'buenas noches'];
export const GRACIAS = ['gracias', 'genial', 'joya', 'buenisimo', 'perfecto', 'genia'];
