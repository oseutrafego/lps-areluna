import type { Metadata } from "next";
import ObrigadoClient from "./ObrigadoClient";

export const metadata: Metadata = {
  title: "Pedido recebido — Instituto Areluna",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return <ObrigadoClient />;
}
