# Guion del mini video — Nana, tu jardín de manga

**Qué pide la consigna (punto 5):** *"Demostración y explicación del funcionamiento, incluyendo dónde se configura Firebase y cómo se guarda o modifica un registro."*

En otras palabras, el video tiene que mostrar tres cosas:
1. **Que la app funciona**: se usa la app publicada en Vercel, no la de la compu.
2. **Dónde se configura Firebase**: los archivos `.env.example` y `src/firebase.js`.
3. **Cómo se guarda y se modifica un registro**: se hace en la app y se ve el cambio en la consola de Firestore. Después se muestra el código que lo hace.

**Duración objetivo:** entre 4 y 5 minutos. No hace falta mostrar todo lo que hace la app. Alcanza con lo que pide la consigna, bien explicado.

---

## Antes de grabar (no se graba)

### 1. Abrir estas pestañas en el navegador, en este orden

| Pestaña | Dirección |
|---|---|
| 1. La app publicada | https://jardin-de-manga.vercel.app |
| 2. Consola de Firebase → **Firestore Database → Datos** | console.firebase.google.com → tu proyecto |
| 3. Consola de Firebase → **Firestore Database → Reglas** | (misma consola, pestaña "Reglas") |
| 4. Vercel → el proyecto → **Deployments** | vercel.com |
| 5. GitHub → el repositorio | https://github.com/serenaretrive02/jardin-de-manga |

### 2. Abrir en VS Code estos archivos, uno por pestaña
- `.env.example`
- `src/firebase.js`
- `src/services/plantas.js`
- `src/App.jsx`, con la función `manejarAgregar` a la vista (línea 91 aprox.)
- `firestore.rules`

> ⚠️ **No abrir `.env` en el video.** Tiene las llaves reales y el video va a quedar publicado. Se muestra `.env.example`, que tiene los mismos nombres pero sin valores. Lo mismo en Vercel: no tocar el "ojito" que muestra los valores de las variables.

### 3. Encontrar tu jardín en la consola de Firestore
Firestore guarda cada jardín bajo un código de usuaria (el "uid"). Como hay muchos usuarios de prueba, conviene ubicar el tuyo antes:
1. Abrí la app (pestaña 1) y plantá algo cualquiera, por ejemplo "Prueba".
2. En la consola de Firebase andá a **Authentication → Usuarios**. Ordená por **"Último acceso"**: el primero de la lista sos vos. Copiá su **UID**.
3. En **Firestore → Datos**, hacé clic en la ruta de arriba (el lápiz ✏️) y pegá `/users/TU-UID/plantas`. Ahí vas a ver la planta "Prueba".
4. Compostá "Prueba" en la app para empezar con el jardín limpio, y **dejá esa pestaña de la consola abierta en esa ruta**.

### 4. Preparar la grabación
- **Para grabar:**
  - Usá la **Herramienta Recortes** de Windows: `Win + Shift + R`, elegí "pantalla completa" y activá el micrófono.
  - Otra opción es **Clipchamp → Grabar pantalla**, que ya viene en Windows 11.
  - Las dos graban todo lo que pase en la pantalla, aunque cambies de programa.
- Cerrá WhatsApp, el mail y cualquier otra cosa que pueda mostrar notificaciones.
- Poné el zoom del navegador en 110 % o 125 % para que se lea bien.
- **Si te trabás, no pasa nada:** pausá y retomá, o grabá cada escena por separado y unilas en Clipchamp.

---

## Guion escena por escena

En la columna **"Qué decir"** hay un texto de ejemplo. No hace falta decirlo de memoria ni palabra por palabra: es una guía para que no se escape nada.

### Escena 1 — Presentación (≈ 20 s)
| Qué mostrar | Qué decir |
|---|---|
| Pestaña 1: la app en la URL de Vercel. Señalá con el mouse la barra de direcciones | "Hola, soy [tu nombre] y este es mi TP2 de Desarrollo Frontend II. **Nana** es un jardín de manga: cada manga o anime que estás leyendo se convierte en una planta que crece a medida que avanzás capítulos. La app está hecha con **React y Vite**, guarda los datos en **Firebase Firestore**, el código está en **GitHub** y está publicada en **Vercel**, en esta dirección." |

