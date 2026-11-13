# Entrega — TP2 Desarrollo Frontend II

**Proyecto:** Nana, tu jardín de manga
**Materia:** Desarrollo Frontend II · UADE · Prof. Joaquín Cerviño · Viernes, turno noche
**Fecha límite:** 13/11/2026, 18:15

| # | Qué pide la consigna | Enlace |
|---|---|---|
| 1 | URL de la aplicación publicada en Vercel | https://jardin-de-manga.vercel.app |
| 2 | Repositorio de GitHub | https://github.com/serenaretrive02/jardin-de-manga |
| 3 | Informe breve | [docs/informe.md](informe.md) |
| 4 | Bitácora del proceso (con capturas) | [docs/bitacora.md](bitacora.md) |
| 5 | Demostración (mini video) | _pendiente: agregar el enlace_ · guion en [docs/guion-video.md](guion-video.md) |
| + | Especificación (requisitos, casos de uso, sprints) | [docs/especificacion.md](especificacion.md) |
| + | Guía para el oral del final | [docs/guia-oral.md](guia-oral.md) |

## Versiones publicadas (etiquetas en GitHub)
| Versión | Qué agregó |
|---|---|
| [v0.1](https://github.com/serenaretrive02/jardin-de-manga/tree/v0.1) | MVP: CRUD de plantas con Firestore, reglas, GitHub y Vercel |
| [v0.2](https://github.com/serenaretrive02/jardin-de-manga/tree/v0.2) | Identidad pixel art, validaciones, avisos, diseño para celular |
| [v0.3](https://github.com/serenaretrive02/jardin-de-manga/tree/v0.3) | Nombre "Nana", búsqueda con la API Kitsu, edición, estados coherentes |
| [v0.4](https://github.com/serenaretrive02/jardin-de-manga/tree/v0.4) | Comunidad: perfiles, clubes, misiones con rol de administradora, eventos, compartir |
| [v0.4.1](https://github.com/serenaretrive02/jardin-de-manga/tree/v0.4.1) | 9 flores con forma propia, guía flotante, abeja, Nana IA, eliminar perfil y cerrar sesión |
| [v1.0](https://github.com/serenaretrive02/jardin-de-manga/tree/v1.0) | Mi ramo, filtros, herbario, sonidos, auditoría y documentación |
| [v1.1](https://github.com/serenaretrive02/jardin-de-manga/tree/v1.1) | Pulido de diseño kawaii (más espacio, esquinas pixeladas, enredaderas y pasto) y revisión final de la rúbrica |
| [**v1.2**](https://github.com/serenaretrive02/jardin-de-manga/tree/v1.2) | **Final:** puntuación de 1 a 5 sakuras y reseña corta (con CRUD completo), promedio en "Mi ramo" y orden "Mejor puntuadas" |

## Mini video
El guion completo, escena por escena, con qué mostrar y qué decir, está en **[docs/guion-video.md](guion-video.md)**. En resumen, el video dura de 4 a 5 minutos:
1. **Presentación** sobre la URL de Vercel.
2. **Crear** un registro.
3. **Verlo** en la consola de Firestore.
4. **Modificarlo** y ver el cambio en la consola, y **recargar** la página.
5. **Eliminar** un registro.
6. **Dónde se configura Firebase:** `.env.example`, `src/firebase.js` y las variables de Vercel.
7. **El código que guarda y modifica:** `src/services/plantas.js` y `manejarAgregar`.
8. **Las reglas** de seguridad.
9. **Publicación y cierre:** Vercel y las versiones de GitHub.

## "La aplicación debe estar operativa al momento de la entrega"
La app **no depende de la compu de la autora**. Funciona sola en internet:
- **Vercel** sirve la página.
- **Firebase** guarda los datos.
- Las **llaves** están cargadas como variables de entorno en Vercel.

**Qué se verificó (10/11/2026):**
- La URL pública responde.
- La prueba completa del jardín pasó **17/17** sobre la versión publicada: buscar en la API, plantar, regar, editar, recargar y ver que los datos siguen, y la vista en celular. No hubo errores.
- El día anterior, la batería completa había dado **90/90**.
- **13/11/2026, versión final v1.2:** la batería completa dio **116/116** sobre la URL pública, sin errores. Incluye la prueba nueva de puntuación y reseña (26/26).
- Las **reglas de Firestore no tienen fecha de vencimiento**. No son las reglas "de prueba" que Firebase corta a los 30 días, así que la base no se va a cerrar sola.
- El proyecto usa el **plan gratuito** de Firebase (Spark) y de Vercel (Hobby), que no vencen.

**Checklist para el día de la entrega (2 minutos):**
1. Abrir https://jardin-de-manga.vercel.app en una **ventana de incógnito**, y también en el celular con datos móviles, no con el wifi de casa.
2. Plantar algo, regarlo, **recargar** la página (tiene que seguir ahí) y compostarlo.
3. Abrir el enlace del video en incógnito y comprobar que se ve sin iniciar sesión.

**Qué NO hacer hasta que se corrija el TP:**
- No borrar ni pausar el proyecto en Vercel ni en Firebase.
- No desactivar el acceso **Anónimo** en Firebase Authentication.
- No borrar las variables de entorno de Vercel.
- No subir cambios de último momento sin probarlos. Si algo se rompe después de subir un cambio, en Vercel → Deployments se puede elegir la versión anterior y usar **"Promote to Production"** (o "Instant Rollback") para volver a ella en segundos.
