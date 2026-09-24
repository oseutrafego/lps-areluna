// ── Configuração de rastreamento ──────────────────────────────
// Cada unidade tem a sua própria conta de Google Ads, por isso a
// configuração é por unidade. Campo vazio = tag desligada (não quebra o site).

export type Unidade = "pt" | "br";

type ConfigAds = {
  /** ID da conta de Google Ads, ex.: "AW-123456789" */
  id: string;
  /** Rótulo da conversão de formulário enviado */
  labelFormulario: string;
  /** Rótulo da conversão de clique no WhatsApp (opcional) */
  labelWhatsapp: string;
};

export const GOOGLE_ADS: Record<Unidade, ConfigAds> = {
  br: {
    id: "AW-18244340973",
    labelFormulario: "JYL6CLa0t9QcEO2ZyvtD", // ação "Enviar formulário de lead"
    labelWhatsapp: "", // criar a ação no painel e colar o rótulo aqui
  },
  pt: {
    id: "AW-10946516279",
    labelFormulario: "66U4CJuZlIIYELeq2uMo", // ação "form_submit"
    labelWhatsapp: "aMQFCOaaqYgYELeq2uMo", // ação "WhatsApp - LP Implante Dentário"
  },
};

/** Todos os IDs de conta, para o carregamento do gtag no layout. */
export const IDS_GOOGLE_ADS = Array.from(
  new Set(Object.values(GOOGLE_ADS).map((c) => c.id).filter(Boolean)),
);

// Meta Pixel (opcional): dispara o evento "Lead" na página de obrigado.
export const META_PIXEL_ID = ""; // ex.: "123456789012345"

// Webhook do CRM (opcional): se o formulário deve fazer um POST direto
// para um endpoint antes de redirecionar. Se o CRM já capta por outro
// meio, deixe vazio.
export const LEAD_WEBHOOK = "";

type Gtag = (...a: unknown[]) => void;

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
}

/**
 * Dispara uma conversão do Google Ads. Silencioso se não estiver configurada.
 *
 * O gtag.js carrega com `afterInteractive`, então numa página que dispara a
 * conversão logo no primeiro render ele ainda não existe. Por isso esperamos
 * por ele — sem isso a conversão some, que foi o que aconteceu até 24/09/2026.
 */
function converter(unidade: Unidade, rotulo: string, evento: string) {
  const cfg = GOOGLE_ADS[unidade];
  if (!cfg?.id || !rotulo) return;

  // O dataLayer serve o GTM, que também está nas páginas, e existe desde já.
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: evento, unidade });

  const enviar = () => {
    const g = gtag();
    if (!g) return false;
    g("event", "conversion", { send_to: `${cfg.id}/${rotulo}` });
    return true;
  };

  if (enviar()) return;
  // Tenta de novo a cada 200ms, desistindo aos 10 segundos.
  let tentativas = 0;
  const timer = window.setInterval(() => {
    if (enviar() || ++tentativas > 50) window.clearInterval(timer);
  }, 200);
}

/** Formulário enviado — chamar na página de obrigado. */
export function converterFormulario(unidade: Unidade) {
  converter(unidade, GOOGLE_ADS[unidade].labelFormulario, "generate_lead");
}

/**
 * Clique no WhatsApp. Não segura a navegação: dispara e deixa o link seguir,
 * porque prender o utilizador à espera da tag custa mais que perder o registo.
 */
export function converterWhatsapp(unidade: Unidade) {
  converter(unidade, GOOGLE_ADS[unidade].labelWhatsapp, "click_whatsapp");
}
