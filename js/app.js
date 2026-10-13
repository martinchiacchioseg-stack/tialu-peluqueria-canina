/**
 * ============================================================================
 * TÍA LU Y SU LEGADO - LÓGICA PRINCIPAL (JAVASCRIPT)
 * Peluquería Canina a Domicilio · En memoria de Luciana Barnetche
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initBusinessData();
  initMobileNav();
  initIntersectionObserver();
  initFaqAccordion();
  initCardViewer();
  initBookingForm();
});

/**
 * 1. Inicializa los datos de la marca en base a CONFIG
 */
function initBusinessData() {
  if (typeof CONFIG === "undefined") return;

  // Actualizar enlaces de WhatsApp directos
  const waUrl = `https://wa.me/${CONFIG.brand.whatsappRaw}?text=${encodeURIComponent("¡Hola! Me gustaría hacer una consulta sobre la peluquería canina a domicilio.")}`;
  
  document.querySelectorAll("[data-wa-link]").forEach((el) => {
    el.href = waUrl;
  });

  document.querySelectorAll("[data-wa-text]").forEach((el) => {
    el.textContent = CONFIG.brand.whatsappFormatted;
  });

  // Enlaces de Instagram
  document.querySelectorAll("[data-ig-link]").forEach((el) => {
    el.href = CONFIG.brand.instagramUrl;
  });

  document.querySelectorAll("[data-ig-text]").forEach((el) => {
    el.textContent = CONFIG.brand.instagram;
  });

  // Zona de cobertura
  document.querySelectorAll("[data-coverage-area]").forEach((el) => {
    el.textContent = CONFIG.brand.area;
  });

  // Imagen del Hero
  const heroImg = document.getElementById("hero-main-img");
  if (heroImg && CONFIG.images && CONFIG.images.heroIllustration) {
    heroImg.src = CONFIG.images.heroIllustration;
  }
}

/**
 * 2. Navegación móvil accesible
 */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  if (!toggleBtn || !mobileDrawer) return;

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : toggleBtn.getAttribute("aria-expanded") !== "true";
    toggleBtn.setAttribute("aria-expanded", String(isExpanded));
    mobileDrawer.classList.toggle("is-open", isExpanded);
    document.body.style.overflow = isExpanded ? "hidden" : "";
  };

  toggleBtn.addEventListener("click", () => toggleMenu());

  // Cerrar al hacer clic en un enlace de navegación
  mobileDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Cerrar al presionar la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/**
 * 3. Animaciones sutiles de entrada al hacer scroll
 */
function initIntersectionObserver() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  } else {
    // Fallback para navegadores antiguos sin soporte
    elements.forEach((el) => el.classList.add("is-visible"));
  }
}

/**
 * 4. Acordeón accesible de Preguntas Frecuentes
 */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(btn.getAttribute("aria-controls"));

      // Cerrar otros acordeones abiertos (comportamiento clásico)
      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          const otherAns = document.getElementById(otherBtn.getAttribute("aria-controls"));
          if (otherAns) otherAns.classList.remove("is-open");
        }
      });

      btn.setAttribute("aria-expanded", String(!isExpanded));
      if (answer) {
        answer.classList.toggle("is-open", !isExpanded);
      }
    });
  });
}

/**
 * 5. Visualizador de la Tarjeta de Presentación (Frente ampliado)
 */
function initCardViewer() {
  const cardImg = document.getElementById("commemorative-card-img");
  const btnOpenModal = document.getElementById("btn-open-card-modal");
  const modalOverlay = document.getElementById("card-modal-overlay");
  const modalCloseBtn = document.getElementById("btn-close-card-modal");
  const modalImg = document.getElementById("modal-card-img");

  if (cardImg && CONFIG.images && CONFIG.images.cardFront) {
    cardImg.src = CONFIG.images.cardFront;
    if (modalImg) modalImg.src = CONFIG.images.cardFront;
  }

  if (btnOpenModal && modalOverlay && modalCloseBtn) {
    btnOpenModal.addEventListener("click", () => {
      modalOverlay.classList.add("is-active");
      modalCloseBtn.focus();
    });

    const closeModal = () => modalOverlay.classList.remove("is-active");
    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("is-active")) {
        closeModal();
      }
    });
  }
}

