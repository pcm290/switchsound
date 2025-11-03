<p align="center">
  <img src="src/assets/favicon.png" alt="SwitchSound icon" width="120"/>
</p>

<h1 align="center">SwitchSound</h1>

## Descripción

**SwitchSound** es una aplicación web interactiva que permite comparar y simular el sonido de distintos switches para teclados mecánicos. Diseñada como proyecto personal, combina una experiencia visual atractiva con sonidos para ayudar a los usuarios a descubrir qué sensación y perfil sonoro prefieren antes de elegir su próximo switch.

---

## Deploy

Este proyecto está desplegado en **Vercel**, asociado a un subdominio personalizado del autor del mismo.

🔗 **Proyecto desplegado:** [Aquí](https://switchsound.pablocastri.dev)

---

## Tecnologías

| Categoría | Tecnologías |
|----------|-------------|
| Frontend | React, JavaScript, TailwindCSS, PostCSS |
| Backend / DB | Supabase |
| Multimedia | Sonidos e imágenes locales|
| Build | Parcel 2 |
| Automatización | GitHub Actions |
| Despliegue | Vercel |

---

## Características principales

- Comparación de sonidos de múltiples switches  
- Vista interactiva estilo teclado  
- Cambio dinámico de tema por color  
- Información técnica básica de cada switch  
- Assets locales optimizados (sin dependencias externas)  
- Diseño responsive  
- Rendimiento fluido en navegadores modernos  

---

## Instalación y ejecución local

```bash
git clone https://github.com/pcm290/switchsound.git
cd switchsound
npm install
npm run start
```

---

## Variables de entorno

> Estas claves son públicas y de solo lectura. Se incluyen para facilitar la ejecución local del proyecto sin configuración adicional.

Crea un archivo `.env` basado en `.env.example` con los valores de las siguientes variables incluidos:

```env
REACT_APP_SUPABASE_URL= valor
REACT_APP_SUPABASE_ANON_KEY= valor
```

---

## Autor

**Pablo Castrillón Mora**  
Diseñador y desarrollador de **SwitchSound**

- Contacto: [pablocastrillonmora@gmail.com](mailto:pablocastrillonmora@gmail.com)
- Linkedin: [Linkedin](https://linkedin.com/in/pablocastri)

