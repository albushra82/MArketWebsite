import type { Reference } from "./types";

export const references: Reference[] = [];

export const referenceMap = Object.fromEntries(references.map((r) => [r.id, r]));
