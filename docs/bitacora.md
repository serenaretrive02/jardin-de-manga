# 📓 Bitácora del proceso — Jardín de Manga

Registro de cómo fue evolucionando la aplicación, versión por versión: qué se cambió, por qué, cómo se probó, cómo se usó la inteligencia artificial y qué problemas aparecieron.

> *Jardín de Manga* es un nombre provisorio. El nombre definitivo se elige al final del proceso.

---

## Etapa 0 — La idea (09/11/2026)

### Punto de partida
Lo primero fue leer la consigna del TP2, la rúbrica, la consigna del examen final y las guías de teoría de la materia: Introducción a React, npm, módulos, props y hooks, APIs y arrays. El examen final consiste en **defender este mismo proyecto**, así que desde el inicio se buscó una app que use los temas vistos en clase y que se pueda seguir mejorando después.

### Lluvia de ideas
Le pedí a la IA ideas que mezclaran mis gustos (Minecraft, League of Legends, manga/anime y flores) y que permitieran agregar, consultar, modificar y eliminar datos. Surgieron cinco propuestas:

| Idea | De qué se trataba | Por qué sí / por qué no |
|---|---|---|
| **Jardín de Manga** ✅ | Cada manga/anime es una flor que crece según lo que leés | Une tres de mis gustos y es muy visual. Es una "vuelta de tuerca" al registro de libros que sugiere la consigna |
| Bloque a Bloque | Planificador de construcciones de Minecraft con materiales | Buena idea de inventario, pero menos original visualmente |
| Champion Lab | Diario de práctica de League of Legends | Correcta técnicamente, pero más "típica" |
| Quest Log | Tareas convertidas en misiones de videojuego | Muy cercana a la lista de tareas común |
| Herbario Otaku | Catálogo de flores que aparecen en animes | Original, pero con pocas acciones posibles |

### Decisión
Elegí **Jardín de Manga**. Las acciones que pide la consigna se convierten en acciones de jardinería:

| Lo que pide la consigna | En la app |
|---|---|
| Agregar un registro | **Plantar** un manga o anime |
| Consultar | Ver **mi jardín** |
| Modificar | **Regar** (+1 capítulo) y cambiar el estado |
| Eliminar | **Compostar** (quitar la planta) |

**¿Para quién es?** Para lectoras y lectores de manga y anime que siguen muchas series a la vez y quieren recordar por dónde iban, de una forma más linda que una lista o una planilla.

### Plan de versiones
Se planificaron 5 versiones, siguiendo la idea de **MVP** (producto mínimo viable) vista en clase: primero algo simple que funcione y después mejoras por etapas.

| Versión | Objetivo |
|---|---|
| v0.1 | Que funcione: guardar, ver, modificar y borrar en Firebase. Diseño básico a propósito |
| v0.2 | Identidad visual de jardín, versión para celular, mensajes claros |
| v0.3 | Buscar mangas/animes reales con una API (portadas y capítulos) |
| v0.4 | Filtros, buscador, estadísticas y significado de cada flor |
| v1.0 | Pulido final, pruebas completas y documentación |

---

## Versión 0.1 — MVP: que funcione (09/11/2026)

### Qué se hizo
1. **Se creó el proyecto** en Visual Studio Code con el comando visto en clase:
   `npm create vite@latest jardin-de-manga -- --template react`
2. **Se instalaron las dependencias** con `npm install` y la librería de Firebase con `npm install firebase`.
3. **Se borraron los archivos de ejemplo** de Vite (logos e imágenes de muestra) que no se iban a usar.
4. **Se organizó el código en archivos chicos**, uno por tarea, como recomienda la guía de módulos:
   - `firebase.js`: la conexión con Firebase.
   - `services/plantas.js`: las 4 operaciones con la base de datos (consultar, agregar, modificar, eliminar).
   - `data/flores.js`: qué flor corresponde a cada género y cómo se ve la planta según el avance.
   - `components/`: el formulario, la lista y la tarjeta de cada planta.
5. **Se escribieron las reglas de seguridad** de la base de datos (`firestore.rules`).
6. **Se preparó el archivo `.env.example`**, con los nombres de las llaves de Firebase pero sin sus valores.
7. **Se escribió el README** con las instrucciones para instalar y ejecutar.

