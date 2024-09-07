import { INGREDIENTS } from "@/constants/constants";
import { create } from "zustand";
import * as THREE from "three";
import { hashStringToNumber } from "@/utils/utils";

export const useToppings = create<{
  toppings: Record<string, { id: number; initialPos: THREE.Vector3 }[]>;
  lastAddedTopping: { id: number; initialPos: THREE.Vector3 } | null;
  total: number;
  addTopping: (key: string, initialPos: THREE.Vector3) => void;
  clearToppings: () => void;
}>()((set) => ({
  toppings: {},
  lastAddedTopping: null,
  total: 0,
  addTopping: (key: string, initialPos: THREE.Vector3) =>
    set((state) => ({
      toppings: {
        ...state.toppings,
        [key]: [
          ...(state.toppings[key] || []),
          {
            id: hashStringToNumber(
              `${key}-${(state.toppings[key] || []).length}`
            ),
            initialPos: initialPos,
          },
        ],
      },
      lastAddedTopping: {
        id: hashStringToNumber(`${key}-${(state.toppings[key] || []).length}`),
        initialPos: initialPos,
      },
      total: state.total + INGREDIENTS[key].price,
    })),
  clearToppings: () =>
    set((state) => ({ toppings: {}, lastAddedTopping: null, total: 0 })),
}));
