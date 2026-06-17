import type { Professional, Proof } from "./types";

// Prova social (nota Google). NOTA: confirmar a nota exata com o cliente e,
// idealmente, substituir por print/embed real do Google Reviews na produção.
export const PROOF: Proof = {
  rating: "4,9",
  count: "450+",
  caption: "avaliações reais no Google",
};

// ── Contactos Portugal (Porto) ──────────────────────────────
export const PT_CONTACT = {
  phoneDisplay: "+351 916 880 681",
  phoneHref: "tel:+351916880681",
  whatsappHref: "https://wa.me/351916880662",
  address: "Rua Júlio Dinis 194, R/C — 4050-319 Porto, Portugal",
  regulatory: [
    "Nº Registo ERS: E161637",
    "Nº Licença de funcionamento: 21593/2022",
    "Diretor Clínico inscrito na Ordem dos Médicos Dentistas",
    "Publicidade de saúde em conformidade com a ERS",
  ],
};

// ── Contactos Brasil (Curitiba/PR) ──────────────────────────
// NOTA: telefone/WhatsApp BR ainda não fornecidos. Mantemos vazios para NÃO
// exibir número falso (credibilidade). Preencher com os reais antes do go-live.
export const BR_CONTACT = {
  phoneDisplay: "",
  phoneHref: "",
  whatsappHref: "",
  address: "Curitiba — Paraná, Brasil",
  regulatory: [
    "Responsável técnica inscrita no CRO-PR",
    "Procedimentos realizados por profissionais habilitados",
    "Resultados variam conforme avaliação individual",
    "Publicidade em conformidade com o Código de Ética Odontológica",
  ],
};

// ── Equipa clínica (institutoareluna.com.br / .pt) ──────────
export const PROS: Record<string, Professional> = {
  arethuza: {
    name: "Dra. Arethuza Luna",
    role: "Fundadora · Ortodontia & Harmonização",
    credential:
      "Mestrados em Miami e Nova Iorque. Dupla titulação Brasil e Portugal. Referência em harmonização orofacial de resultado natural.",
  },
  leonardo: {
    name: "Dr. Leonardo Saraiva",
    role: "Estomatologia & Patologia Oral",
    credential:
      "Especialista em medicina oral e diagnóstico avançado, com foco em segurança clínica e reabilitação.",
  },
  carla: {
    name: "Dra. Carla Salvi",
    role: "Cirurgia Oral & Maxilofacial",
    credential:
      "Cirurgia guiada por computador e reabilitação com implantes. Precisão milimétrica em carga imediata.",
  },
  aline: {
    name: "Dra. Aline Marodin",
    role: "Cirurgia Oral & Harmonização Avançada",
    credential:
      "Cirurgiã com formação avançada em harmonização facial e protocolos minimamente invasivos.",
  },
  daiane: {
    name: "Dra. Daiane Andrade",
    role: "Endodontia",
    credential:
      "Tratamento e preservação dentária com tecnologia de magnificação e diagnóstico digital.",
  },
  marcos: {
    name: "Dr. Marcos Kawasaki",
    role: "Dermatologia & Transplante Capilar",
    credential:
      "17+ anos de experiência. Especialista em transplante capilar e saúde da pele e do cabelo.",
  },
  sara: {
    name: "Dra. Sara Ribeiro",
    role: "Reabilitação Orofacial",
    credential:
      "Especialista em devolver função e estética ao sorriso, do planeamento à prótese definitiva.",
  },
  pethine: {
    name: "Dra. Pethine Dalsasso",
    role: "Odontologia & Estética do Sorriso",
    credential:
      "Foco em planeamento digital do sorriso e tratamentos de estética dentária personalizados.",
  },
};
