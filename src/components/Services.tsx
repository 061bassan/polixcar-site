"use client";

import { motion } from "framer-motion";
import {
  Armchair,
  Bike,
  Brush,
  Cog,
  Droplets,
  Eye,
  Feather,
  Gem,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wand2,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { serviceCategories } from "@/lib/site";
import { useFormSelection } from "@/lib/form-selection";

const categoryIcons: Record<string, LucideIcon> = {
  "Lavagem & Descontaminação": Droplets,
  "Estética de pintura": Sparkles,
  "Interior & Conforto": Armchair,
  "Faróis & Vidros": Lightbulb,
  Motos: Bike,
};

const itemIcons: Record<string, LucideIcon> = {
  "lavagem-completa": Droplets,
  descontaminacao: SprayCan,
  "lavagem-motor": Cog,
  polimento: Gem,
  vitrificacao: ShieldCheck,
  enceramento: Wand2,
  "higienizacao-interna": Brush,
  "hidratacao-couro": Feather,
  "remocao-odores": Wind,
  farol: Lightbulb,
  vidros: Eye,
  "moto-lavagem": Bike,
};

export function Services() {
  const { requestService } = useFormSelection();

  return (
    <section id="servicos" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
            Serviços
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-ink sm:text-4xl">
            Do básico ao acabamento de vitrine
          </h2>
          <p className="mt-3 text-steel-500">
            Escolha um serviço abaixo. O botão já leva você pro formulário com essa opção marcada.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {serviceCategories.map((category, ci) => {
            const CategoryIcon = categoryIcons[category.category] ?? Sparkles;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: ci * 0.05 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-accent-400">
                    <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
                    {category.category}
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, ii) => {
                    const ItemIcon = itemIcons[item.slug] ?? Sparkles;
                    return (
                      <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: ii * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-steel-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-500/15"
                      >
                        <div
                          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-500/0 blur-2xl transition-colors duration-500 group-hover:bg-accent-500/15"
                          aria-hidden="true"
                        />
                        <div className="relative">
                          <motion.span
                            whileHover={{ rotate: -8, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 300, damping: 12 }}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-steel-100 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-paper"
                          >
                            <ItemIcon className="h-5 w-5" aria-hidden="true" />
                          </motion.span>
                          <h4 className="mt-4 font-display text-base font-semibold uppercase tracking-tight text-ink">
                            {item.name}
                          </h4>
                          <p className="mt-2 text-sm text-steel-500">{item.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => requestService(item.slug)}
                          className="relative mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent-600 transition-colors hover:text-accent-500"
                        >
                          Quero esse serviço
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
