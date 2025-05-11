# Dungeons & Databases – Frontend
Frontend de una aplicación web para gestionar campañas de Dungeons & Dragons, permitiendo a los usuarios crear, visualizar y administrar personajes, objetos y progresos de campaña de forma intuitiva y colaborativa.

## Descripción
Este proyecto forma parte de una plataforma más amplia llamada Dungeons & Databases, diseñada para facilitar la gestión de partidas de rol. El frontend está construido con React y Vite, y utiliza Tailwind CSS para estilos rápidos y consistentes. Su objetivo es ofrecer una experiencia moderna y accesible para jugadores y másters.

## Tecnologías utilizadas
React: Biblioteca principal para la construcción de interfaces de usuario.

Vite: Herramienta de desarrollo rápida para proyectos frontend modernos.

Tailwind CSS: Framework de utilidades para estilos rápidos y responsivos.

ESLint & Prettier: Herramientas para mantener un código limpio y consistente.

PostCSS: Procesador de CSS para transformar estilos con plugins.

## Instalación y ejecución local
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/Igoruve/dungeons-and-databases-frontend.git
cd dungeons-and-databases-frontend
Instala las dependencias:

bash
Copiar
Editar
npm install
Inicia el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
La aplicación estará disponible en http://localhost:5173.

## Estructura del proyecto
bash
Copiar
Editar
├── src/
│   ├── components/       # Componentes reutilizables de React
│   ├── pages/            # Páginas principales de la aplicación
│   ├── assets/           # Imágenes y recursos estáticos
│   └── App.jsx           # Componente raíz de la aplicación
├── index.html            # Archivo HTML principal
├── tailwind.config.js    # Configuración de Tailwind CSS
├── vite.config.js        # Configuración de Vite
└── package.json          # Dependencias y scripts del proyecto

## Scripts disponibles
npm run dev: Inicia el servidor de desarrollo.

npm run build: Genera una versión optimizada para producción.

npm run lint: Ejecuta ESLint para analizar el código.

npm run format: Aplica Prettier para formatear el código.

## Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar alguna funcionalidad, corregir errores o agregar nuevas características, por favor, abre una issue o envía un pull request.
