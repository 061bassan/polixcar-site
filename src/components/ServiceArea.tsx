"use client";

import { motion } from "framer-motion";
import { hours, hoursNote, site, waLinks } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ServiceArea() {
  return (
    <section id="atendimento" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
              Onde te atendemos
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-ink sm:text-4xl">
              {site.city}
            </h2>
            <p className="mt-4 text-steel-600">
              Nosso espaço fica no {site.ownLocation}. É o lugar ideal para
              trazer o carro e acompanhar o serviço com calma.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-steel-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                Atendemos o Lago Sul e regiões próximas, na sua casa ou condomínio
              </li>
              <li className="flex items-center gap-3 text-steel-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                Buscamos e entregamos o carro em outros pontos de Brasília
              </li>
            </ul>
            <p className="mt-6 text-sm text-steel-500">
              Fora dessas regiões? Chama no WhatsApp e a gente confirma a
              melhor forma de te atender.
            </p>
            <a
              href={waLinks.duvida}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Combinar o melhor atendimento pra mim
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="overflow-hidden rounded-2xl border border-steel-200">
              <iframe
                title={`Mapa: ${site.ownLocation}`}
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full grayscale-[15%] sm:h-64"
              />
            </div>
            <div className="rounded-2xl border border-steel-200 bg-white p-8">
              <p className="font-display text-sm uppercase tracking-widest text-accent-600">
                Horário de atendimento
              </p>
              <dl className="mt-4 divide-y divide-steel-200">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between py-2 text-sm">
                    <dt className="text-steel-500">{day}</dt>
                    <dd className="font-medium text-ink">{time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-steel-500">{hoursNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
