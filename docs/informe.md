# Informe — Jardín de Manga

**Trabajo Práctico 2 · Desarrollo Frontend II · UADE**
Prof. Joaquín Cerviño · Viernes, turno noche · 2.º cuatrimestre 2026

> Documento en construcción: se completa a medida que avanzan las versiones.

## Enlaces de la entrega
- **App publicada (Vercel):** https://jardin-de-manga.vercel.app
- **Repositorio (GitHub):** https://github.com/serenaretrive02/jardin-de-manga
- **Bitácora:** [bitacora.md](bitacora.md)
- **Video de demostración:** _pendiente_

---

## 1. La idea

**Jardín de Manga** es una aplicación web para llevar el registro de los mangas y animes que estás siguiendo. En lugar de una lista común, **cada título es una flor**:

- La **especie** depende del género. Por ejemplo, el romance es una rosa y la acción un girasol.
- La planta **crece** a medida que avanzás capítulos: semilla → brote → creciendo → en flor.
- Si dejás de leerla, la flor **se marchita**.

Así, el progreso de lectura se ve de un vistazo y registrarlo se vuelve algo más lindo y motivador que tachar una lista.

### ¿Qué necesidad resuelve?
Quienes leen manga o miran anime suelen seguir muchas series a la vez y se olvidan en qué capítulo quedaron, qué tenían pendiente o qué dejaron a medias. La app guarda esa información y la muestra de forma visual.

### ¿Para quién es?
Para lectoras y lectores de manga y espectadores de anime, sobre todo jóvenes, que quieren organizar lo que consumen sin tener que crear una cuenta ni completar formularios largos.

## 2. Funciones implementadas

| Acción | Qué hace | Operación en la base de datos | Desde |
|---|---|---|---|
| Ver mi jardín | Muestra todas las plantas guardadas, con su dibujo y su barra de avance | Consultar | v0.1 |
| Plantar | Agrega un manga o anime. Antes valida los datos y muestra una vista previa de la flor | Agregar | v0.1 (validaciones y vista previa: v0.2) |
| Regar +1 | Suma un capítulo y la planta crece. Al llegar al total se bloquea ("Completo") | Modificar | v0.1 (límite: v0.2) |
| Cambiar estado | Pendiente / Leyendo / Terminado (florece) / Abandonado (se marchita) | Modificar | v0.1 |
| Compostar | Elimina la planta, después de pedir confirmación | Eliminar | v0.1 (confirmación: v0.2) |

**Experiencia de uso (consigna, punto 6):**
- **Validaciones:** el título es obligatorio y tiene un máximo de 120 caracteres. Los capítulos tienen que ser un número entero entre 0 y 5000. Los errores se muestran debajo de cada campo.
- **Información de carga:** una barra pixelada mientras se trae el jardín. Los botones dicen "Plantando..." y las tarjetas se atenúan mientras se guardan.
- **Mensajes de éxito o error:** aviso flotante después de cada operación. Si Firebase falla, el aviso es rojo y explica qué pasó.
- **Celular y compu:** en la compu, el formulario y el jardín van lado a lado. En el celular, todo en una columna, con tarjetas horizontales y botones de al menos 44 px.

## 2.b Diseño: por qué se ve así

El diseño **no es el primer resultado de la IA**: se construyó en iteraciones (ver la bitácora).
- **v0.1:** a propósito, sin diseño. Era un formulario y tarjetas grises, para priorizar que funcione.
- **v0.2:** **estética pixel art**, inspirada en tres referencias visuales:
  - una tienda de plantas en pixel art (paleta lima y rosa),
  - íconos pixelados,
  - un escritorio de computadora retro (ventanas con barra de título).

**Justificación:**
- El pixel art conecta con el público (lectores de manga y anime, cercanos a los videojuegos) y refuerza la idea de "cuidar un jardín" como en un juego.
- Las flores se dibujaron a mano como grillas de colores, así cada género tiene su propia flor y cada etapa (semilla → brote → creciendo → flor, o marchita) se reconoce de un vistazo.
- La tipografía arcade (*Press Start 2P*) se usa solo en títulos porque cuesta leerla en textos largos. Los textos usan *Pixelify Sans*, que mantiene el estilo pero se lee mejor.
- Los bordes oscuros y las sombras sólidas mantienen buen contraste y dan coherencia: todo parece hecho de píxeles.

## 3. Información guardada en Firebase

La app usa dos servicios de Firebase:

- **Authentication (modo anónimo):** reconoce a cada visitante sin pedirle registro. Cada navegador recibe un código de identidad propio (`uid`).
- **Cloud Firestore:** la base de datos donde se guarda el jardín de cada persona.

Los datos se ordenan como carpetas: `users / (código del usuario) / plantas / (cada planta)`.

Cada planta guarda: título, tipo (manga o anime), género, capítulos leídos, capítulos totales, estado y fecha de creación.

