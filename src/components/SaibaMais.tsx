"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Bike, Droplets, Lightbulb, Sparkles, type LucideIcon } from "lucide-react";
import { galleryItems } from "@/lib/site";

type Highlight = {
  label: string;
  icon: LucideIcon;
  photos: string[];
};

const highlights: Highlight[] = [
  { label: "Lavagem e Higienização", icon: Droplets, photos: ["lavagem", "interna"] },
  { label: "Polimento e Vitrificação", icon: Sparkles, photos: ["descontaminacao"] },
  { label: "Faróis e Motor", icon: Lightbulb, photos: ["farol", "motor"] },
  { label: "Carro e Moto", icon: Bike, photos: ["lavagem", "moto"] },
];

export function SaibaMais() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : highlights[activeIndex];
  const activePhotos = active
    ? active.photos
        .map((slug) => galleryItems.find((g) => g.slug === slug))
        .filter((g): g is NonNullable<typeof g> => Boolean(g))
    : [];

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
            Da lavagem ao detalhamento completo para Carro e Moto
          </h2>
          <p className="mt-3 text-sm text-steel-300 sm:text-base">
            Antes de fazer um orçamento, confira os serviços que realizamos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          {highlights.map(({ label, icon: Icon }, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-accent-400 bg-accent-500 text-paper"
                    : "border-steel-700 bg-steel-900/60 text-steel-200 hover:border-accent-400"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-paper" : "text-accent-400"}`}
                  aria-hidden="true"
                />
                {label}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-4"
            >
              {activePhotos.map((photo) => (
                <div
                  key={photo.slug}
                  className="relative aspect-square w-full max-w-[260px] flex-1 basis-[200px] overflow-hidden rounded-2xl border border-steel-800"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 260px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-3 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wide text-paper">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
