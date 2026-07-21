"use client";

import { useState } from "react";
import type { LeadField } from "@/data/types";
import { LEAD_WEBHOOK } from "@/data/tracking";
import { Check } from "./icons";

export default function LeadForm({
  title,
  subtitle,
  cta,
  fields,
  footnote,
  offerName,
  urgency,
  unit = "br",
  id = "form",
}: {
  title: string;
  subtitle: string;
  cta: string;
  fields: LeadField[];
  footnote: string;
  offerName?: string;
  urgency?: string;
  unit?: "pt" | "br";
  id?: string;
}) {
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Envia ao CRM se houver webhook configurado; senão, apenas redireciona.
    if (LEAD_WEBHOOK) {
      try {
        await fetch(LEAD_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, procedimento: title, unidade: unit }),
        });
      } catch {
        /* não bloqueia a experiência do utilizador */
      }
    }
    // Redireciona para a página de obrigado (onde dispara a conversão).
    window.location.href = `/obrigado?u=${unit}`;
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
              Inclui <span className="text-gold-pale">{offerName}</span>.
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
          <button type="submit" disabled={sending} className="btn-gold mt-2 w-full disabled:opacity-60">
            {sending ? "A enviar…" : cta}
          </button>
          <p className="mt-1 text-center text-[0.68rem] leading-relaxed text-sand/35">
            {footnote}
          </p>
        </form>
    </div>
  );
}
