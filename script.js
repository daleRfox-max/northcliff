const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const intro = document.querySelector("[data-launch-intro]");
const introSlides = Array.from(document.querySelectorAll("[data-launch-slide]"));
const introCount = document.querySelector("[data-launch-count]");
const introProgress = document.querySelector("[data-launch-progress]");
const introNext = document.querySelector("[data-launch-next]");
const introPrev = document.querySelector("[data-launch-prev]");
const introEnter = document.querySelector("[data-launch-enter]");

if (intro && introSlides.length) {
  let introIndex = 0;
  let introTimer = 0;
  const slideDuration = 4000;

  const updateIntro = (nextIndex) => {
    introIndex = (nextIndex + introSlides.length) % introSlides.length;
    introSlides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === introIndex);
    });

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

const form = document.querySelector("[data-inquiry-form]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const timing = String(data.get("timing") || "").trim();
    const message = String(data.get("message") || "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Desired timing: ${timing}`,
      "",
      "Message:",
      message
    ].join("\n");

    const subject = encodeURIComponent("NorthCliff Commons leasing inquiry");
    const encodedBody = encodeURIComponent(body);
    const note = form.querySelector("[data-form-note]");

    window.location.href = `mailto:jennifer@sentrypark.com?subject=${subject}&body=${encodedBody}`;

    if (note) {
      note.textContent = "Your email app should open with the inquiry details filled in.";
    }
  });
}
