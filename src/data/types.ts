// ───────────────────────────────────────────────────────────
// ARELUNA — modelo de dados que dirige cada landing page.
// A copy (ponto 4) vive aqui; os componentes (ponto 5) só renderizam.
// ───────────────────────────────────────────────────────────

export type Unit = "pt" | "br";

export interface Stat {
  value: string;
  label: string;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface Step {
  n: string;
  title: string;
  body: string;
}

export interface Professional {
  name: string;
  role: string;
  credential: string;
}

export interface Testimonial {
  name: string;
  meta: string; // idade / origem / procedimento
  quote: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface LeadField {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "select";
  options?: string[];
  required?: boolean;
}

export interface Procedure {
  unit: Unit;
  slug: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Hero
  eyebrow: string;
  h1Lead: string; // texto normal
  h1Accent: string; // pedaço dourado
  heroSub: string;
  heroChips: string[]; // benefícios rápidos
  // Form
  formTitle: string;
  formSubtitle: string;
  formCta: string;
  formFields: LeadField[];
  formFootnote: string;
  // Trust
  stats: Stat[];
  // Differentials
  diffEyebrow: string;
  diffTitle: string;
  diffIntro: string;
  benefits: Benefit[];
  // Process
  processEyebrow: string;
  processTitle: string;
  steps: Step[];
  // Gallery
  galleryTitle: string;
  gallerySub: string;
  galleryCaptions: string[];
  // Professionals
  proTitle: string;
  proIntro: string;
  professionals: Professional[];
  // Testimonials
  testimonialsTitle: string;
  testimonials: Testimonial[];
  // FAQ
  faq: Faq[];
  // Final CTA
  finalTitle: string;
  finalSub: string;
  finalCta: string;
  // Contact / footer
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  address: string;
  regulatory: string[];
}

export interface UnitConfig {
  unit: Unit;
  label: string;
  domain: string;
  procedures: Record<string, Procedure>;
}
