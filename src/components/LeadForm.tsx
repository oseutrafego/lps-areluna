"use client";

import { useState } from "react";
import type { LeadField } from "@/data/types";
import { Check } from "./icons";

export default function LeadForm({
  title,
  subtitle,
  cta,
  fields,
  footnote,
  offerName,
  urgency,
  id = "form",
}: {
  title: string;
  subtitle: string;
  cta: string;
  fields: LeadField[];
  footnote: string;
  offerName?: string;
  urgency?: string;
  id?: string;
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Protótipo: aqui entra a integração real (Meta Lead / CRM Zoho / webhook).
    setSent(true);
  }

  return (
    <div
      id={id}
      className="tick-card relative w-full rounded-sm border border-gold-leaf/25 bg-[#1f1f1f]/95 p-7 shadow-card backdrop-blur md:p-9"
    >
      <div className="mb-5">
        <h3 className="font-serif text-3xl font-light text-sand">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-sand/60">{subtitle}</p>
        {offerName && (
          <div className="mt-4 flex items-start gap-2.5 rounded-sm border border-gold-leaf/25 bg-gold-leaf/[0.06] px-4 py-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-leaf" />
            <p className="text-sm leading-snug text-sand/85">
              Inclui <span className="text-gold-pale">{offerName}</span> — sem custo.
            </p>
          </div>
        )}
        {urgency && (
          <p className="mt-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-gold-leaf">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-leaf" />
            {urgency}
          </p>
        )}
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-leaf/50 text-gold-leaf">
            <Check className="h-6 w-6" />
          </span>
          <p className="font-serif text-2xl text-sand">Pedido recebido.</p>
          <p className="max-w-xs text-sm text-sand/60">
            A nossa equipa entrará em contacto em breve para agendar a sua
            avaliação. Obrigado pela confiança.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {fields.map((f) => (
            <div key={f.name} className="flex flex-col gap-1.5">
              <label
                htmlFor={f.name}
                className="text-[0.7rem] uppercase tracking-[0.18em] text-sand/45"
              >
                {f.label}
              </label>
              {f.type === "select" ? (
                <select
                  id={f.name}
                  name={f.name}
                  required={f.required}
                  defaultValue=""
                  className="rounded-sm border border-sand/15 bg-[#161616] px-4 py-3 text-sm text-sand outline-none transition focus:border-gold-leaf/70"
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type ?? "text"}
                  required={f.required}
                  className="rounded-sm border border-sand/15 bg-[#161616] px-4 py-3 text-sm text-sand outline-none transition placeholder:text-sand/30 focus:border-gold-leaf/70"
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn-gold mt-2 w-full">
            {cta}
          </button>
          <p className="mt-1 text-center text-[0.68rem] leading-relaxed text-sand/35">
            {footnote}
          </p>
        </form>
      )}
    </div>
  );
}
