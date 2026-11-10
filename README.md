# 🌸 Nana · tu jardín de manga

Aplicación web donde cada manga o anime que seguís se convierte en una **flor de tu jardín**, y donde podés armar **clubes de lectura** con tus amigas: la administradora reparte misiones y todas organizan eventos.
La flor depende del género y crece a medida que avanzás capítulos: semilla → brote → creciendo → en flor.
Si lo abandonás, se marchita.

Trabajo Práctico 2 · Desarrollo Frontend II · UADE · Prof. Joaquín Cerviño.

- **App publicada (Vercel):** https://jardin-de-manga.vercel.app
- **Repositorio (GitHub):** https://github.com/serenaretrive02/jardin-de-manga
- **Bitácora del proceso:** [docs/bitacora.md](docs/bitacora.md)
- **Informe:** [docs/informe.md](docs/informe.md)
- **Especificación (requisitos, casos de uso, sprints):** [docs/especificacion.md](docs/especificacion.md)
- **Resumen de la entrega:** [docs/entrega.md](docs/entrega.md)

## Tecnologías

| Herramienta | Para qué se usa |
|---|---|
| React + Vite | Interfaz con componentes, estado y eventos |
| Firebase Authentication (anónimo) | Identifica a cada visitante sin pedir registro |
| Cloud Firestore | Guarda los datos (persisten al recargar) |
| GitHub | Repositorio del código |
| Vercel | Publicación de la app en una URL |
| API de Kitsu | Búsqueda de mangas y animes reales (gratis, sin clave) |

## Cómo ejecutar el proyecto en tu computadora

Requisitos: tener instalado [Node.js](https://nodejs.org/) (incluye npm) y Visual Studio Code.

```bash
git clone https://github.com/serenaretrive02/jardin-de-manga.git
cd jardin-de-manga
npm install
```

### Configurar Firebase

1. En [Firebase Console](https://console.firebase.google.com/) crear un proyecto y registrar una **app web** (`</>`).
2. En **Authentication → Método de acceso**, habilitar **Anónimo**.
3. Crear una base **Cloud Firestore** (edición Standard, id `(default)`, región `southamerica-east1`, modo producción).
4. En **Firestore → Reglas**, pegar el contenido de [`firestore.rules`](firestore.rules) y publicar.
5. Copiar `.env.example` como `.env` (en la misma carpeta que `package.json`) y completar los valores del objeto `firebaseConfig`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

> El archivo `.env` **no se sube a GitHub** (está en `.gitignore`).

### Correr la app

```bash
npm run dev
```

Abrir `http://localhost:5173/`. Si se cambia el `.env`, reiniciar el comando.

## Publicar en Vercel

1. Importar el repositorio de GitHub en [Vercel](https://vercel.com/).
2. Framework: **Vite** · Build: `npm run build` · Output: `dist`.
3. En **Settings → Environment Variables** cargar las 4 variables `VITE_FIREBASE_*` (entorno Production).
4. Desplegar. Si se cambian variables después, hacer **Redeploy**.

## Estructura del código

```
src/
├── main.jsx                  Punto de entrada: monta <App />
├── App.jsx                   Sesión anónima, pestañas (Mi jardín / Comunidad) y jardín
├── App.css / Comunidad.css   Estilos pixel art y diseño adaptable
├── index.css                 Colores, tipografías y estilos generales
├── firebase.js               Conexión con Firebase (lee el .env)
├── services/
│   ├── plantas.js            CRUD del jardín privado
│   ├── kitsu.js              Búsqueda en la API de Kitsu con fetch
│   ├── perfiles.js           Perfil público (apodo y flor)
│   ├── clubes.js             CRUD de clubes, unirse, salir, quitar miembros
│   ├── misiones.js           CRUD de misiones (tareas)
│   ├── eventos.js            CRUD de eventos y asistencia
│   └── compartir.js          Compartir (menú del celular o portapapeles)
├── data/
│   ├── flores.js             Géneros, flores, estados y etapas
│   ├── sprites.js            Dibujos pixel art como arrays de texto
│   ├── validaciones.js       Validaciones del jardín
│   └── comunidad.js          Tipos de misión y evento, validaciones de la comunidad
└── components/
    ├── FormularioPlanta.jsx, BuscadorObras.jsx, ListaJardin.jsx, TarjetaPlanta.jsx, EditarPlanta.jsx
    ├── PixelSprite.jsx, Ventana.jsx, Modal.jsx, Aviso.jsx, BarraCarga.jsx
    └── comunidad/
        ├── Comunidad.jsx       Coordina perfil, clubes, misiones y eventos
        ├── DetalleClub.jsx     Club: código, miembros, pestañas
        ├── TableroMisiones.jsx Tablero Kanban de misiones
        ├── ListaEventos.jsx    Próximos y pasados
        ├── FormPerfil.jsx, FormClub.jsx, FormMision.jsx, FormEvento.jsx
        └── Avatar.jsx, BotonEliminar.jsx, IconoEditar.jsx
firestore.rules               Reglas de seguridad (jardín privado + roles de la comunidad)
docs/                         Bitácora, informe, especificación, entrega, capturas y referencias
```

## Datos guardados en Firestore

Ruta: `users/{uid}/plantas/{plantaId}`

| Campo | Ejemplo | Significado |
|---|---|---|
| `titulo` | "Frieren" | Nombre del manga o anime |
| `tipo` | "manga" / "anime" | Formato |
| `genero` | "fantasia" | Define qué flor es |
| `capitulosLeidos` | 12 | Avance |
| `capitulosTotales` | 28 | Total (0 = desconocido) |
| `estado` | "leyendo" | pendiente, leyendo, terminado, abandonado |
| `creadoEn` | fecha | Cuándo se plantó |
| `portada` | "https://media.kitsu.app/…" | Tapa de la obra (opcional, de Kitsu) |
| `kitsuId` | "45398" | Número de la obra en Kitsu (opcional) |

**Comunidad (v0.4):**

| Ruta | Campos | Quién lo ve / lo cambia |
|---|---|---|
| `users/{uid}` | `apodo`, `flor` | Lo ve cualquiera identificada. Lo cambia solo su dueña |
| `clubes/{CÓDIGO}` | `nombre`, `descripcion`, `adminUid`, `miembros[]` | Solo sus miembros. Edita la administradora. Cada una puede unirse o salir sola |
| `clubes/{CÓDIGO}/misiones/{id}` | `titulo`, `tipo`, `descripcion`, `asignadaA`, `estado`, `fechaLimite` | Miembros. **Crea, asigna, edita y borra solo la administradora.** La asignada cambia el `estado` |
| `clubes/{CÓDIGO}/eventos/{id}` | `titulo`, `tipo`, `fecha`, `lugar`, `descripcion`, `asistentes[]` | Miembros. Crea cualquiera. Editan quien lo creó o la administradora |

## Versiones

| Versión | Contenido |
|---|---|
| v0.1 | MVP funcional: agregar, listar, cambiar estado, sumar capítulos y eliminar con Firestore |
| v0.2 | Identidad pixel art (flores dibujadas con código, ventanas retro), validaciones, avisos, confirmación de borrado, diseño para celular |
| v0.3 | Nombre **Nana**, búsqueda en la API de Kitsu (portadas y datos automáticos), edición de plantas, estados coherentes con los capítulos, reglas más estrictas |
| v0.4 | **Comunidad**: perfiles, CRUD de clubes, misiones de 6 tipos con rol de administradora (tablero Kanban), CRUD de eventos, compartir, invitación por enlace |
