import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { TitleCycler } from "@/components/TitleCycler";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://polixcar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PoliXcar Estética Automotiva | Lavagem, Polimento e Vitrificação em Brasília",
  description:
    "Lavagem detalhada, polimento, revitalização de farol e vitrificação de pintura no Lago Sul e Quintas do Sol, Brasília-DF. Atendimento agendado pelo WhatsApp.",
  keywords: [
    "estética automotiva Brasília",
    "polimento automotivo Lago Sul",
    "vitrificação de pintura",
    "revitalização de farol",
    "lavagem detalhada carro",
    "PoliXcar",
  ],
  openGraph: {
    title: "PoliXcar Estética Automotiva",
    description:
      "Proteção e acabamento premium para o seu carro, no Lago Sul e Quintas do Sol, Brasília-DF.",
    url: siteUrl,
    siteName: "PoliXcar Estética Automotiva",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo.jpg", width: 719, height: 736 }],
  },
  twitter: {
    card: "summary",
    title: "PoliXcar Estética Automotiva",
    description:
      "Lavagem detalhada, polimento, revitalização de farol e vitrificação de pintura em Brasília-DF.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <TitleCycler />
        {children}
      </body>
    </html>
  );
}
