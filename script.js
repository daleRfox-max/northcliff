const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const intro = document.querySelector("[data-launch-intro]");
const introSlides = Array.from(document.querySelectorAll("[data-launch-slide]"));
const introCount = document.querySelector("[data-launch-count]");
const introProgress = document.querySelector("[data-launch-progress]");
const introNext = document.querySelector("[data-launch-next]");
const introPrev = document.querySelector("[data-launch-prev]");
const introEnter = document.querySelector("[data-launch-enter]");
const introStage = document.querySelector(".launch-stage");

const analyticsConfig = document.querySelector("[data-analytics-config]");

if (analyticsConfig) {
  const gaId = analyticsConfig.getAttribute("data-ga-id");
  const metaPixelId = analyticsConfig.getAttribute("data-meta-pixel-id");

  if (gaId) {
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.append(gtagScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }

  if (metaPixelId) {
    (function initPixel(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function fbq() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
  }
}

if (intro && introSlides.length) {
  let introIndex = 0;
  let introTimer = 0;
  const slideDuration = 4000;

  const updateIntro = (nextIndex) => {
    introIndex = (nextIndex + introSlides.length) % introSlides.length;
    introSlides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === introIndex);
    });

    if (introStage) {
      const activeTheme = Array.from(introSlides[introIndex].classList).find((className) => className.startsWith("launch-theme-"));
      introStage.dataset.theme = activeTheme || "";
      intro.dataset.theme = activeTheme || "";
    }

    if (introCount) {
      introCount.textContent = `${String(introIndex + 1).padStart(2, "0")} / ${String(introSlides.length).padStart(2, "0")}`;
    }

    if (introProgress) {
      introProgress.classList.remove("is-running");
      void introProgress.offsetWidth;
      introProgress.classList.add("is-running");
    }
  };

  const closeIntro = () => {
    window.clearTimeout(introTimer);
    intro.classList.add("is-exiting");
    document.body.classList.remove("intro-active");
    window.setTimeout(() => intro.remove(), 520);
  };

  const scheduleIntro = () => {
    window.clearTimeout(introTimer);
    introTimer = window.setTimeout(() => {
      if (introIndex === introSlides.length - 1) {
        closeIntro();
        return;
      }

      updateIntro(introIndex + 1);
      scheduleIntro();
    }, slideDuration);
  };

  introNext?.addEventListener("click", () => {
    updateIntro(introIndex + 1);
    scheduleIntro();
  });

  introPrev?.addEventListener("click", () => {
    updateIntro(introIndex - 1);
    scheduleIntro();
  });

  introEnter?.addEventListener("click", closeIntro);

  updateIntro(0);
  scheduleIntro();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const forms = document.querySelectorAll("[data-inquiry-form]");

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const note = form.querySelector("[data-form-note]");
    const submitButton = form.querySelector("[data-submit-button]");
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      moveInTiming: String(data.get("moveInTiming") || "").trim(),
      unitType: data.getAll("unitType").map((value) => String(value).trim()).filter(Boolean),
      message: String(data.get("message") || "").trim(),
      formType: String(data.get("formType") || form.dataset.formType || "inquiry").trim(),
      website: String(data.get("website") || "").trim()
    };

    if (note) {
      note.textContent = "Sending your inquiry...";
      note.classList.remove("is-error", "is-success");
    }

    if (submitButton) {
      submitButton.dataset.defaultText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      form.reset();

      if (note) {
        note.textContent = payload.formType === "waitlist"
          ? "You're on the list. Jennifer will share updates as NorthCliff Commons moves toward opening."
          : "Thanks, we got it. Jennifer will follow up as leasing details become available.";
        note.classList.add("is-success");
      }

      if (window.gtag) {
        window.gtag("event", payload.formType === "waitlist" ? "waitlist_signup" : "lead_form_submit");
      }

      if (window.fbq) {
        window.fbq("track", "Lead");
      }
    } catch (error) {
      if (note) {
        note.textContent = error.message || "Something went wrong. Please call Jennifer at 360-229-1220.";
        note.classList.add("is-error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.defaultText || "Send My Inquiry";
      }
    }
  });
});

document.querySelectorAll("a[href^='tel:']").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.gtag) window.gtag("event", "phone_click");
    if (window.fbq) window.fbq("track", "Contact");
  });
});

document.querySelectorAll("a[href^='mailto:']").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.gtag) window.gtag("event", "email_click");
  });
});

document.querySelectorAll("a[href$='.pdf']").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.gtag) window.gtag("event", "floor_plan_download");
  });
});

document.querySelectorAll("[data-unit-select]").forEach((link) => {
  link.addEventListener("click", () => {
    const unit = link.getAttribute("data-unit-select");
    window.setTimeout(() => {
      document.querySelectorAll("[data-unit-interest]").forEach((field) => {
        field.value = unit || field.value;
      });
    }, 80);
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxLinks = Array.from(document.querySelectorAll("[data-lightbox-src]"));
let lightboxIndex = -1;

const openLightbox = (index) => {
  const trigger = lightboxLinks[index];
  if (!lightbox || !lightboxImage || !trigger) return;
  lightboxIndex = index;
  lightboxImage.src = trigger.getAttribute("data-lightbox-src") || trigger.href;
  lightboxImage.alt = trigger.getAttribute("data-lightbox-alt") || "";
  if (lightboxCaption) lightboxCaption.textContent = trigger.getAttribute("data-lightbox-caption") || "";
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
};

lightboxLinks.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openLightbox(index);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox || lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight" && lightboxLinks.length) openLightbox((lightboxIndex + 1) % lightboxLinks.length);
  if (event.key === "ArrowLeft" && lightboxLinks.length) openLightbox((lightboxIndex - 1 + lightboxLinks.length) % lightboxLinks.length);
});
