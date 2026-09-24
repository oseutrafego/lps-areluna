"use client";

import { converterWhatsapp, type Unidade } from "@/data/tracking";

/**
 * Link de WhatsApp que regista a conversão antes de sair da página.
 * Não segura a navegação — dispara e deixa seguir.
 */
export default function LinkWhatsapp({
  href,
  unidade,
  className,
  children,
}: {
  href: string;
  unidade: Unidade;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => converterWhatsapp(unidade)}
    >
      {children}
    </a>
  );
}