### Cómo funciona esta versión (explicado simple)
- Cuando alguien abre la app, Firebase le da una **identidad anónima**: lo reconoce sin pedirle usuario ni contraseña.
- Cada persona tiene **su propio jardín** guardado en Firestore. Nadie más puede verlo ni modificarlo.
- El formulario permite **plantar** un manga o anime con título, tipo, género y cantidad de capítulos.
- Cada tarjeta muestra la planta con un emoji que cambia según el avance: 🫘 semilla → 🌱 brote → 🌿 creciendo → 🌹 en flor (o 🥀 si se abandona).
- Se puede **cambiar el estado**, **sumar un capítulo** y **eliminar**. Después de cada cambio, la app vuelve a pedirle los datos a Firebase, así lo que se ve en pantalla es lo que realmente quedó guardado.

### Lo que esta versión todavía NO tiene (a propósito)
Se deja anotado para mejorarlo en las próximas versiones:
- El diseño es muy básico: letra común, bordes grises, sin colores ni identidad.
- En el celular se ve, pero no está pensado para pantallas chicas.
- No hay mensajes de "¡guardado!": solo aparecen los errores.
- Borrar no pide confirmación, así que un clic por error elimina la planta.
- Hay que escribir los títulos a mano y no hay portadas.
- No se puede buscar ni filtrar dentro del jardín.
- Los emojis de las flores dependen del sistema de cada dispositivo y no se pueden personalizar.

### Uso de IA en esta etapa
- **Herramienta:** Claude Code (Claude, de Anthropic) dentro de la app de escritorio, trabajando sobre la carpeta del proyecto.
- **Ejemplos de lo que le pedí:**
  - *"Leé la teoría de todos los PDF y la consigna del TP2. Antes de crear cualquier aplicación, pensá ideas creativas y originales según lo que me gusta (Minecraft, LoL, manga, anime, flores) que permitan hacer todas las acciones que pide la consigna."*
  - *"Quiero avanzar con la idea del jardín de manga. Usamos Visual Studio Code, GitHub y lo que está en las teorías de los PDF, así que todo tiene que ser lo que vimos en clase."*
- **Qué revisé del resultado:** que el código use lo visto en clase (`useState`, `useEffect`, props, `map`, `try/catch/finally` como en la guía de props y hooks) y que la conexión con Firebase lea las llaves desde el `.env` con `import.meta.env`, como pide la consigna.

### Dificultades y cómo se resolvieron
| Problema | Cómo se detectó | Solución |
|---|---|---|
| El `.gitignore` que crea Vite **no incluía el archivo `.env`**. Si se subía así, las llaves de Firebase iban a quedar publicadas en GitHub | Revisando el archivo contra el paso 6 de la consigna | Se agregaron `.env` y sus variantes al `.gitignore` |
| Sin el `.env`, la app se rompía y mostraba la pantalla en blanco | Probando la app antes de tener Firebase configurado | La app ahora revisa si faltan llaves y muestra un aviso explicando qué hacer (captura 1) |
| Al compilar (`npm run build`) apareció la advertencia "*Some chunks are larger than 500 kB*" | Leyendo la terminal | No es un error, el sitio funciona igual. Se debe a que la librería de Firebase es pesada. Queda anotado como posible mejora |

### Pruebas realizadas
- `npm run dev`: la app abre en `http://localhost:5173/` ✅
- `npm run build`: compila sin errores ✅
- Sin `.env`: muestra el aviso de configuración en lugar de romperse ✅

![La app corriendo en local antes de conectar Firebase](capturas/v0.1-01-local-sin-firebase.png)
*Captura 1: la app corriendo en local antes de conectar Firebase. Avisa qué falta en lugar de mostrar una pantalla en blanco.*

### Configuración de Firebase (10/11/2026)
Se hizo desde la consola de Firebase, en el proyecto **Frontend II**, siguiendo las etapas 2 y 4 de la consigna:

1. **Se registró la app web** (botón `</>`) con el nombre `jardin-de-manga`. Firebase entregó el objeto `firebaseConfig` con las llaves de conexión. No se activaron Hosting ni Analytics porque no hacen falta.
2. **Se habilitó el acceso Anónimo** en *Authentication → Método de acceso*.
3. **Se creó la base Cloud Firestore**: edición Standard, identificador `(default)`, región São Paulo (`southamerica-east1`) y modo producción. Las copias de seguridad programadas quedaron desactivadas porque son de pago.
4. **Se publicaron las reglas** copiando el archivo `firestore.rules` en la pestaña *Reglas*.
5. **Se copiaron las 4 llaves** (apiKey, authDomain, projectId, appId) al archivo `.env`, una por línea y sin comillas ni comas.

![Acceso anónimo habilitado](capturas/v0.1-02-auth-anonimo.jpg)
*Captura 2: el proveedor "Anónimo" habilitado en Authentication.*

