"use client";

import { createContext, useContext, useState } from "react";

type LoaderContextValue = {
  /** True once the preloader has started its exit; the hero sequence keys off this. */
  ready: boolean;
  setReady: (v: boolean) => void;
};

const LoaderContext = createContext<LoaderContextValue>({ ready: true, setReady: () => {} });

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return <LoaderContext.Provider value={{ ready, setReady }}>{children}</LoaderContext.Provider>;
}

export function usePageReady() {
  return useContext(LoaderContext);
}
