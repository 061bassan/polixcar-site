"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { galleryItems } from "@/lib/site";

const picks = ["farol", "lavagem", "interna"];

const layout = [
  { top: "4%", left: "12%", width: "48%", height: "48%", rotate: -8, z: 10, float: 4.5 },
  { top: "34%", left: "40%", width: "54%", height: "54%", rotate: 6, z: 20, float: 5.5 },
  { top: "58%", left: "2%", width: "42%", height: "42%", rotate: 11, z: 5, float: 5 },
];

export function HeroShowcase() {
  const photos = picks
    .map((slug) => galleryItems.find((g) => g.slug === slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="relative h-64 w-64 sm:h-80 sm:w-80">
      <div className="absolute inset-0 rounded-full bg-accent-500/10 blur-3xl" />

      {photos.map((photo, i) => {
        const l = layout[i];
        return (
          <motion.div
            key={photo.slug}
            className="absolute overflow-hidden rounded-2xl border-2 border-steel-800 shadow-2xl shadow-black/50"
            style={{ top: l.top, left: l.left, width: l.width, height: l.height, zIndex: l.z }}
            initial={{ opacity: 0, y: 24, rotate: l.rotate }}
            animate={{ opacity: 1, y: [0, -10, 0], rotate: l.rotate }}
            transition={{
              opacity: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
              y: { duration: l.float, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
            }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="180px"
              className="object-cover"
            />
          </motion.div>
        );
      })}

      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="absolute -bottom-1 right-0 z-30 inline-flex items-center gap-1.5 rounded-full border border-accent-400/40 bg-ink/90 px-3 py-1.5 text-xs font-semibold text-accent-400 shadow-lg backdrop-blur"
      >
        Resultados reais
      </motion.span>
    </div>
  );
}
