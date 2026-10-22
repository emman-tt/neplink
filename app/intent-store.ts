// Tiny state module: the intent picked in the boarding-flow wizard is read
// later by the final boarding pass. Colocated consumers: IntentPicker.tsx
// (writes) and FinalCta.tsx (reads). No backend — just this module + an
// event so both stay in sync live.

export type Intent = {
  service: string | null; // "STUDY" | "VISA" | "TOUR"
  destination: string | null; // corridor name e.g. "TORONTO"
};

import { useSyncExternalStore } from "react";

const EVENT = "neplink:intent";
const KEY = "neplink:intent";
const EMPTY: Intent = { service: null, destination: null };

// getSnapshot must be referentially stable or React re-renders forever,
// so the parsed object is cached until the value actually changes.
let cache: Intent = EMPTY;
let warm = false;

function read(): Intent {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Intent>;
    const next: Intent = { ...EMPTY, ...parsed };
    if (!warm || next.service !== cache.service || next.destination !== cache.destination) {
      cache = next;
      warm = true;
    }
  } catch {
    /* corrupt storage — keep whatever we had */
  }
  return cache;
}

export function getIntent(): Intent {
  return read();
}

export function setIntent(next: Intent) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useIntent(): Intent {
  return useSyncExternalStore(
    (notify) => {
      const handler = () => notify();
      window.addEventListener(EVENT, handler);
      window.addEventListener("storage", handler);
      return () => {
        window.removeEventListener(EVENT, handler);
        window.removeEventListener("storage", handler);
      };
    },
    getIntent,
    () => EMPTY,
  );
}
