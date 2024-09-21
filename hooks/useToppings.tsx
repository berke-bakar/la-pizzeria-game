import { create } from "zustand";
import * as THREE from "three";
import { hashStringToNumber } from "@/utils/utils";

export const useToppings = create<{
  toppings: Record<string, { id: number[]; initialPos: THREE.Vector3 }[]>;
  lastAddedTopping: { id: number | number[]; initialPos: THREE.Vector3 } | null;
  total: number;
  addTopping: (
    key: string,
    initialPos: THREE.Vector3,
    bodyCount?: number
  ) => void;
  clearToppings: () => void;
  addToTotal: (amount: number) => void;
  clearTotal: () => void;
}>()((set) => ({
  toppings: {},
  lastAddedTopping: null,
  total: 0,
  addTopping: (
    key: string,
    initialPos: THREE.Vector3,
    bodyCount: number = 3
  ) => {
    return set((state) => {
      let usedId: number[] = [
        hashStringToNumber(`${key}-${(state.toppings[key] || []).length}`),
      ];
      if (bodyCount > 1) {
        for (let i = 0; i < bodyCount - 1; i++) {
          usedId.push(
            hashStringToNumber(
              `${key}-${(state.toppings[key] || []).length}-${i}`
            )
          );
        }
      }

      let currentToppings = { ...state.toppings };
      if (key === "pizzaBase" && currentToppings[key]) {
        currentToppings[key] = [];
      }

      return {
        toppings: {
          ...currentToppings,
          [key]: [
            ...(currentToppings[key] || []),
            {
              id: usedId,
              initialPos: initialPos,
            },
          ],
        },
        lastAddedTopping: {
          id: usedId,
          initialPos: initialPos,
        },
      };
    });
  },
  clearToppings: () =>
    set((state) => ({ toppings: {}, lastAddedTopping: null })),
  addToTotal: (amount: number) =>
    set((state) => ({ total: state.total + amount })),
  clearTotal: () => set(() => ({ total: 0 })),
}));