/**
 * 6. Validación y Envío del Formulario de Turnos
 */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;

  // Configurar fecha mínima permitida (a partir de hoy)
  const dateInput = document.getElementById("pref-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // Pre-seleccionar servicio si el usuario hace clic en "Reservar este servicio" en las tarjetas
  document.querySelectorAll("[data-select-service]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const serviceId = btn.getAttribute("data-select-service");
      const serviceSelect = document.getElementById("service-select");
      if (serviceSelect && serviceId) {
        serviceSelect.value = serviceId;
      }
    });
  });

  // Manejo de envío
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      // Si hay error, scrollear suavemente al primer campo inválido
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const formData = collectFormData(form);
    const submitBtn = document.getElementById("btn-submit-booking");
    const successBanner = document.getElementById("form-success-banner");

    // Activar estado de carga en el botón
    if (submitBtn) {
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;
    }

    try {
      // Determinar método de procesamiento según CONFIG
      const mode = CONFIG.booking.submitMode || "whatsapp";

      if (mode === "google_sheets" && CONFIG.booking.googleSheetsWebhookUrl) {
        await sendToGoogleSheets(formData);
      } else if (mode === "api" && CONFIG.booking.apiEndpointUrl) {
        await sendToCustomApi(formData);
      }

      // Generar mensaje y abrir WhatsApp
      const waUrl = buildWhatsAppUrl(formData);

      // Mostrar banner de confirmación amable
      if (successBanner) {
        successBanner.classList.add("is-visible");
        successBanner.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Si el modo es whatsapp o si está configurado para abrir WhatsApp también tras guardar en backend
      if (mode === "whatsapp" || CONFIG.booking.alsoOpenWhatsAppOnBackendSuccess) {
        setTimeout(() => {
          window.open(waUrl, "_blank", "noopener,noreferrer");
        }, 600);
      }

      // Reiniciar formulario amablemente
      form.reset();
      clearValidationStyles(form);
    } catch (err) {
      console.error("Error al procesar la reserva:", err);
      // Ante cualquier fallo del backend, fallback infalible a WhatsApp
      alert("Hubo un pequeño retraso conectando al servidor, pero no te preocupes: te redirigimos directamente a WhatsApp para no perder tu turno.");
      const waUrl = buildWhatsAppUrl(formData);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;
      }
    }
  });

  // Limpiar error al escribir
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) {
        setInputError(input, false);
      }
    });
  });
}

/**
 * Validador en cliente con mensajes cálidos en español rioplatense
 */
function validateForm(form) {
  let isValid = true;

  // 1. Nombre del tutor/a
  const clientName = form.querySelector("#client-name");
  if (!clientName.value.trim() || clientName.value.trim().length < 3) {
    setInputError(clientName, true, "Por favor decinos tu nombre y apellido completo.");
    isValid = false;
  } else {
    setInputError(clientName, false);
  }

  // 2. Teléfono / WhatsApp
  const clientPhone = form.querySelector("#client-phone");
  const phonePattern = /^[\d\s\+\-\(\)]{6,20}$/;
  if (!clientPhone.value.trim() || !phonePattern.test(clientPhone.value.trim())) {
    setInputError(clientPhone, true, "Ingresá un número de teléfono o WhatsApp válido.");
    isValid = false;
  } else {
    setInputError(clientPhone, false);
  }

  // 3. Dirección y zona
  const clientAddress = form.querySelector("#client-address");
  if (!clientAddress.value.trim() || clientAddress.value.trim().length < 4) {
    setInputError(clientAddress, true, "Ingresá tu dirección y barrio/zona para que sepamos a dónde ir.");
    isValid = false;
  } else {
    setInputError(clientAddress, false);
  }

  // 4. Nombre de la mascota
  const petName = form.querySelector("#pet-name");
  if (!petName.value.trim()) {
    setInputError(petName, true, "¿Cómo se llama tu peludito?");
    isValid = false;
  } else {
    setInputError(petName, false);
  }

  // 5. Raza
  const petBreed = form.querySelector("#pet-breed");
  if (!petBreed.value.trim()) {
    setInputError(petBreed, true, "Contanos qué raza o cruza es.");
    isValid = false;
  } else {
    setInputError(petBreed, false);
  }

  // 6. Tamaño (Radio)
  const petSize = form.querySelector("input[name='petSize']:checked");
  const sizeContainer = form.querySelector("#size-selection-group");
  const sizeErrorMsg = document.getElementById("pet-size-error");
  if (!petSize) {
    if (sizeErrorMsg) {
      sizeErrorMsg.textContent = "Elegí el tamaño aproximado de tu mascota.";
      sizeErrorMsg.classList.add("is-visible");
    }
    isValid = false;
  } else {
    if (sizeErrorMsg) sizeErrorMsg.classList.remove("is-visible");
  }

  // 7. Servicio
  const serviceSelect = form.querySelector("#service-select");
  if (!serviceSelect.value) {
    setInputError(serviceSelect, true, "Seleccioná el servicio que necesita.");
    isValid = false;
  } else {
    setInputError(serviceSelect, false);
  }

  // 8. Fecha preferida
  const prefDate = form.querySelector("#pref-date");
  if (!prefDate.value) {
    setInputError(prefDate, true, "Elegí una fecha estimada para el turno.");
    isValid = false;
  } else {
    setInputError(prefDate, false);
  }

  // 9. Franja horaria (Radio)
  const timeShift = form.querySelector("input[name='timeShift']:checked");
  const shiftErrorMsg = document.getElementById("time-shift-error");
  if (!timeShift) {
    if (shiftErrorMsg) {
      shiftErrorMsg.textContent = "Elegí si preferís turno por la mañana o por la tarde.";
      shiftErrorMsg.classList.add("is-visible");
    }
    isValid = false;
  } else {
    if (shiftErrorMsg) shiftErrorMsg.classList.remove("is-visible");
  }

  return isValid;
}

