# HM Mobility 🚗

HM Mobility es una landing page profesional y optimizada para SEO enfocada en ofrecer servicios de transporte privado 24/7 en CDMX y otros estados de México. Desarrollada con **Vite + React**, esta aplicación ofrece una experiencia rápida, moderna y responsiva, con integración de formularios de cotización, validación, mapas interactivos y accesibilidad mejorada.

## 🚀 Características

- ⚡️ Renderizado ultrarrápido con **Vite** y **React 19**
- 🌐 **SEO avanzado** con `dr.pogodin/react-helmet` (`^3.0.2`) y marcado estructurado JSON-LD
- 📍 **Google Maps Autocomplete** con `@googlemaps/js-api-loader`
- 📩 **Formulario de cotización** interactivo con validaciones y envío por correo (Nodemailer + Express)
- 📱 Diseño 100% responsivo con **Tailwind CSS 4**
- 🎨 Estética moderna con **glassmorphism** y animaciones suaves
- 📊 Sección de estadísticas y testimonios
- ❓ Preguntas frecuentes (FAQ) dinámicas

---

## 🧱 Tecnologías

- **Frontend:**
  - [Vite](https://vitejs.dev)
  - [React 19](https://react.dev/)
  - [Tailwind CSS 4](https://tailwindcss.com)
  - [Lucide Icons](https://lucide.dev)
  - [`dr.pogodin/react-helmet`](https://www.npmjs.com/package/@dr.pogodin/react-helmet) `^3.0.2`
  - `@googlemaps/js-api-loader` + `PlaceAutocompleteElement`

- **Backend:**
  - [Express](https://expressjs.com)
  - [Nodemailer](https://nodemailer.com)
  - [dotenv](https://www.npmjs.com/package/dotenv)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/hembi12/driver-page.git
cd hm-mobility

2. Instalación de dependencias

Frontend

cd frontend
npm install

Backend

cd backend
npm install

3. Configuración de variables de entorno

Frontend (frontend/.env)

VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY


Backend (backend/.env)

EMAIL_USER=tuemail@gmail.com
EMAIL_PASS=contraseña_de_app

⚠️ Asegúrate de habilitar el acceso de aplicaciones menos seguras o usar contraseña de aplicación si usas Gmail.

⸻

▶️ Ejecución del proyecto

Frontend

npm run dev

Accede en: http://localhost:5173

Backend

node index.js

El backend corre en: http://localhost:3001

⸻

🪪 Licencia

Este proyecto está licenciado bajo la MIT License.

---

¿Quieres que también incluya una sección con capturas de pantalla o un enlace al sitio si lo tienes ya en producción?