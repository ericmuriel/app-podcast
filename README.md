## 🎧 **Podcaster App**

**Podcaster App** es una aplicación desarrollada en **React** con **TypeScript** que permite explorar, visualizar y filtrar podcasts, además de ver la lista de episodios y detalles específicos de cada uno. La app incluye un **loader** global para navegación entre vistas, cacheo de datos y pruebas unitarias con **Jest** y **React Testing Library**.

---

### 🚀 **Características Principales**

1. **Exploración de Podcasts**
   - Lista de podcasts populares obtenida desde [iTunes API](https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json).
   - Permite filtrar por nombre o autor.

2. **Visualización de Episodios**
   - Detalle de cada podcast con una lista de episodios.
   - Se muestra un aviso si el número de episodios supera el límite (máximo 50).

3. **Caché Local**
   - Los datos se almacenan temporalmente en `localStorage` con un tiempo de expiración (1 día) para optimizar el rendimiento.

4. **Loader Global**
   - Indicador visual en la esquina superior derecha que aparece durante la navegación entre vistas.

5. **Pruebas Unitarias**
   - Pruebas desarrolladas con **Jest** y **React Testing Library**.
   - Identificación de elementos usando `data-id` para simplificar los tests.

---

### 🛠️ **Tecnologías Utilizadas**

- **Frontend**: React, TypeScript, SCSS
- **Routing**: React Router v7
- **Bundler**: Vite
- **Testing**: Jest, React Testing Library
- **Estilo**: SCSS Modules
- **API**: iTunes API
- **Context Management**: React Context API
- **Cache**: localStorage

---

### 📦 **Instalación**

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/ericmuriel/podcaster-app.git
   cd podcaster-app
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construye la aplicación para producción**:
   ```bash
   npm run build
   ```

5. **Previsualiza el build**:
   ```bash
   npm run preview
   ```

---

### 🚦 **Estructura del Proyecto**

```plaintext
src/
│
├── components/
│   ├── PrincipalView/       # Vista principal con lista de podcasts, estilos y tests
│   ├── EpisodeList/         # Vista de episodios de un podcast, estilos y tests
│   ├── PodcastView/         # Vista de detalles de un episodio, estilos y tests
│   ├── Loader/              # Indicador de carga global, estilos y tests
│   └── LateralPodcastInfoCard/ # Tarjeta lateral de información, estilos y tests
│
├── hooks/
│   ├── tests/               # Carpeta de los hook tests
│   ├── usePodcast.ts        # Hook para obtener datos de un podcast
│   └── usePodcasts.ts       # Hook para obtener lista de podcasts
│
├── context/
│   ├── tests/               # Carpeta del test
│   └── LoaderContext.tsx    # Contexto global para loader
│
├── services/
│   ├── tests/               # Carpeta de los tests
│   ├── PodcastService.ts    # Servicio para llamadas a la API
│   └── CacheService.ts      # Servicio para el manejo del caché local
│
│
└── index.tsx                # Entry point principal
```

---

### ✅ **Pruebas**

1. **Runear todas las pruebas**:
   ```bash
   npm run test
   ```

2. **Runear un test específico**:
   ```bash
   npm run test src/components/EpisodeList/EpisodeList.test.tsx
   ```

3. **Cobertura de pruebas**:
   ```bash
   npm run test -- --coverage
   ```

---

### 🌐 **Uso de la API**

La aplicación consume la API pública de iTunes para obtener datos de podcasts y episodios:

- **Top Podcasts**:  
   ```bash
   GET https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json
   ```

- **Detalles de Podcast**:  
   ```bash
   GET https://itunes.apple.com/lookup?id={podcastId}
   ```

- **Episodios del Podcast**:  
   ```bash
   GET https://itunes.apple.com/lookup?id={podcastId}&entity=podcastEpisode
   ```

---

### 🔧 **Problemas Conocidos**

- **Límite de Episodios**: La API de iTunes devuelve un máximo de 50 episodios por podcast.
   - *Solución*: Se muestra un mensaje de advertencia en la consola.

---

### 🧭 **Pruebas Automatizadas**

Las pruebas se desarrollaron utilizando **Jest** y **React Testing Library**. Para simplificar las pruebas, se utilizan atributos `data-id` en los componentes:

Ejemplo de prueba con `data-id`:

```tsx
const image = screen.getByTestId("podcast-card-image");
expect(image).toHaveAttribute("src", "http://example.com/artwork.jpg");
```

---

### 👨‍💻 **Autor**

**Eric Muriel**  
[LinkedIn](https://linkedin.com/ericmuriel) | [GitHub](https://github.com/yourusername)

---
