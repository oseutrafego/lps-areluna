"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PT_CONTACT, BR_CONTACT } from "@/data/shared";
import { converterFormulario, converterWhatsapp, META_PIXEL_ID, type Unidade } from "@/data/tracking";
import { Check } from "@/components/icons";

const COPY = {
  br: {
    sub: "Nossa equipe vai entrar em contato em breve para agendar a sua avaliação especializada. Obrigado pela confiança.",
    hint: "Quer adiantar? Fale conosco agora mesmo.",
  },
  pt: {
    sub: "A nossa equipa vai entrar em contacto em breve para agendar a sua avaliação especializada. Obrigado pela confiança.",
    hint: "Quer adiantar? Fale connosco agora mesmo.",
  },
};

export default function ObrigadoClient() {
  const [whatsapp, setWhatsapp] = useState(BR_CONTACT.whatsappHref);
  const [unidade, setUnidade] = useState<Unidade>("br");
  const [copy, setCopy] = useState(COPY.br);

  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get("u") as Unidade | null;
    setWhatsapp(u === "pt" ? PT_CONTACT.whatsappHref : BR_CONTACT.whatsappHref);
    setCopy(u === "pt" ? COPY.pt : COPY.br);
    setUnidade(u === "pt" ? "pt" : "br");

    // Conversão do Google Ads, na conta da unidade certa.
    converterFormulario(u === "pt" ? "pt" : "br");

    // Meta Pixel (opcional)
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (META_PIXEL_ID && typeof fbq === "function") {
      fbq("track", "Lead");
    }
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-jet px-6 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <Image src="/brand/fundo.png" alt="" fill className="object-cover" priority />
      </div>
      <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-gold-leaf/[0.08] blur-[120px]" />

      <div className="animate-fade-up relative flex flex-col items-center">
        <Image
          src="/brand/instituto-gold.png"
          alt="Instituto Areluna"
          width={176}
          height={116}
          priority
          className="mb-10 h-16 w-auto"
        />

        <span className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-gold-leaf/50 text-gold-leaf">
          <Check className="h-8 w-8" />
        </span>

        <h1 className="display text-4xl text-sand md:text-5xl">
          Pedido recebido.
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-sand/70">
          {copy.sub}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
            onClick={() => converterWhatsapp(unidade)}
          >
            Falar agora no WhatsApp
          </a>
          <span className="text-xs uppercase tracking-[0.16em] text-sand/40">
            {copy.hint}
          </span>
        </div>
      </div>

      <p className="relative mt-16 text-[0.7rem] uppercase tracking-[0.18em] text-sand/30">
        Instituto Areluna · Estética &amp; Padrão Europeu
      </p>
    </main>
  );
}