### Escena 2 — Guardar un registro: CREAR (≈ 45 s)
| Qué mostrar | Qué decir |
|---|---|
| Hacé clic en **Plantar** con el formulario vacío. Aparece el mensaje de error | "Primero, las **validaciones**: si intento plantar sin título, la app no me deja y me dice qué falta." |
| Elegí **Manga**, escribí "Frieren" en el buscador y elegí el resultado. Se completan el título, los capítulos y el género | "Puedo buscar la obra. Los datos vienen de una API pública, Kitsu, y completan el formulario solos." |
| Hacé clic en **Plantar**. Mostrá el botón "Plantando…", el aviso verde y la planta nueva | "Al plantar se ve el estado de **carga**, después el aviso de **éxito**, y la planta aparece en mi jardín. En este momento se **creó un registro** en la base de datos." |

### Escena 3 — Ver el registro en Firestore (≈ 40 s)
| Qué mostrar | Qué decir |
|---|---|
| Pestaña 2: la consola de Firestore en `/users/TU-UID/plantas`. Hacé clic en el documento nuevo | "Acá está la consola de **Firestore**. Cada usuaria tiene su colección `plantas`, y este es el documento que se acaba de crear." |
| Señalá los campos | "Cada registro guarda el título, el tipo, el género, el estado, los capítulos leídos y los totales, la portada y la fecha de creación." |

### Escena 4 — Modificar un registro: ACTUALIZAR (≈ 50 s)
| Qué mostrar | Qué decir |
|---|---|
| Volvé a la app. Tocá **Regar +1** dos veces | "Ahora **modifico** el registro. Cada vez que riego sumo un capítulo leído. La planta crece y pasa sola de 'Pendiente' a 'Leyendo'." |
| Volvé a la consola. `capitulosLeidos` ahora dice 2 y `estado` dice "leyendo". Si no se actualizó, recargá la consola | "En Firestore se ve el cambio: `capitulosLeidos` pasó a 2 y el estado a 'leyendo'. No se creó un registro nuevo: se **actualizó el mismo**." |
| En la app, tocá el **lápiz ✏️**, cambiá los capítulos totales y **Guardar** | "También puedo editar todos los datos desde esta ventana, que tiene sus propias validaciones." |
| **Recargá la página (F5).** La planta sigue igual | "Si recargo la página, todo sigue ahí, porque los datos no están en el navegador: están guardados en Firebase." |
| (Opcional, v1.2) Abrí la pestaña **Diario**: aparece lo que terminaste, con la fecha de hoy | "Todo lo que termino queda en mi Diario, como en Letterboxd, con la fecha, las sakuras y la reseña. No es otra colección: son los mismos registros, filtrados." |
| (Opcional, v1.2) Cambiá el estado a **Terminado**, tocá la 4.ª **sakura** y mostrá en la consola el campo `puntuacion: 4`. Después tocá la misma sakura y mostrá que el campo **desaparece** | "Cuando termino un manga lo puedo puntuar de 1 a 5 sakuras. En Firestore aparece el campo `puntuacion`. Si toco la misma sakura, la quito, y el campo se **borra** del documento con `deleteField`." |

### Escena 5 — Eliminar (≈ 15 s)
| Qué mostrar | Qué decir |
|---|---|
| Plantá otra cosa rápido (por ejemplo "Prueba"), tocá el botón de **compostar** y confirmá. Mostrá en la consola que desapareció | "Y para completar el CRUD: **compostar** borra el registro. Primero me pide confirmación y, después, el documento desaparece de Firestore." |

