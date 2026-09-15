import Image from "next/image";
import { hours, hoursNote, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-steel-950 py-12 text-steel-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="PoliXcar Estética Automotiva"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <span className="font-display text-base font-semibold uppercase tracking-wide text-paper">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm">
            Estética automotiva no Condomínio Quintas do Sol e Jardim
            Botânico (Lago Sul), Brasília-DF.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-paper">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:+${site.phoneWhatsapp}`} className="hover:text-accent-400">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-400"
              >
                {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-paper">
            Horário
          </h3>
          <ul className="mt-4 space-y-1.5 text-sm">
            {hours.map(({ day, time }) => (
              <li key={day} className="flex justify-between gap-6">
                <span>{day}</span>
                <span className="text-steel-100">{time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-steel-500">{hoursNote}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-steel-700 px-4 pt-6 text-xs text-steel-500 sm:px-6">
        © {new Date().getFullYear()} {site.name} {site.tagline}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