### Seguridad
- Las **reglas de Firestore** (archivo `firestore.rules`) hacen que cada persona **solo pueda leer y modificar su propio jardín**. Además, controlan que los datos tengan la forma correcta: que el título no esté vacío, que el estado sea uno de los permitidos, etc. Cualquier otra parte de la base queda cerrada.
- Las **llaves de conexión** de Firebase se guardan en un archivo `.env` que **no se sube a GitHub**. En el repositorio solo está `.env.example`, con los nombres de las variables y sin sus valores. En Vercel, las llaves se cargan como variables de entorno.

### ¿Qué pasa si abro la app en otro dispositivo?
Como el ingreso es anónimo, cada navegador tiene su propio jardín. Abrir la app en el celular muestra un jardín distinto al de la computadora. La consigna menciona esta limitación y deja el inicio de sesión permanente como ampliación opcional.

## 4. Herramientas utilizadas

| Herramienta | Uso |
|---|---|
| Visual Studio Code | Editor de código y terminal |
| Node.js + npm | Instalar las librerías y ejecutar el proyecto |
| React + Vite | Construir la interfaz con componentes |
| Firebase | Identificación anónima y base de datos |
| Git + GitHub | Control de versiones y repositorio |
| Vercel | Publicación del sitio |
| Claude Code (IA) | Ideas, generación y revisión de código, documentación |

## 5. Uso de inteligencia artificial

Se usó **Claude Code**, un asistente de IA de Anthropic que trabaja directamente sobre la carpeta del proyecto.

**Para qué se usó:**
- Pensar y comparar ideas de aplicación a partir de mis gustos.
- Generar la estructura inicial del código, siguiendo los ejemplos de las guías de clase.
- Revisar que se cumpla cada punto de la consigna. Por ejemplo, así se detectó que el `.gitignore` no protegía el `.env`.
- Redactar la documentación (README, bitácora y este informe).

**Ejemplos de instrucciones dadas a la IA:**
0. *"Manejá con control remoto el paso por paso de la primera versión, siguiendo la consigna y las notas de clase."* (La IA configuró Firebase y Vercel desde el navegador. Los pasos que implican confirmar algo público o cargar llaves los hice yo.)
1. *"Antes de crear cualquier aplicación, pensá ideas sumamente creativas y originales según las cosas que me gustan, que permitan hacer cada acción que pide la consigna, pero que no sea una típica."*
2. *"Todo lo que hagamos tiene que ser lo que vimos en clase (Visual Studio Code, GitHub y lo de los PDF)."*

3. *"Vayamos con la 0.2. Me gustaría que el diseño sea tipo pixel art si se puede"*, junto con tres imágenes de referencia. La IA propuso dibujar las flores como grillas de texto recorridas con `map`. Al revisar las capturas pedí corregir la flor, el diseño para celular y un problema de la tipografía.

*(Se agregan más ejemplos en cada versión.)*

**Cómo verifiqué lo que hizo la IA:** probando la app en el navegador, revisando en la consola de Firebase que los datos realmente se guarden y comparando el código con los ejemplos de las guías de la materia.

## 6. Dificultades y soluciones
Ver el detalle en la [bitácora](bitacora.md). Resumen:
- El `.gitignore` original no excluía el `.env`, por lo que las llaves se habrían publicado en GitHub. Se corrigió agregándolo.
- PowerShell bloqueaba `npm run dev` por seguridad. Se resolvió con el comando indicado por el profesor (`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`).
- La fuente pixelada mostraba "flor" como "Aor" (unía la "f" y la "l"). Se desactivaron las ligaduras tipográficas.
- En el celular, 2 tarjetas por fila cortaban los textos. Se rediseñó con tarjetas horizontales.
- Abrir `index.html` con doble clic muestra una página en blanco: una app de Vite se abre con `npm run dev`.
- En la versión publicada el jardín empezó vacío: por el acceso anónimo, cada sitio (local o Vercel) y cada navegador tiene su propio jardín.

## 7. Glosario (para explicar con mis palabras)
- **Componente:** una pieza de la interfaz, como la tarjeta de una planta. Es una función que devuelve lo que se ve.
- **Props:** datos que un componente le pasa a otro. Por ejemplo, la lista le pasa a cada tarjeta su planta.
- **Estado (`useState`):** datos que la app recuerda y que, al cambiar, actualizan la pantalla.
- **`useEffect`:** código que se ejecuta al abrir la app para conectarse con algo externo, como Firebase.
- **`map`:** recorre el array de plantas y arma una tarjeta por cada una. También dibuja las flores: recorre las filas y las letras de cada dibujo y pinta un píxel por letra.
- **`children`:** lo que se escribe entre la etiqueta de apertura y la de cierre de un componente. El componente `Ventana` lo usa para envolver cualquier contenido con el marco retro.
- **Limpieza de un efecto:** función que devuelve `useEffect` para "deshacer" lo que hizo. El aviso la usa para cancelar su temporizador.
- **Serverless:** no administro un servidor propio. Firebase y Vercel se encargan de eso.
- **Variables de entorno (`.env`):** archivo con las llaves de conexión, que queda fuera del repositorio.
- **Reglas de Firestore:** permisos que dicen quién puede leer o escribir cada dato.
