"use client";

import { motion } from "framer-motion";
import { site, testimonials } from "@/lib/site";
import { StarIcon } from "./StarIcon";

export function SocialProof() {
  return (
    <section className="bg-ink py-16 text-paper sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
              Quem já confiou
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
              O que dizem no Google sobre a gente
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <a
              href={site.googleReview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-steel-700 bg-steel-950 px-4 py-2 text-sm transition-colors hover:border-accent-400"
            >
              <span className="flex text-accent-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="font-semibold text-paper">
                {site.googleReview.rating.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-steel-400">
                ({site.googleReview.count} avaliações no Google)
              </span>
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-paper px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink sm:self-end"
            >
              Ver mais resultados no @{site.instagramHandle.replace("@", "")}
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col gap-3 rounded-2xl border border-steel-800 bg-steel-950 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex text-accent-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} className="h-4 w-4" />
                  ))}
                </span>
                <span className="text-xs text-steel-500">{t.timeAgo}</span>
              </div>
              <p className="text-sm text-steel-200">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-auto pt-2 text-xs font-semibold uppercase tracking-wide text-steel-400">
                {t.name}
                {t.badge && <span className="ml-2 normal-case text-accent-400">· {t.badge}</span>}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
