/**
 * ============================================================================
 * TÍA LU Y SU LEGADO - ARCHIVO DE CONFIGURACIÓN PRINCIPAL
 * ============================================================================
 * Desde este archivo podés modificar fácilmente todos los datos del negocio,
 * números de contacto, redes sociales, servicios y la forma en que se envían
 * los turnos (WhatsApp, Google Sheets o una API propia).
 */

const CONFIG = {
  // --------------------------------------------------------------------------
  // 1. INFORMACIÓN DE LA MARCA Y CONTACTO
  // --------------------------------------------------------------------------
  brand: {
    name: "Tía Lu y su legado",
    subtitle: "Peluquería canina a domicilio",
    tribute: "En memoria de Luciana Barnetche",
    slogan: "¡Mimos garantizados en la puerta de tu hogar!",
    area: "Chascomús y zonas aledañas (Buenos Aires)", // Podés personalizar tu zona aquí
    hours: "Lunes a Sábados de 9:00 a 19:00 hs",
    
    // WhatsApp: número en formato internacional sin espacios ni signos + (para enlace wa.me)
    // Ejemplo para Argentina (+54 9 2241 496663 -> 5492241496663)
    whatsappRaw: "5492241496663",
    whatsappFormatted: "2241 496663",
    
    // Redes Sociales
    instagram: "@fiiore.reey",
    instagramUrl: "https://www.instagram.com/fiiore.reey",
  },

  // --------------------------------------------------------------------------
  // 2. IMÁGENES Y RECURSOS
  // --------------------------------------------------------------------------
  images: {
    // Podés cambiar esta ruta si tenés una nueva ilustración en PNG, SVG o JPG de alta resolución
    heroIllustration: "assets/ilustracion-cachorro.jpg",
    cardFront: "assets/tarjeta-frente.jpg",
    cardBack: "assets/tarjeta-dorso.jpg",
  },

  // --------------------------------------------------------------------------
  // 3. LISTADO DE SERVICIOS
  // --------------------------------------------------------------------------
  services: [
    {
      id: "bano",
      name: "Baño con amor y productos de calidad",
      shortName: "Baño completo",
      badge: "El favorito",
      description: "Shampoo hipoalergénico suave, secado cuidadoso a temperatura templada y cepillado que elimina pelo muerto y previene nudos.",
      details: ["Productos hipoalergénicos", "Secado templado sin estrés", "Cepillado desenredante", "Perfume suave opcional"]
    },
    {
      id: "corte-higienico",
      name: "Corte higiénico",
      shortName: "Corte higiénico",
      badge: "Salud & confort",
      description: "Despeje delicado de almohadillas plantares, zona genital y perianal, además del contorno de ojos para mayor higiene y bienestar.",
      details: ["Almohadillas limpias", "Despeje perianal", "Área de lagrimales", "Tijeras y máquinas silenciosas"]
    },
    {
      id: "corte-unas",
      name: "Corte de uñas",
      shortName: "Corte de uñas",
      badge: "Cuidado postural",
      description: "Corte seguro con alicates profesionales y limado suave para que tu perrito camine cómodo sin resbalar ni lastimarse.",
      details: ["Alicates profesionales", "Limado suave", "Evita deformaciones", "Paciencia y premios"]
    },
    {
      id: "combo-completo",
      name: "Combo Completo con Mimos",
      shortName: "Combo Completo",
      badge: "Súper recomendado",
      description: "El servicio integral: baño relajante, corte higiénico, corte y limado de uñas, limpieza de oídos y un moño o bandana de regalo.",
      details: ["Baño + corte higiénico + uñas", "Limpieza preventiva de orejitas", "Cepillado exhaustivo", "Mimos y regalito sorpresa"]
    }
  ],

  // --------------------------------------------------------------------------
  // 4. CONFIGURACIÓN DEL FORMULARIO DE RESERVAS
  // --------------------------------------------------------------------------
  booking: {
    /**
     * MODO DE ENVÍO ('submitMode'):
     * - 'whatsapp' : Abre WhatsApp Web / App con un mensaje redactado con todos los datos.
     * - 'google_sheets' : Envía los datos por POST a un Google Apps Script (y luego puede abrir WhatsApp).
     * - 'api' : Envía un JSON por POST al endpoint que especifiques.
     */
    submitMode: "whatsapp",

    // Si usás 'google_sheets', pegá aquí la URL de tu Web App de Google Apps Script:
    googleSheetsWebhookUrl: "",

    // Si usás 'api', pegá aquí la URL de tu backend:
    apiEndpointUrl: "",

    // Si está en 'true', tras registrar en Google Sheets o API también abre WhatsApp para confirmación inmediata:
    alsoOpenWhatsAppOnBackendSuccess: true,

    // Franjas horarias disponibles
    shifts: [
      { id: "manana", label: "Mañana (09:00 a 13:00 hs)" },
      { id: "tarde", label: "Tarde (14:00 a 19:00 hs)" }
    ],

    // Tamaños de mascota
    sizes: [
      { id: "chico", label: "Chico (hasta 10 kg)" },
      { id: "mediano", label: "Mediano (10 a 25 kg)" },
      { id: "grande", label: "Grande (+ de 25 kg)" }
    ]
  }
};

// Congelar el objeto para evitar modificaciones accidentales en tiempo de ejecución
if (typeof Object.freeze === "function") {
  Object.freeze(CONFIG);
}
