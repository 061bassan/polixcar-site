"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { site, waLinks } from "@/lib/site";
import { HeroShowcase } from "./HeroShowcase";
import { LiquidMetalButton } from "./ui/liquid-metal-button";
import { StarIcon } from "./StarIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Hero() {
  const words = useMemo(() => ["brilhando", "higienizado", "renovado", "protegido", "impecável"], []);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWordIndex((i) => (i === words.length - 1 ? 0 : i + 1));
    }, 2200);
    return () => clearTimeout(timeout);
  }, [wordIndex, words]);

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,var(--color-accent-500)_0%,transparent_45%)]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a
            href={site.googleReview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-400 transition-colors hover:border-accent-400"
          >
            <span className="flex text-accent-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-3 w-3" />
              ))}
            </span>
            {site.googleReview.rating.toFixed(1).replace(".", ",")} · {site.googleReview.count} avaliações no Google
          </a>

          <h1 className="text-balance font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-5xl">
            Seu carro{" "}
            <span className="relative inline-block h-[1.05em] w-[11.5ch] overflow-hidden align-bottom">
              &nbsp;
              {words.map((word, index) => (
                <motion.span
                  key={word}
                  className="absolute left-0 font-semibold text-accent-400"
                  initial={{ opacity: 0, y: -60 }}
                  transition={{ type: "spring", stiffness: 60, damping: 14 }}
                  animate={
                    wordIndex === index
                      ? { y: 0, opacity: 1 }
                      : { y: wordIndex > index ? -60 : 60, opacity: 0 }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-steel-200 sm:text-lg">
            Lavagem detalhada, polimento e vitrificação de pintura,
            higienização interna, revitalização de faróis e lavagem de motor.
            Todos os cuidados que o seu veículo merece!
          </p>
          <p className="mt-3 max-w-lg text-sm text-steel-300 sm:text-base">
            Estamos localizados no Jardim Botânico, mas atendemos todo o
            Distrito Federal.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LiquidMetalButton
              label="Chamar no WhatsApp"
              href={waLinks.agendar}
              icon={<WhatsAppIcon className="h-4 w-4 text-white" />}
            />
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-steel-300/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-accent-400 hover:text-accent-400"
            >
              Ver serviços
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center md:justify-end"
        >
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  );
}
