"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section className="bg-steel-100 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
            Como funciona
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-ink sm:text-4xl">
            Do agendamento à entrega
          </h2>
        </div>

        <div className="relative mt-12 grid gap-8 sm:grid-cols-4">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-steel-200 sm:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display font-semibold text-accent-400">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-steel-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
