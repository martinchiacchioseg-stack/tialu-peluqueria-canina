# 🐾 Tía Lu y su legado · Peluquería Canina a Domicilio

Landing page profesional, responsive (mobile-first), rápida y accesible para **"Tía Lu y su legado"**, peluquería canina a domicilio en homenaje a **Luciana Barnetche**.

🌐 **Sitio en vivo (Vercel):** [https://tialu-peluqueria-canina.vercel.app](https://tialu-peluqueria-canina.vercel.app)  
🌐 **Mirror alternativo (GitHub Pages):** [https://martinchiacchioseg-stack.github.io/tialu-peluqueria-canina/](https://martinchiacchioseg-stack.github.io/tialu-peluqueria-canina/)  
📦 **Repositorio en GitHub:** [https://github.com/martinchiacchioseg-stack/tialu-peluqueria-canina](https://github.com/martinchiacchioseg-stack/tialu-peluqueria-canina)

---

## 🎨 Identidad Visual y Concepto

- **Concepto:** Marca tierna, cálida y de máxima confianza. Homenaje a Luciana Barnetche, "la tía de nuestras mascotas".
- **Tono de voz:** Cercano y afectuoso, en español rioplatense con voseo (*"Reservás tu turno"*, *"Vamos a tu casa"*, *"Escribinos"*).
- **Slogan:** *"¡Mimos garantizados en la puerta de tu hogar!"*
- **Paleta Cromática:**
  - Fondo blanco hueso / crema suave: `#FBF7F4`
  - Marrón cálido para títulos y acentos: `#8B5A3C` (y `#5C3A24` para alto contraste WCAG AAA)
  - Durazno / rosa empolvado para secciones y botones: `#E8C9B8`
  - Textos secundarios legibles: `#6B5C54`
- **Tipografía:**
  - Títulos: **Fraunces** (Serif cálida, suave y redondeada).
  - Textos y cuerpo: **Nunito** (Sans humanista, amigable y sumamente legible).
- **Decoración:** Huellitas orgánicas y ramas botánicas de acuarela de baja opacidad, esquinas redondeadas y sombras sutiles.

---

## 📁 Estructura del Proyecto

```text
tialu-peluqueria-canina/
├── index.html                   # Documento principal semántico, accesible y optimizado para SEO
├── css/
│   └── styles.css               # Estilos mobile-first con variables CSS y soporte accesibilidad
├── js/
│   ├── config.js                # CONFIGURACIÓN CENTRALIZADA: teléfonos, redes, servicios y modo de envío
│   └── app.js                   # Validaciones amables, generación de mensajes de WhatsApp y lógica interactiva
├── assets/
│   ├── favicon.svg              # Favicon vectorial (huella con corazón)
│   ├── paw-pattern.svg          # Fondo sutil con huellitas y hojas botánicas
│   ├── botanical-leaves.svg     # Divisores y detalles decorativos
│   ├── ilustracion-cachorro.jpg # Ilustración principal recortada del arte original
│   ├── tarjeta-frente.jpg       # Foto del frente de la tarjeta original
│   └── tarjeta-dorso.jpg        # Foto del dorso de la tarjeta con el texto de homenaje
└── README.md                    # Documentación y guía de integración paso a paso
```

---

## 🚀 Cómo probar el proyecto localmente

1. **Opción directa:** Hacé doble clic en `index.html` para abrirlo en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
2. **Opción con servidor local (recomendado):**
   - Con Python:
     ```bash
     python -m http.server 8080
     ```
     Luego abrí en tu navegador: `http://localhost:8080`
   - O con Node.js / npx:
     ```bash
     npx serve
     ```

---

## 🛠️ Cómo personalizar el sitio

### 1. Cambiar teléfonos, redes sociales, servicios o zona de cobertura
Todo está centralizado en el archivo `js/config.js`. Solo tenés que editar las primeras líneas:

```javascript
// js/config.js
const CONFIG = {
  brand: {
    name: "Tía Lu y su legado",
    subtitle: "Peluquería canina a domicilio",
    slogan: "¡Mimos garantizados en la puerta de tu hogar!",
    area: "Chascomús y zonas aledañas (Buenos Aires)", // <-- Editá tu zona aquí
    whatsappRaw: "5492241496663",                      // <-- Número para el link wa.me
    whatsappFormatted: "2241 496663",                  // <-- Número visible
    instagram: "@fiiore.reey",                         // <-- Tu usuario de Instagram
    instagramUrl: "https://www.instagram.com/fiiore.reey",
  },
  // ...
};
```

### 2. Cambiar la ilustración principal o fotos
- Guardá tu ilustración final (en formato `.png`, `.svg` o `.jpg`) dentro de la carpeta `assets/`, por ejemplo con el nombre `mi-ilustracion.png`.
- En `js/config.js`, actualizá la propiedad:
  ```javascript
  images: {
    heroIllustration: "assets/mi-ilustracion.png",
    // ...
  }
  ```

---

## 📋 Conexión del Formulario a Sistemas de Turnos

Por defecto, el formulario funciona de forma **100% autónoma sin requerir servidores**: al presionar "Solicitar turno", valida los datos y abre una conversación de WhatsApp con un mensaje estructurado y prolijo:

```text
🐾 *¡Hola! Quiero reservar un turno en Tía Lu y su legado* 🐾

👤 *Tutor/a:* Juan Pérez
📱 *WhatsApp / Tel:* 2241 123456
📍 *Dirección y zona:* Mitre 450, Chascomús

🐶 *Mascota:* Jagger
🏷️ *Raza / Cruza:* Caniche
⚖️ *Tamaño:* Chico (hasta 10 kg)
✨ *Servicio solicitado:* Baño con amor y productos de calidad

📅 *Fecha deseada:* 18/10/2026
⏰ *Franja horaria:* Mañana (09:00 a 13:00 hs)
📝 *Observaciones:* Es viejito, necesita secado a temperatura tibia y con pausas.

🚐🛁 _¡Mimos garantizados en la puerta de nuestro hogar!_
```

---

### Opción A: Conectar a Google Sheets (Hojas de Cálculo de Google)

Podés registrar cada turno automáticamente en una planilla de Google Sheets y, al mismo tiempo, abrir WhatsApp:

#### Paso 1: Crear la planilla
1. Creá una nueva hoja en [Google Sheets](https://sheets.google.com).
2. En la fila 1 colocá los siguientes encabezados:
   - `A1`: Fecha Solicitud
   - `B1`: Nombre Tutor
   - `C1`: Teléfono
   - `D1`: Dirección
   - `E1`: Nombre Mascota
   - `F1`: Raza
   - `G1`: Tamaño
   - `H1`: Servicio
   - `I1`: Fecha Turno
   - `J1`: Franja Horaria
   - `K1`: Observaciones

#### Paso 2: Crear el Webhook con Google Apps Script
1. En tu planilla, andá al menú **Extensiones** > **Apps Script**.
2. Pegá el siguiente código en el editor:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.clientName,
      data.clientPhone,
      data.clientAddress,
      data.petName,
      data.petBreed,
      data.petSize,
      data.serviceName,
      data.prefDate,
      data.timeShift,
      data.notes
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Hacé clic en **Implementar** > **Nueva implementación**.
4. En tipo seleccioná **Aplicación web**.
5. En **Quién tiene acceso**, seleccioná **Cualquier usuario** (*Anyone*).
6. Copiá la URL de la aplicación web generada (termina en `/exec`).

#### Paso 3: Pegar la URL en `js/config.js`
En tu archivo `js/config.js`, cambiá las líneas de reserva a:

```javascript
booking: {
  submitMode: "google_sheets",
  googleSheetsWebhookUrl: "https://script.google.com/macros/s/TU_SCRIPT_ID/exec",
  alsoOpenWhatsAppOnBackendSuccess: true, // Registra en la planilla y además abre WhatsApp
  // ...
}
```
¡Listo! Cada vez que alguien complete el formulario se guardará en tu planilla y se abrirá el WhatsApp para confirmar.

---

### Opción B: Conectar a un Backend propio (Node.js / Express / Python / PHP)

Si disponés de un endpoint REST:
```javascript
booking: {
  submitMode: "api",
  apiEndpointUrl: "https://tu-dominio.com/api/turnos",
  alsoOpenWhatsAppOnBackendSuccess: false,
}
```
El formulario enviará una petición HTTP `POST` con cabecera `Content-Type: application/json` conteniendo el objeto con todos los datos saneados.

---

## 🌐 Cómo publicar el sitio gratis en Internet

Podés subir la carpeta a cualquiera de estas plataformas gratuitas en menos de 2 minutos:
- **Netlify:** Arrastrá la carpeta `tialu-peluqueria-canina` directamente en [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel:** Subilo mediante GitHub o el comando `vercel`.
- **GitHub Pages:** Creá un repositorio en GitHub, subí estos archivos y en *Settings > Pages* seleccioná la rama `main`.

---

## ♿ Accesibilidad y Rendimiento

- **Sin dependencias pesadas:** HTML5 semántico, CSS moderno y JS nativo. Pesa menos de 200 KB en total y carga en milisegundos.
- **Accesibilidad (WCAG AA / AAA):** Contraste tipográfico verificado, soporte completo de navegación por teclado con `:focus-visible`, atributos `aria-expanded`, `aria-describedby` en formularios y compatibilidad con `prefers-reduced-motion`.
- **SEO & Datos Estructurados:** Incluye etiquetas Open Graph, Twitter Cards y microdatos JSON-LD (`schema.org/LocalBusiness`) para indexación en Google y mapas.