![Región de Firestore](capturas/v0.1-03b-firestore-region.jpg)
*Captura 3: creación de Firestore con la región São Paulo.*

![Reglas publicadas](capturas/v0.1-04-reglas-publicadas.jpg)
*Captura 4: las reglas del proyecto publicadas. A la izquierda se ve el historial con la versión nueva.*

### Prueba de integración en local (10/11/2026)
Se siguió el paso 5 de la consigna ("Verificar la integración") con `npm run dev`:

| Prueba | Qué se hizo | Resultado |
|---|---|---|
| Agregar | Se plantó "Frieren" (manga, fantasía, 4 capítulos) | ✅ Aparece como 🫘 semilla, 0/4 |
| Ver en Firestore | Se buscó en *Firestore → Datos* | ✅ Está en `users/(uid)/plantas/` con todos sus campos |
| Modificar | +1 capítulo dos veces y estado "Leyendo" | ✅ Pasa a 🌿 "Creciendo", 2/4 |
| Recargar | Se recargó la página (F5) | ✅ Los cambios siguen ahí |
| Ver el cambio en Firestore | Se abrió el documento | ✅ `capitulosLeidos: 2`, `estado: "leyendo"` |
| Eliminar | Se plantó "Prueba para borrar" y se eliminó | ✅ Desaparece de la app y de Firestore |

![Agregar](capturas/v0.1-05-agregar.jpg)
*Captura 5: el primer manga plantado. El diseño todavía es el básico del MVP.*

![Después de recargar](capturas/v0.1-06-modificado-tras-recargar.jpg)
*Captura 6: después de recargar, Frieren sigue con 2/4 capítulos y en "Leyendo / Viendo".*

![Documento en Firestore](capturas/v0.1-07-dato-en-firestore.jpg)
*Captura 7: el mismo dato guardado en Firestore. Los valores coinciden con la pantalla.*

### Más dificultades de esta etapa
| Problema | Cómo se detectó | Solución |
|---|---|---|
| `npm run dev` daba el error *"la ejecución de scripts está deshabilitada en este sistema"* | Al correr el comando por primera vez en la terminal de VS Code | Es una protección de Windows (PowerShell). Se aplicó el comando que indicó el profesor: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| Primero se escribió `run dev` en lugar de `npm run dev` | La terminal respondió que no reconocía "run" | El comando siempre empieza con `npm`, que es el programa que ejecuta los scripts del `package.json` |
| Al abrir `index.html` con doble clic se veía una página en blanco | Probando abrir el archivo directamente | Una app de React + Vite no se abre así: Vite tiene que "traducir" el código. Se abre con `npm run dev` en `http://localhost:5173` |
| En el `.env` los valores quedaron con un espacio después del `=` | Revisando el archivo antes de publicar | Se borraron los espacios. La consigna pide copiar solo los valores |
| **Problema de diseño:** cuando el texto de la tarjeta pasa a dos líneas (por ejemplo, "Creciendo"), los botones se mueven de lugar y es fácil tocar el equivocado | Haciendo clics seguidos en "+1 capítulo" | Se deja anotado para la v0.2: los botones van a tener un lugar fijo en la tarjeta |

### Subida a GitHub (10/11/2026)
1. Se configuró git con el usuario de GitHub `serenaretrive02`. Como email se usó el email privado que da GitHub (`...@users.noreply.github.com`), para no publicar el email personal.
2. **Antes de subir se revisó qué archivos entraban en el commit** con `git status`, como pide la consigna. Entraron 27 archivos. Estaba `.env.example` y **no** estaban `.env`, `node_modules` ni `dist`.
3. Se creó el repositorio público **jardin-de-manga** en GitHub, sin README ni `.gitignore` automáticos, porque ya teníamos los nuestros.
4. Se subió el código con `git push`.
5. **Verificación:** se intentó abrir el `.env` directamente en GitHub y respondió "no existe" (error 404). Las llaves no quedaron publicadas ✅.

Repositorio: https://github.com/serenaretrive02/jardin-de-manga

### Publicación en Vercel (10/11/2026)
1. Se inició sesión en Vercel con la cuenta de GitHub (plan Hobby, gratuito).
2. Se importó el repositorio `jardin-de-manga`. Vercel detectó solo que es un proyecto **Vite**.
3. Se revisó la configuración que pide la consigna: Root Directory `./` (donde está `package.json`), Build Command `npm run build` y Output Directory `dist`.
4. Se cargaron las 4 variables `VITE_FIREBASE_...` en **Environment Variables**, para Production y Preview y **sin** marcarlas como "Sensitive", porque son la configuración pública de Firebase.
5. Se hizo clic en **Deploy**. El build terminó en 16 segundos sin errores.

