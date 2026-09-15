"use client";

import { createContext, useContext, useRef, useState } from "react";

type FormSelectionContextValue = {
  requestedService: { slug: string; key: number } | null;
  requestService: (slug: string) => void;
};

const FormSelectionContext = createContext<FormSelectionContextValue | null>(null);

export function FormSelectionProvider({ children }: { children: React.ReactNode }) {
  const [requestedService, setRequestedService] = useState<{ slug: string; key: number } | null>(
    null,
  );
  const keyRef = useRef(0);

  function requestService(slug: string) {
    keyRef.current += 1;
    setRequestedService({ slug, key: keyRef.current });
    document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <FormSelectionContext.Provider value={{ requestedService, requestService }}>
      {children}
    </FormSelectionContext.Provider>
  );
}

export function useFormSelection() {
  const ctx = useContext(FormSelectionContext);
  if (!ctx) {
    throw new Error("useFormSelection deve ser usado dentro de FormSelectionProvider");
  }
  return ctx;
}
