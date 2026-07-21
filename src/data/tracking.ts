// ── Configuração de rastreamento ──────────────────────────────
// Preencher quando for ATIVAR as campanhas. Vazio = desligado
// (as tags simplesmente não disparam, sem quebrar o site).

// Google Ads: pegue em Ferramentas → Conversões → (sua ação) → "Configurar a tag manualmente".
export const GOOGLE_ADS_ID = ""; // ex.: "AW-123456789"
export const GOOGLE_ADS_CONVERSION_LABEL = ""; // ex.: "AbC-D_efGhIjKl"

// Meta Pixel (opcional): dispara o evento "Lead" na página de obrigado.
export const META_PIXEL_ID = ""; // ex.: "123456789012345"

// Webhook do CRM (opcional): se o formulário deve fazer um POST direto
// para um endpoint antes de redirecionar. Se o CRM já capta por outro
// meio, deixe vazio.
export const LEAD_WEBHOOK = "";