![Configuración en Vercel](capturas/v0.1-08-vercel-config.jpg)
*Captura 8: Vercel detecta Vite, `npm run build` y la carpeta `dist`.*

![Deploy exitoso](capturas/v0.1-09-vercel-deploy.jpg)
*Captura 9: "Deployed to Production". La vista previa ya muestra la app.*

**URL publicada:** https://jardin-de-manga.vercel.app

### Pruebas en la versión publicada (10/11/2026)
Se repitieron las pruebas desde la URL de Vercel (paso 8 de la consigna):

| Prueba | Resultado |
|---|---|
| La app abre y se conecta a Firebase | ✅ Muestra "Tu jardín está vacío" sin errores |
| Agregar "Spy x Family" (anime, comedia, 12 capítulos) | ✅ Aparece como 🫘 semilla |
| +1 capítulo y estado "Terminado" | ✅ Pasa a 🌼 "En flor" |
| Recargar la página | ✅ Sigue en flor, 1/12, terminado |
| Agregar y eliminar "Prueba para borrar" | ✅ Desaparece y no vuelve al recargar |
| Pantalla de compu (1280 px) | ✅ Se usa bien (captura 10) |
| Pantalla de celular (390 px) | ✅ Se puede usar, pero con detalles para mejorar (captura 11) |

> **Algo que llamó la atención:** en la versión publicada el jardín empezó vacío, aunque en local ya había un manga plantado. No es un error: el acceso es anónimo, y Firebase toma a `localhost` y a `vercel.app` como dos visitantes distintos, así que cada uno tiene su propio jardín. La consigna lo explica en la etapa 4.

![Versión publicada en compu](capturas/v0.1-10-vercel-compu.png)
*Captura 10: la versión 0.1 publicada en Vercel, vista en compu.*

![Versión publicada en celular](capturas/v0.1-10-vercel-celular.png)
*Captura 11: la misma versión en un celular (390 px de ancho).*

### Un error al actualizar el repositorio (y cómo se corrigió)
Al subir la documentación final de la v0.1, **el archivo `.env.example` se borró del repositorio**. Al preparar el `.env`, el archivo de ejemplo se había renombrado en lugar de copiarse. Git interpretó que se había eliminado y el commit subió esa eliminación.

- **Cómo se detectó:** revisando la lista de cambios del commit (`git status`), donde aparecía `D .env.example` (D = *deleted*, eliminado).
- **Cómo se resolvió:** se recuperó el archivo desde un commit anterior y se subió de nuevo con un commit nuevo ("fix: restaurar .env.example").
- **Verificación:** en GitHub `.env.example` vuelve a estar disponible y `.env` sigue sin publicarse.
- **Aprendizaje:** el archivo `.env` se crea **copiando** `.env.example`, no renombrándolo. Y conviene leer siempre la lista de cambios antes de cada commit, no solo la primera vez.

### Conclusión de la v0.1
**La v0.1 cumple el mínimo de la consigna:** está hecha con React + Vite, guarda, consulta, modifica y elimina en Firestore, conserva los cambios al recargar, tiene reglas de seguridad, el código está en GitHub sin las llaves y está publicada en Vercel.

### Mejoras detectadas para la v0.2
Lo que se observó al probar esta versión y que se va a trabajar en la próxima:
1. **Identidad visual:** hoy parece un formulario de los 2000. Hace falta una paleta, tipografía e ilustraciones que transmitan "jardín" y "manga".
2. **Celular:** las tarjetas miden 200 px fijos y dejan espacio vacío. Los botones son muy chicos para tocar con el dedo.
3. **Botones que se mueven:** cuando el texto pasa a dos líneas, los botones cambian de lugar.
4. **Mensajes:** no hay confirmación de "¡Plantado!" ni de "Guardado". Solo se ven los errores.
5. **Validaciones:** el título solo se controla como "obligatorio". Faltan avisos claros, por ejemplo para un título muy largo o capítulos negativos.
6. **Eliminar sin confirmar:** un clic por error borra la planta.
7. **Coherencia de datos:** se puede marcar "Terminado" con 1 de 12 capítulos, o sumar capítulos por encima del total.
8. **Emojis:** dependen del sistema de cada dispositivo. Ilustraciones propias darían un diseño más cuidado y coherente.
