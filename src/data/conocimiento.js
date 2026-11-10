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
    id: 'editar-planta',
    claves: ['editar', 'edito', 'corregir', 'corrijo', 'cambiar titulo', 'cambiar el genero', 'me equivoque', 'modific', 'lapiz'],
    respuesta: 'Podés corregir cualquier planta con el lápiz amarillo de su tarjeta.',
    pasos: [
      'Tocá el lápiz de la tarjeta.',
      'Cambiá el título, el género (cambia la flor), los capítulos vistos o el total.',
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
    claves: ['flores hay', 'que flores', 'cuantas flores', 'tipos de flor', 'herbario', 'catalogo', 'lista de flores'],
    dinamico: 'flores',
  },
  {
    id: 'significado',
    claves: ['significa', 'significado', 'hanakotoba', 'simboliza', 'representa'],
    dinamico: 'significado',
  },
  {
    id: 'mi-jardin',
    claves: ['cuantas plantas', 'mi jardin', 'cuantos mangas', 'estadistica', 'cuantas flores tengo', 'resumen'],
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
    id: 'celular',
    claves: ['celular', 'movil', 'telefono', 'pantalla chica'],
    respuesta: 'Nana funciona en la compu y en el celular: en pantallas chicas todo se acomoda en una columna.',
  },
];

export const SALUDOS = ['hola', 'buenas', 'hey', 'holis', 'buen dia', 'buenas tardes', 'buenas noches'];
export const GRACIAS = ['gracias', 'genial', 'joya', 'buenisimo', 'perfecto', 'genia'];
