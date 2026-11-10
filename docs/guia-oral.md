# Guía para el oral — dónde está cada tema en Nana

El final consiste en **defender este proyecto** y en un **repaso conceptual oral**. Esta guía relaciona cada tema de la materia con un lugar concreto del código, para poder mostrarlo y explicarlo con palabras propias.

## 1. Temas de la materia → dónde se ven en Nana

| Tema (consigna del final) | Dónde mostrarlo | Qué decir |
|---|---|---|
| **Estructura HTML** y clases | `index.html`, clases como `.tarjeta`, `.ventana` | `index.html` tiene un solo `<div id="root">`, y React dibuja todo adentro |
| **CSS: modelo de caja, Flexbox, Grid, diseño adaptable** | `src/App.css` (`.contenido`, `.jardin`, `@media`) | Grid para las columnas, Flexbox dentro de las tarjetas, `@media` para el celular. `minmax(0, 1fr)` evitó que el formulario se saliera de la pantalla |
| **Variables, condicionales, funciones** | `src/data/flores.js` → `etapaDePlanta()` | Con `if` decide si la planta es semilla, brote, creciendo, flor o marchita |
| **Arrays y objetos: `map`, `filter`, `find`, `forEach`** | `PixelSprite.jsx` (`map` de filas y letras), `JardinFiltrado.jsx` (`filter` + `sort`), `services/kitsu.js` (`forEach`, `map`, `filter`, `find`) | Las flores son arrays de texto que `map` convierte en píxeles. Los filtros encadenan varios `filter` |
| **DOM y eventos** | `onClick`, `onChange`, `onSubmit` en los formularios. `App.jsx` (un `addEventListener` para el sonido de clic) | `evento.preventDefault()` evita que el formulario recargue la página |
| **Validación de datos** | `src/data/validaciones.js` y `src/data/comunidad.js` | Devuelven un objeto de errores que se muestra debajo de cada campo |
| **Componentes, JSX y props** | `TarjetaPlanta.jsx` recibe `planta`, `onActualizar`, `onEliminar`… | La lista le pasa a cada tarjeta sus datos y sus funciones |
| **`useState`** | `App.jsx`: `plantas`, `cargando`, `aviso`, `seccion` | Cuando cambia un estado, React vuelve a dibujar |
| **`useEffect` y su limpieza** | `App.jsx` (sesión anónima), `Aviso.jsx` (temporizador), `Abeja.jsx` (parpadeo), `Modal.jsx` (tecla Escape) | Sincronizan con algo externo. La función que devuelven **limpia** (`clearTimeout`, `removeEventListener`) |
| **Renderizado condicional** | `{cargando ? <BarraCarga/> : <JardinFiltrado/>}`, `{esAdmin && …}` | Lo que se ve depende del estado y del rol |
| **Listas y `key`** | `ListaJardin.jsx`: `key={planta.id}` | La `key` permite que React identifique cada elemento |
| **`fetch`, JSON, carga y errores** | `services/kitsu.js` + `BuscadorObras.jsx` | `await fetch`, se revisa `respuesta.ok`, `respuesta.json()`, y estados de carga, error y "sin resultados". Si el error es 429, avisa que hay que esperar |
| **Node, npm y Vite** | `package.json`, `npm install`, `npm run dev`, `npm run build` | Vite traduce el JSX y arma la carpeta `dist` que publica Vercel |
| **Firebase y Firestore** | `src/firebase.js` (conexión), `src/services/*.js` (CRUD) | La app habla directo con Firestore usando el SDK, sin servidor propio |
| **Estado local vs. datos persistentes** | `useState(plantas)` vs. `users/{uid}/plantas` en Firestore | El estado se pierde al recargar; Firestore no. Por eso, después de cada cambio se vuelve a consultar |
| **Variables de entorno** | `.env` (no está en GitHub), `.env.example`, `import.meta.env` en `firebase.js` | Las variables `VITE_` se leen en el navegador. Nunca van claves privadas |
| **Reglas de seguridad** | `firestore.rules` | Jardín privado; solo la administradora asigna misiones; se aceptan solo campos válidos. Se probó: un miembro recibe 403 |
| **GitHub y Vercel** | Repositorio con etiquetas v0.1…v1.0, y "Deployments" en Vercel | Cada `git push` dispara un nuevo despliegue automático |
| **Serverless** | Firebase + Vercel | No administro servidores: los administra el proveedor |
| **Uso de IA** | `docs/informe.md`, sección 5, y la bitácora | La IA ayudó, pero todo se revisó con pruebas y capturas. Se corrigieron muchos errores que la IA no vio en el primer intento |

