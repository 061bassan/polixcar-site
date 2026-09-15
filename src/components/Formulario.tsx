"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { mainServiceSlugs, services, waLink } from "@/lib/site";
import { useFormSelection } from "@/lib/form-selection";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

const veiculoOptions = [
  { slug: "carro", label: "Carro pequeno/médio" },
  { slug: "suv", label: "SUV/Camionete" },
  { slug: "moto", label: "Moto" },
];

const quandoOptions = [
  { slug: "hoje", label: "Hoje" },
  { slug: "semana", label: "Essa semana" },
  { slug: "cotando", label: "Só cotando por enquanto" },
];

function joinPt(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function buildMessage(servicos: string[], veiculo: string[], quando: string[], nome: string) {
  const parts: string[] = [];
  const labels = servicos
    .filter((slug) => slug !== "outro")
    .map((slug) => services.find((s) => s.slug === slug)?.name)
    .filter((v): v is string => Boolean(v));

  if (labels.length > 0) {
    parts.push(`Olá! Gostaria de agendar: ${joinPt(labels)}.`);
  } else if (servicos.includes("outro")) {
    parts.push("Olá! Quero saber mais sobre os serviços da PoliXcar.");
  } else {
    parts.push("Olá! Vim pelo site da PoliXcar e quero saber mais.");
  }

  const veiculoLabel = veiculoOptions.find((v) => v.slug === veiculo[0])?.label;
  if (veiculoLabel) parts.push(`Veículo: ${veiculoLabel}.`);

  const quandoLabel = quandoOptions.find((q) => q.slug === quando[0])?.label;
  if (quandoLabel) parts.push(`Prefiro: ${quandoLabel}.`);

  if (nome.trim()) parts.push(`Meu nome é ${nome.trim()}.`);

  return parts.join(" ");
}

function Chips({
  legend,
  options,
  value,
  onChange,
  multiple,
  highlightSlug,
  highlightKey,
}: {
  legend: string;
  options: { slug: string; label: string }[];
  value: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  highlightSlug?: string | null;
  highlightKey?: number;
}) {
  function toggle(slug: string) {
    if (multiple) {
      onChange(value.includes(slug) ? value.filter((v) => v !== slug) : [...value, slug]);
    } else {
      onChange(value.includes(slug) ? [] : [slug]);
    }
  }

  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-widest text-accent-400">
        {legend}
        {multiple && <span className="ml-1 normal-case text-steel-500">(pode marcar mais de um)</span>}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt.slug);
          const isPulsing = highlightSlug === opt.slug;
          return (
            <motion.button
              key={isPulsing ? `${opt.slug}-${highlightKey}` : opt.slug}
              type="button"
              initial={isPulsing ? { scale: 1.15 } : false}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => toggle(opt.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-accent-500 bg-accent-500 text-paper"
                  : "border-steel-700 bg-steel-900/60 text-steel-200 hover:border-accent-400 hover:text-accent-400",
              )}
            >
              {opt.label}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Formulario() {
  const { requestedService } = useFormSelection();
  const [servicos, setServicos] = useState<string[]>([]);
  const [veiculo, setVeiculo] = useState<string[]>([]);
  const [quando, setQuando] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState(false);
  const nomeRef = useRef<HTMLInputElement>(null);
  const [appliedKey, setAppliedKey] = useState(0);

  if (requestedService && requestedService.key !== appliedKey) {
    setAppliedKey(requestedService.key);
    setServicos((prev) => (prev.includes(requestedService.slug) ? prev : [...prev, requestedService.slug]));
  }

  const curated = mainServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const extra = services.filter((s) => servicos.includes(s.slug) && !mainServiceSlugs.includes(s.slug));
  const servicoOptions = [
    ...curated.map((s) => ({ slug: s.slug, label: s.name })),
    ...extra.map((s) => ({ slug: s.slug, label: s.name })),
    { slug: "outro", label: "Outro / não sei ainda" },
  ];

  const message = buildMessage(servicos, veiculo, quando, nome);
  const href = waLink(message);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nome.trim()) {
      setNomeError(true);
      nomeRef.current?.focus();
      return;
    }
    setNomeError(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="orcamento" className="bg-steel-950 py-16 text-paper sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
            Orçamento rápido
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            Monte seu pedido e chame no WhatsApp
          </h2>
          <p className="mt-3 max-w-xl text-sm text-steel-300">
            Escolha as opções abaixo. A gente monta a mensagem pra você e já abre direto no WhatsApp.
          </p>
        </motion.div>

        <motion.form
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 space-y-6 rounded-2xl border border-accent-400/25 bg-steel-900/50 p-6 sm:p-8"
        >
          <Chips
            legend="Qual serviço você quer"
            options={servicoOptions}
            value={servicos}
            onChange={setServicos}
            multiple
            highlightSlug={requestedService?.slug ?? null}
            highlightKey={requestedService?.key}
          />

          <Chips legend="Tipo de veículo" options={veiculoOptions} value={veiculo} onChange={setVeiculo} />
          <Chips legend="Quando pretende fazer" options={quandoOptions} value={quando} onChange={setQuando} />

          <div>
            <label htmlFor="nome" className="text-xs font-semibold uppercase tracking-widest text-accent-400">
              Seu nome
            </label>
            <input
              id="nome"
              ref={nomeRef}
              type="text"
              required
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (nomeError) setNomeError(false);
              }}
              placeholder="Como podemos te chamar?"
              aria-invalid={nomeError}
              className={cn(
                "mt-3 w-full rounded-full border bg-steel-900/60 px-4 py-2.5 text-sm text-paper placeholder:text-steel-500 outline-none",
                nomeError ? "border-red-500 focus:border-red-400" : "border-steel-700 focus:border-accent-400",
              )}
            />
            {nomeError && (
              <p className="mt-2 text-xs text-red-400">Conta seu nome pra gente saber quem está chamando.</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90 sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chamar no WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  );
}
