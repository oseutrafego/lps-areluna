"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Campo de telefone com indicativo de país.
 *
 * Porquê: metade dos leads de Portugal escrevia o número em formato local
 * ("06 12 34 56 78" em França). Chegava ao CRM como 0612345678 e ninguém em
 * Portugal conseguia ligar — 27,5% desses leads foram desqualificados por
 * "contacto inválido", contra 7% de quem escreveu o indicativo.
 *
 * O input visível não tem `name`: quem vai no FormData é o hidden, já em E.164.
 */

type Pais = { codigo: string; indicativo: string; nome: string; digitos: [number, number] };

const PAISES: Pais[] = [
  { codigo: "PT", indicativo: "351", nome: "Portugal", digitos: [9, 9] },
  { codigo: "FR", indicativo: "33", nome: "França", digitos: [9, 9] },
  { codigo: "BE", indicativo: "32", nome: "Bélgica", digitos: [8, 9] },
  { codigo: "CH", indicativo: "41", nome: "Suíça", digitos: [9, 9] },
  { codigo: "LU", indicativo: "352", nome: "Luxemburgo", digitos: [6, 9] },
  { codigo: "DE", indicativo: "49", nome: "Alemanha", digitos: [10, 11] },
  { codigo: "AT", indicativo: "43", nome: "Áustria", digitos: [9, 11] },
  { codigo: "NL", indicativo: "31", nome: "Holanda", digitos: [9, 9] },
  { codigo: "ES", indicativo: "34", nome: "Espanha", digitos: [9, 9] },
  { codigo: "GB", indicativo: "44", nome: "Reino Unido", digitos: [10, 10] },
  { codigo: "BR", indicativo: "55", nome: "Brasil", digitos: [10, 11] },
];

function porCodigo(codigo: string) {
  return PAISES.find((p) => p.codigo === codigo);
}

/** Países que cada unidade atende de facto — o resto não deve alterar o padrão. */
const MERCADO: Record<"pt" | "br", string[]> = {
  pt: ["PT", "FR", "BE", "CH", "LU", "DE", "AT", "NL", "ES", "GB"],
  br: ["BR"],
};

/**
 * Lê a região do idioma principal do navegador ("fr-FR" → "FR").
 *
 * Só o idioma principal, e só se o país for do mercado da unidade: o Chrome
 * costuma devolver coisas como ["en-US", "en-BR", "pt-BR"], e varrer a lista
 * toda fazia uma página portuguesa abrir com o indicativo do Brasil.
 */
function regiaoDoNavegador(unit: "pt" | "br"): string | null {
  if (typeof navigator === "undefined") return null;
  const regiao = navigator.language?.split("-")[1]?.toUpperCase();
  if (!regiao || !porCodigo(regiao)) return null;
  return MERCADO[unit].includes(regiao) ? regiao : null;
}

export default function PhoneField({
  name,
  label,
  required,
  unit,
  className,
}: {
  name: string;
  label: string;
  required?: boolean;
  unit: "pt" | "br";
  className: string;
}) {
  const padrao = unit === "br" ? "BR" : "PT";
  const [codigo, setCodigo] = useState(padrao);
  const [local, setLocal] = useState("");

  // Só depois de montar, para não divergir do HTML do servidor.
  useEffect(() => {
    const regiao = regiaoDoNavegador(unit);
    if (regiao) setCodigo(regiao);
  }, [unit]);

  const pais = porCodigo(codigo) ?? porCodigo(padrao)!;

  // E.164: indicativo + número sem o zero de tronco que se usa localmente.
  const e164 = useMemo(() => {
    const digitos = local.replace(/\D/g, "").replace(/^0+/, "");
    return digitos ? `+${pais.indicativo}${digitos}` : "";
  }, [local, pais]);

  const digitos = local.replace(/\D/g, "").replace(/^0+/, "").length;
  const curto = digitos > 0 && digitos < pais.digitos[0];

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`${name}-local`} className="text-[0.7rem] uppercase tracking-[0.18em] text-sand/45">
        {label}
      </label>
      <div className="flex gap-2">
        <select
          aria-label="Indicativo do país"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className={`${className} w-[8.5rem] shrink-0`}
        >
          {PAISES.map((p) => (
            <option key={p.codigo} value={p.codigo}>
              {p.codigo} +{p.indicativo}
            </option>
          ))}
        </select>
        <input
          id={`${name}-local`}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder={unit === "br" ? "11 91234 5678" : "912 345 678"}
          className={`${className} min-w-0 flex-1`}
        />
      </div>
      {curto && (
        <p className="text-[0.68rem] text-gold-leaf/80">
          Faltam dígitos para um número de {pais.nome}.
        </p>
      )}
      <input type="hidden" name={name} value={e164} />
    </div>
  );
}
