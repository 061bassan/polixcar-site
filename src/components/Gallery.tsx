"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryItems } from "@/lib/site";
import { useFormSelection } from "@/lib/form-selection";

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { requestService } = useFormSelection();

  useEffect(() => {
    if (openIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % galleryItems.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex]);

  const active = openIndex === null ? null : galleryItems[openIndex];

  return (
    <section id="antes-depois" className="bg-ink py-16 text-paper sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
            Resultado
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            Antes e depois
          </h2>
          <p className="mt-3 text-steel-300">Fotos reais dos nossos serviços. Clique pra ampliar.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.slug}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-steel-800"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-paper">
                  {item.title}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
            onClick={() => setOpenIndex(null)}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-steel-700 text-paper hover:border-accent-400"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length));
              }}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-steel-700 text-paper hover:border-accent-400 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i + 1) % galleryItems.length));
              }}
              aria-label="Próxima"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-steel-700 text-paper hover:border-accent-400 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-lg flex-col items-center gap-4"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image src={active.src} alt={active.title} fill sizes="512px" className="object-cover" />
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="font-display text-lg font-semibold uppercase tracking-tight text-paper">
                  {active.title}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    requestService(active.serviceSlug);
                    setOpenIndex(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-400"
                >
                  Quero esse resultado no meu carro
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
