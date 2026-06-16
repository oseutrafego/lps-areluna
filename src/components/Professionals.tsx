import type { Procedure } from "@/data/types";
import Reveal from "./Reveal";

export default function Professionals({ p }: { p: Procedure }) {
  return (
    <section className="bg-marble-light py-24 text-jet md:py-32">
      <div className="container-x section">
        <Reveal className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold-deep/60" />
            <span className="eyebrow !text-gold-deep">A Equipa</span>
          </div>
          <h2 className="display text-4xl text-jet md:text-5xl">{p.proTitle}</h2>
          <p className="mt-6 text-base leading-relaxed text-jet/65">{p.proIntro}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.professionals.map((pro, i) => (
            <Reveal
              key={pro.name}
              delay={i * 70}
              className="group rounded-sm border border-jet/10 bg-marble p-6 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-deep/40 font-serif text-2xl text-gold-deep">
                {pro.name
                  .replace(/^Dra?\.?\s*/i, "")
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h3 className="mt-5 font-serif text-xl font-medium text-jet">
                {pro.name}
              </h3>
              <p className="mt-1 text-sm text-gold-deep">{pro.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-jet/55">
                {pro.credential}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
