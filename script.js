const STORAGE_KEY = "joyPrizeDrawLandingLocale";
const fallbackLocale = "en";
const messages = window.landingMessages || {};

const localeOptions = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "ko", label: "한국어" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
];

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
}

function setHtml(id, value) {
  const node = document.getElementById(id);
  if (node) {
    node.innerHTML = value;
  }
}

function normalizeLocale(locale) {
  if (!locale) {
    return fallbackLocale;
  }

  const lower = locale.toLowerCase();

  if (lower.startsWith("zh")) {
    if (
      lower.includes("tw") ||
      lower.includes("hk") ||
      lower.includes("mo") ||
      lower.includes("hant")
    ) {
      return "zh-TW";
    }

    if (lower.includes("cn") || lower.includes("sg") || lower.includes("hans")) {
      return "zh-CN";
    }

    return "zh";
  }

  const supported = localeOptions.find(({ code }) =>
    lower.startsWith(code.toLowerCase()),
  );
  return supported ? supported.code : fallbackLocale;
}

function getInitialLocale() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && messages[saved]) {
    return saved;
  }

  const browserLocales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const locale of browserLocales) {
    const normalized = normalizeLocale(locale);
    if (messages[normalized]) {
      return normalized;
    }
  }

  return fallbackLocale;
}

function renderStats(stats) {
  const root = document.getElementById("hero-stats");
  root.innerHTML = "";

  for (const stat of stats) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${stat.value}</strong><span>${stat.label}</span>`;
    root.appendChild(item);
  }
}

function renderModes(modeEntries) {
  const root = document.getElementById("mode-grid");
  root.innerHTML = "";

  for (const mode of modeEntries) {
    const article = document.createElement("article");
    article.className = "mode-card";
    const media = mode.image
      ? `<img src="${mode.image}" alt="${mode.name}" loading="lazy" />`
      : `<div class="mode-illustration" aria-hidden="true"><span class="mode-symbol">${mode.symbol || "★"}</span></div>`;

    article.innerHTML = `
      ${media}
      <div class="mode-copy">
        <h3>${mode.name}</h3>
        <p>${mode.body}</p>
      </div>
    `;
    root.appendChild(article);
  }
}

function renderSteps(steps) {
  const root = document.getElementById("workflow-steps");
  root.innerHTML = "";

  steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
      </div>
    `;
    root.appendChild(item);
  });
}

function renderFeatures(features) {
  const root = document.getElementById("feature-list");
  root.innerHTML = "";

  for (const feature of features) {
    const item = document.createElement("div");
    item.className = "feature-item";
    item.innerHTML = `
      <h3>${feature.title}</h3>
      <p>${feature.body}</p>
    `;
    root.appendChild(item);
  }
}

function renderAudiences(audiences) {
  const root = document.getElementById("audience-grid");
  root.innerHTML = "";

  for (const audience of audiences) {
    const item = document.createElement("article");
    item.className = "audience-card";
    item.innerHTML = `
      <h3>${audience.title}</h3>
      <p>${audience.body}</p>
    `;
    root.appendChild(item);
  }
}

function renderFaqs(faqs) {
  const root = document.getElementById("faq-list");
  root.innerHTML = "";

  for (const faq of faqs) {
    const item = document.createElement("article");
    item.className = "faq-item";
    item.innerHTML = `
      <h3>${faq.q}</h3>
      <p>${faq.a}</p>
    `;
    root.appendChild(item);
  }
}

function applyLocale(locale) {
  const t = messages[locale] || messages[fallbackLocale];
  document.documentElement.lang = locale;
  document.title = t.metaTitle;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", t.metaDescription);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", t.metaTitle);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", t.metaDescription);
  }

  setText("nav-modes", t.nav.modes);
  setText("nav-flow", t.nav.flow);
  setText("nav-organizers", t.nav.organizers);
  setText("nav-faq", t.nav.faq);
  setText("language-label", t.languageLabel);
  setText("hero-eyebrow", t.heroEyebrow);
  setHtml("hero-title", t.heroTitle);
  setText("hero-lead", t.heroLead);
  setText("hero-primary-cta", t.heroPrimaryCta);
  setText("hero-secondary-cta", t.heroSecondaryCta);
  setText("hero-note", t.heroNote);
  setText("visual-chip-top", t.visualChipTop);
  setText("visual-chip-bottom", t.visualChipBottom);
  renderStats(t.stats);

  setText("modes-eyebrow", t.modesEyebrow);
  setText("modes-title", t.modesTitle);
  setText("modes-intro", t.modesIntro);
  renderModes(t.modes);

  setText("workflow-eyebrow", t.workflowEyebrow);
  setText("workflow-title", t.workflowTitle);
  setText("workflow-intro", t.workflowIntro);
  renderSteps(t.workflowSteps);

  setText("organizers-eyebrow", t.organizersEyebrow);
  setText("organizers-title", t.organizersTitle);
  setText("organizers-intro", t.organizersIntro);
  renderFeatures(t.features);

  setText("audiences-eyebrow", t.audiencesEyebrow);
  setText("audiences-title", t.audiencesTitle);
  setText("audiences-intro", t.audiencesIntro);
  renderAudiences(t.audiences);

  setText("faq-eyebrow", t.faqEyebrow);
  setText("faq-title", t.faqTitle);
  renderFaqs(t.faqs);

  setText("cta-eyebrow", t.ctaEyebrow);
  setText("cta-title", t.ctaTitle);
  setText("cta-body", t.ctaBody);
  setText("cta-primary", t.ctaPrimary);
  setText("cta-secondary", t.ctaSecondary);
  setText("cta-note", t.ctaNote);
  setText("footer-tagline", t.footerTagline);
  setText("footer-meta", t.footerMeta);

  document.getElementById("locale-select").value = locale;
}

function populateLocaleSelect() {
  const select = document.getElementById("locale-select");
  for (const option of localeOptions) {
    const node = document.createElement("option");
    node.value = option.code;
    node.textContent = option.label;
    select.appendChild(node);
  }
}

function setupRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((node) => {
      node.classList.add("reveal-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
  );

  document.querySelectorAll(".reveal").forEach((node) => {
    if (!node.classList.contains("reveal-visible")) {
      observer.observe(node);
    }
  });
}

function init() {
  populateLocaleSelect();
  const locale = getInitialLocale();
  applyLocale(locale);
  setupRevealObserver();

  document.getElementById("locale-select").addEventListener("change", (event) => {
    const nextLocale = event.target.value;
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    applyLocale(nextLocale);
  });
}

init();