### Escena 6 — Dónde se configura Firebase (≈ 60 s)
| Qué mostrar | Qué decir |
|---|---|
| VS Code: `.env.example` | "La configuración de Firebase está en un archivo `.env` con cuatro variables: la clave de la API, el dominio, el id del proyecto y el id de la app. Ese archivo **no se sube a GitHub**: está en el `.gitignore`. Para que otra persona sepa qué completar, dejé este `.env.example`, con los mismos nombres y sin los valores." |
| `src/firebase.js` | "En `firebase.js` leo esas variables con `import.meta.env`, inicializo Firebase con `initializeApp`, y exporto la **autenticación** y la **base de datos**, `db`. La autenticación es anónima: cada visitante tiene su propio jardín sin tener que registrarse." |
| Vercel → Settings → **Environment Variables** (sin mostrar los valores) | "En Vercel cargué las mismas cuatro variables, así la versión publicada se conecta a la misma base." |

### Escena 7 — Cómo se guarda y se modifica en el código (≈ 50 s)
| Qué mostrar | Qué decir |
|---|---|
| `src/services/plantas.js` | "Todas las operaciones con la base están en `plantas.js`. **Agregar** usa `addDoc` sobre la colección `users/uid/plantas`. **Modificar** usa `updateDoc`, y cambia solo los campos necesarios. **Eliminar** usa `deleteDoc`. Y **consultar** usa `getDocs`, ordenado por fecha." |
| `src/App.jsx`, función `manejarAgregar` | "Cuando aprieto 'Plantar', el formulario valida los datos y llama a `manejarAgregar`. Esa función activa el estado de carga y llama a `agregarPlanta`. Después vuelve a consultar el jardín y muestra el aviso de éxito. Si algo falla, el `catch` muestra el aviso de error." |

### Escena 8 — Reglas de seguridad (≈ 30 s)
| Qué mostrar | Qué decir |
|---|---|
| Pestaña 3: las reglas publicadas, o `firestore.rules` en VS Code | "Las **reglas de Firestore** protegen los datos en el servidor. Cada jardín solo lo puede leer y modificar su dueña. Además, las reglas revisan que los datos tengan la forma correcta: por ejemplo, que los capítulos leídos no superen el total." |
| (Opcional) Bajá hasta la parte de los clubes | "En la comunidad, solo la administradora de un club puede crear y asignar misiones, y eso también lo controlan las reglas." |

### Escena 9 — Comunidad, opcional (≈ 30 s)
Si te sobra tiempo, mostralo; si no, no hace falta.

| Qué mostrar | Qué decir |
|---|---|
| Pestaña **Comunidad**: tu perfil, un club, una misión que movés de columna en el tablero | "La app también tiene una comunidad: clubes de lectura con misiones y eventos, con su propio CRUD." |

### Escena 10 — Publicación y cierre (≈ 25 s)
| Qué mostrar | Qué decir |
|---|---|
| Pestaña 4: Vercel → Deployments | "Vercel está conectado al repositorio: cada vez que subo un cambio a GitHub, publica una versión nueva sola." |
| Pestaña 5: GitHub → **Tags / Releases** (v0.1 … v1.2) | "El proyecto se hizo en ocho versiones, de la v0.1 a la v1.2. Cada una está marcada en GitHub y explicada en la bitácora." |
| Volvé a la app | "Eso es Nana. ¡Gracias!" |

---

## Después de grabar
1. Revisá que se escuche bien y que **en ningún momento se vean las llaves de `.env`**.
2. Subí el video a **YouTube como "No listado"** o a **Google Drive** con "Cualquier persona con el enlace puede ver".
3. Abrí el enlace en una ventana de incógnito para comprobar que se ve sin iniciar sesión.
4. Pegá el enlace en `docs/entrega.md` y `docs/informe.md`, donde dice *"pendiente"*, o pasáselo a Claude para que lo agregue.

## Lista rápida: ¿el video cumple la consigna?
- [ ] Se usa la app **publicada** (se ve la URL de Vercel)
- [ ] Se **crea** un registro y se ve en la consola de Firestore
- [ ] Se **modifica** un registro y se ve el cambio en la consola
- [ ] Se **recarga** la página y los datos siguen ahí
- [ ] Se muestra **dónde se configura Firebase** (`.env.example`, `firebase.js`, variables en Vercel)
- [ ] Se muestra el **código** que guarda y modifica (`plantas.js`, `manejarAgregar`)
- [ ] Se ven las **validaciones** y los estados de **carga, éxito y error**
- [ ] No aparecen las llaves reales
