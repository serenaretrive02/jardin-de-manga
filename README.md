# 🌸 Jardín de Manga

Aplicación web donde cada manga o anime que seguís se convierte en una **flor de tu jardín**.
La flor depende del género y crece a medida que avanzás capítulos: semilla → brote → creciendo → en flor.
Si lo abandonás, se marchita.

Trabajo Práctico 2 · Desarrollo Frontend II · UADE · Prof. Joaquín Cerviño.

- **App publicada (Vercel):** _pendiente_
- **Bitácora del proceso:** [docs/bitacora.md](docs/bitacora.md)
- **Informe:** [docs/informe.md](docs/informe.md)

## Tecnologías

| Herramienta | Para qué se usa |
|---|---|
| React + Vite | Interfaz con componentes, estado y eventos |
| Firebase Authentication (anónimo) | Identifica a cada visitante sin pedir registro |
| Cloud Firestore | Guarda los datos (persisten al recargar) |
| GitHub | Repositorio del código |
| Vercel | Publicación de la app en una URL |

## Cómo ejecutar el proyecto en tu computadora

Requisitos: tener instalado [Node.js](https://nodejs.org/) (incluye npm) y Visual Studio Code.

```bash
git clone <url-del-repositorio>
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
├── App.jsx                   Componente principal: sesión, estados y operaciones
├── firebase.js               Conexión con Firebase (lee el .env)
├── services/plantas.js       Consultar, agregar, modificar y eliminar en Firestore
├── data/flores.js            Géneros, flores, estados y etapas de crecimiento
└── components/
    ├── FormularioPlanta.jsx  Formulario para plantar un manga/anime
    ├── ListaJardin.jsx       Lista de plantas (usa map)
    └── TarjetaPlanta.jsx     Tarjeta de cada planta con sus acciones
firestore.rules               Reglas de seguridad de la base de datos
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

## Versiones

| Versión | Contenido |
|---|---|
| v0.1 | MVP funcional: agregar, listar, cambiar estado, sumar capítulos y eliminar con Firestore |
