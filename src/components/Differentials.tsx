"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Vamos até você",
    description:
      "Traga o carro ao nosso espaço no Jardim Botânico ou combine buscarmos e entregarmos no seu endereço.",
  },
  {
    title: "Sem improviso",
    description: "Pano e produto certos pra cada etapa. Nada de reaproveitar a mesma esponja entre um carro e outro.",
  },
  {
    title: "Processo em etapas",
    description:
      "Cada serviço segue uma sequência própria, pensada para durar sob o sol forte de Brasília.",
  },
  {
    title: "Carro e moto",
    description: "Atendemos os dois com o mesmo cuidado, do polimento à lavagem completa.",
  },
];

export function Differentials() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
            Diferenciais
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-ink sm:text-4xl">
            Por que confiar o carro pra gente
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t border-accent-500/50 pt-5"
            >
              <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-accent-600">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-steel-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