function setInputError(input, isError, message = "") {
  const errorEl = document.getElementById(`${input.id}-error`);
  if (isError) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("is-visible");
    }
  } else {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("is-visible");
    }
  }
}

function clearValidationStyles(form) {
  form.querySelectorAll(".is-invalid").forEach((el) => {
    el.classList.remove("is-invalid");
    el.removeAttribute("aria-invalid");
  });
  form.querySelectorAll(".field-error-message").forEach((el) => {
    el.classList.remove("is-visible");
    el.textContent = "";
  });
}

/**
 * Recolecta los datos limpios del formulario
 */
function collectFormData(form) {
  const sizeRadio = form.querySelector("input[name='petSize']:checked");
  const shiftRadio = form.querySelector("input[name='timeShift']:checked");
  const serviceSelect = form.querySelector("#service-select");

  // Obtener texto legible del servicio
  const serviceOption = serviceSelect.options[serviceSelect.selectedIndex];
  const serviceName = serviceOption ? serviceOption.text : serviceSelect.value;

  // Formatear fecha a DD/MM/AAAA si viene en YYYY-MM-DD
  const rawDate = form.querySelector("#pref-date").value;
  let formattedDate = rawDate;
  if (rawDate && rawDate.includes("-")) {
    const parts = rawDate.split("-");
    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return {
    clientName: form.querySelector("#client-name").value.trim(),
    clientPhone: form.querySelector("#client-phone").value.trim(),
    clientAddress: form.querySelector("#client-address").value.trim(),
    petName: form.querySelector("#pet-name").value.trim(),
    petBreed: form.querySelector("#pet-breed").value.trim(),
    petSize: sizeRadio ? sizeRadio.value : "No especificado",
    serviceId: serviceSelect.value,
    serviceName: serviceName,
    prefDate: formattedDate,
    timeShift: shiftRadio ? shiftRadio.value : "Cualquiera",
    notes: form.querySelector("#notes").value.trim() || "Sin observaciones especiales.",
    submittedAt: new Date().toISOString()
  };
}

/**
 * Arma la URL oficial de WhatsApp con mensaje estructurado y amigable
 */
function buildWhatsAppUrl(data) {
  const sizeLabels = {
    chico: "Chico (hasta 10 kg)",
    mediano: "Mediano (10 a 25 kg)",
    grande: "Grande (+ de 25 kg)"
  };

  const shiftLabels = {
    manana: "Mañana (09:00 a 13:00 hs)",
    tarde: "Tarde (14:00 a 19:00 hs)"
  };

  const readableSize = sizeLabels[data.petSize] || data.petSize;
  const readableShift = shiftLabels[data.timeShift] || data.timeShift;

  const messageLines = [
    `🐾 *¡Hola! Quiero reservar un turno en Tía Lu y su legado* 🐾`,
    ``,
    `👤 *Tutor/a:* ${data.clientName}`,
    `📱 *WhatsApp / Tel:* ${data.clientPhone}`,
    `📍 *Dirección y zona:* ${data.clientAddress}`,
    ``,
    `🐶 *Mascota:* ${data.petName}`,
    `🏷️ *Raza / Cruza:* ${data.petBreed}`,
    `⚖️ *Tamaño:* ${readableSize}`,
    `✨ *Servicio solicitado:* ${data.serviceName}`,
    ``,
    `📅 *Fecha deseada:* ${data.prefDate}`,
    `⏰ *Franja horaria:* ${readableShift}`,
    `📝 *Observaciones:* ${data.notes}`,
    ``,
    `🚐🛁 _¡Mimos garantizados en la puerta de nuestro hogar!_`
  ];

  const fullMessage = messageLines.join("\n");
  const phone = (CONFIG.brand && CONFIG.brand.whatsappRaw) || "5492241496663";

  return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Conector opcional a Google Sheets mediante Google Apps Script Web App
 */
async function sendToGoogleSheets(data) {
  const url = CONFIG.booking.googleSheetsWebhookUrl;
  if (!url) return;

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors", // Requerido para llamadas directas a Apps Script desde el browser
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response;
}

/**
 * Conector opcional a una API REST propia
 */
async function sendToCustomApi(data) {
  const url = CONFIG.booking.apiEndpointUrl;
  if (!url) return;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error en el servidor: ${response.status}`);
  }

  return await response.json();
}
