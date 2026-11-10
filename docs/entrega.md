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
| 5 | Demostración (mini video) | _pendiente: agregar el enlace_ |
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
| [**v1.1**](https://github.com/serenaretrive02/jardin-de-manga/tree/v1.1) | **Final:** pulido de diseño kawaii (más espacio, esquinas pixeladas, enredaderas y pasto) y revisión final de la rúbrica |

## Guion sugerido para el mini video (3–4 minutos)
1. **La idea** (20 s): qué es Nana y para quién es.
2. **Jardín** (60 s): buscar "Frieren" en la API, plantar, regar, editar y compostar. Recargar la página para mostrar que todo sigue ahí. Mostrar los filtros, "Mi ramo", el herbario y una pregunta a Nana IA.
3. **Firebase** (45 s): mostrar en la consola de Firestore el documento que se acaba de crear o modificar, y dónde se configura Firebase en el código (`src/firebase.js` + `.env`, que no está en GitHub).
4. **Comunidad** (60 s): crear un club, invitar con el código, asignar una misión (solo la administradora) y moverla en el tablero. Crear un evento y anotarse.
5. **Reglas** (20 s): mostrar las reglas publicadas y explicar que un miembro no puede asignar misiones.
6. **Vercel y GitHub** (20 s): la lista de despliegues automáticos y las versiones en GitHub.
