# 🌐 Proyecto Azure Cloud: HTML5 + Vanilla CSS + TypeScript

Aplicación web moderna desarrollada en **HTML5**, **Vanilla CSS** (sin frameworks externos) y **TypeScript**, optimizada para desplegarse en **Microsoft Azure** (Azure Static Web Apps o Azure App Service).

---

## 📁 Estructura del Proyecto

```text
proyecto_prueba_azure/
├── dist/                  # Artefactos compilados listos para producción (HTML, CSS y JS)
├── src/
│   ├── main.ts            # Lógica en TypeScript (reloj UTC, cálculo de latencia, checklist, logs)
│   └── style.css          # Estilos modernos Vanilla CSS (Glassmorphism, Dark Theme, animaciones)
├── index.html             # Estructura semántica HTML5
├── package.json           # Dependencias (Vite, TypeScript) y scripts de compilación
├── tsconfig.json          # Configuración estricta de TypeScript
├── vite.config.ts         # Configuración del empaquetador Vite (rutas relativas para cloud)
└── README.md              # Guía didáctica para exposición y despliegue
```

---

## 💻 1. Comandos para Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en vivo (Hot Module Reload)
npm run dev

# Compilar proyecto para producción (genera la carpeta dist/)
npm run build

# Previsualizar la versión de producción localmente
npm run preview
```

---

## 🎓 2. Guía Paso a Paso para Exponer y Desplegar en Azure

Para tu clase, la opción más moderna, recomendada y 100% gratuita para aplicaciones HTML + CSS + TypeScript es **Azure Static Web Apps**. 

### 🌟 Opción Recomendada: Azure Static Web Apps (Desde el Portal Web)
Esta es la forma más visual e ideal para explicar en proyector o pantalla compartida:

#### **Paso 1: Subir el proyecto a GitHub**
1. Inicializa Git en la terminal del proyecto:
   ```bash
   git init
   git add .
   git commit -m "feat: proyecto web en HTML, CSS y TypeScript"
   ```
2. Crea un repositorio en tu cuenta de GitHub (ejemplo: `mi-proyecto-azure`).
3. Vincula y sube el código:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/mi-proyecto-azure.git
   git push -u origin main
   ```

#### **Paso 2: Crear el recurso en Microsoft Azure**
1. Entra a [portal.azure.com](https://portal.azure.com) con tu cuenta de estudiante o cuenta Azure.
2. En la barra de búsqueda superior, escribe **Static Web Apps** y selecciónalo.
3. Haz clic en **+ Crear** (**+ Create**).
4. Completa el formulario:
   - **Suscripción**: Tu suscripción de Azure (ej. *Azure for Students*).
   - **Grupo de recursos**: Crear nuevo o seleccionar uno existente (ej. `rg-clase-web`).
   - **Nombre**: `proyecto-azure-ts` (o el nombre que prefieras).
   - **Plan de hospedaje**: **Gratis** (*Free*).
   - **Región**: `East US 2` (o la más cercana).
5. En la sección **Origen de implementación** (*Deployment details*):
   - Selecciona **GitHub**.
   - Haz clic en **Iniciar sesión con GitHub** y autoriza a Azure.
   - Selecciona tu **Organización**, **Repositorio** y rama **main**.
6. En los **Vales preestablecidos de compilación** (*Build Details*):
   - **Vales preestablecidos de compilación**: Selecciona **Personalizado** (*Custom*).
   - **Ubicación de la aplicación** (*App location*): `/`
   - **Ubicación de la API** (*Api location*): *(dejar en blanco)*
   - **Ubicación de salida** (*Output location*): `dist`
7. Haz clic en **Revisar y crear** -> **Crear**.

#### **Paso 3: Ver el despliegue automático (CI/CD en GitHub Actions)**
- Azure creará automáticamente un flujo de trabajo de GitHub Actions (`.github/workflows/...`).
- En unos 60 a 90 segundos, compilará el TypeScript (`npm run build`) y publicará los archivos en la CDN global de Azure.
- En la página principal de tu recurso en Azure, copia la **URL del sitio web** (ejemplo: `https://white-sea-xxxxxx.azurestaticapps.net`) y ábrela en el navegador.

---

### ⚡ Opción Alternativa: Despliegue Rápido por Terminal con Azure CLI

Si tu profesor pide hacerlo directamente desde la consola:

1. **Compilar el proyecto:**
   ```bash
   npm run build
   ```
2. **Desplegar directamente con Azure Static Web Apps CLI (no requiere configurar GitHub previamente):**
   ```bash
   npx -y @azure/static-web-apps-cli deploy ./dist --app-name proyecto-clase-ts
   ```
   *(Te pedirá iniciar sesión con tu cuenta de Azure en el navegador y subirá la carpeta `dist/` al instante).*

---

## 🗣️ Guion Sugerido para tu Exposición en Clase

1. **Introducción:**
   > *"Profesor y compañeros, hoy les presento una aplicación web construida con HTML5 semántico, estilos nativos en Vanilla CSS con diseño Glassmorphism y lógica en TypeScript estricto, empaquetada mediante Vite."*
2. **Por qué TypeScript y no Python para esta arquitectura:**
   > *"A diferencia de una arquitectura basada en servidor monolítico (como Flask o Django), un frontend moderno en TypeScript se precompila en JavaScript estático ultraligero (<35 KB), lo que permite servirlo a través de redes CDN globales con latencia de milisegundos, alta disponibilidad y costo cero en Azure Static Web Apps."*
3. **Flujo CI/CD:**
   > *"Al conectar el repositorio con Azure Static Web Apps, cada cambio que enviamos a la rama main activa una GitHub Action que compila el TypeScript de forma automatizada y lo despliega a producción con certificado SSL HTTPS incluido de manera transparente."*
4. **Demostración en Vivo:**
   > *Mostrar la aplicación corriendo en la URL de Azure, interactuar con el botón de prueba de latencia, el reloj UTC y el checklist interactivo.*