## 2. Recorrido de un dato (para explicar "cómo se guarda un registro")
1. En `FormularioPlanta.jsx` se completa el formulario y `onSubmit` llama a `manejarEnvio`.
2. `validarPlanta()` revisa los datos. Si hay errores, se muestran y **no** se envía nada.
3. Se llama a `onAgregar(datos)`, que es la función `manejarAgregar` de `App.jsx`.
4. `manejarAgregar` llama a `agregarPlanta(uid, datos)` en `services/plantas.js`, que hace `addDoc` en `users/{uid}/plantas`.
5. **Firestore revisa las reglas** (que sea la dueña y que los datos sean válidos) y guarda.
6. La app vuelve a consultar con `obtenerPlantas` y actualiza el estado con `setPlantas`. React redibuja el jardín.
7. Aparece el aviso "Plantaste…" y suena el arpegio.

**Modificar** sigue el mismo camino con `updateDoc` (botón Regar), y **eliminar** con `deleteDoc` (compost).

## 3. Qué se mejoró después de la entrega regular
El final pide aclarar qué se mejoró a partir de la entrega del TP2. Ideas para seguir:
- **Iniciar sesión con Google** para recuperar el jardín y los clubes en otro dispositivo (la "ampliación opcional" de la consigna).
- Que Nana IA use un modelo de lenguaje real **a través de un servidor**, para no exponer claves.
- Notificaciones cuando te asignan una misión.

## 4. Glosario (con mis palabras)
- **Componente:** una pieza de la interfaz, como la tarjeta de una planta. Es una función que devuelve lo que se ve.
- **Props:** datos que un componente le pasa a otro. Por ejemplo, la lista le pasa a cada tarjeta su planta.
- **Estado (`useState`):** datos que la app recuerda y que, al cambiar, actualizan la pantalla.
- **`useEffect`:** código que se ejecuta para conectarse con algo externo (Firebase, un temporizador, el teclado).
- **Limpieza de un efecto:** la función que devuelve `useEffect` para "deshacer" lo que hizo.
- **`map` / `filter` / `find` / `forEach` / `reduce`:** transformar, seleccionar, encontrar uno, recorrer y acumular elementos de un array.
- **`children`:** lo que se escribe entre la etiqueta de apertura y la de cierre de un componente (por ejemplo, `Ventana`).
- **CRUD:** *Create, Read, Update, Delete*: crear, consultar, modificar y eliminar.
- **Rol:** el permiso de cada persona. En Nana: miembro o administradora del club.
- **Kanban:** un tablero con columnas (Por hacer, Haciendo, Hecha).
- **MVP:** producto mínimo viable. La primera versión que funciona (la v0.1).
- **API / endpoint:** un servicio externo y la dirección concreta a la que se le piden datos (Kitsu).
- **`fetch` / `async` / `await`:** hacer un pedido y esperar la respuesta sin trabar la página.
- **JSON:** el formato de texto en que llegan los datos.
- **Serverless:** sin servidor propio. Firebase y Vercel lo administran.
- **Variables de entorno (`.env`):** las llaves de conexión, fuera del repositorio.
- **Reglas de Firestore:** permisos que dicen quién puede leer o escribir cada dato.
- **Prueba de regresión:** volver a probar lo viejo después de un cambio, para asegurarse de que no se rompió nada.
