"use client";

import { motion } from "framer-motion";
import { Armchair, Bike, Droplets, Sparkles } from "lucide-react";

const highlights = [
  { label: "Lavagem & pintura", icon: Droplets },
  { label: "Polimento & vitrificação", icon: Sparkles },
  { label: "Interior & couro", icon: Armchair },
  { label: "Carro e moto", icon: Bike },
];

export function SaibaMais() {
  return (
    <section className="bg-steel-950 py-14 text-paper sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
            Conheça a PoliXcar
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            Do básico à vitrine, pra carro e moto
          </h2>
          <p className="mt-3 text-sm text-steel-300 sm:text-base">
            Antes de pedir um orçamento, dá uma olhada em tudo que a gente
            faz. Talvez o serviço certo pro seu carro seja diferente do que
            você tinha em mente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          {highlights.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-steel-700 bg-steel-900/60 px-4 py-2 text-sm text-steel-200"
            >
              <Icon className="h-4 w-4 text-accent-400" aria-hidden="true" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.a
          href="#servicos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent-400/50 px-6 py-3 text-sm font-semibold text-accent-400 transition-colors hover:bg-accent-500 hover:text-paper"
        >
          Saiba mais sobre os serviços
          <span aria-hidden="true">→</span>
        </motion.a>
      </div>
    </section>
  );
}
