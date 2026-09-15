"use client";

import { useEffect } from "react";

const titles = ["PoliXcar Estética Automotiva", "Estamos aguardando seu orçamento"];

export function TitleCycler() {
  useEffect(() => {
    let i = 0;
    document.title = titles[0];
    const id = setInterval(() => {
      i = (i + 1) % titles.length;
      document.title = titles[i];
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return null;
}
