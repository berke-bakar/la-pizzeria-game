import { create } from "zustand";
import * as THREE from "three";
import { hashStringToNumber } from "@/utils/utils";
import { IngredientType } from "@/constants/constants";

export const useToppings = create<{
  toppings: { id: number[]; initialPos: THREE.Vector3; type: IngredientType }[];
  lastAddedTopping: {
    id: number[];
    initialPos: THREE.Vector3;
    type: IngredientType;
  } | null;
  total: number;
  isPizzaBaseSpawned: boolean;
  addTopping: (
    key: IngredientType,
    initialPos: THREE.Vector3,
    bodyCount?: number
  ) => void;
  clearToppings: () => void;
  spawnPizzaBase: () => void;
  addToTotal: (amount: number) => void;
  clearTotal: () => void;
}>()((set) => ({
  toppings: [],
  lastAddedTopping: null,
  total: 0,
  isPizzaBaseSpawned: false,
  addTopping: (
    key: IngredientType,
    initialPos: THREE.Vector3,
    bodyCount: number = 3
  ) => {
    return set((state) => {
      let usedId: number[] = [
        hashStringToNumber(`${key}-${state.toppings.length}`),
      ];
      if (bodyCount > 1) {
        for (let i = 0; i < bodyCount - 1; i++) {
          usedId.push(
            hashStringToNumber(`${key}-${state.toppings.length}-${i}`)
          );
        }
      }

      const newTopping = {
        id: usedId,
        initialPos: initialPos,
        type: key,
      };

      return {
        toppings: [...state.toppings, newTopping],
        lastAddedTopping: newTopping,
      };
    });
  },
  clearToppings: () =>
    set((state) => ({
      toppings: [],
      lastAddedTopping: null,
      isPizzaBaseSpawned: false,
    })),
  spawnPizzaBase: () => set((state) => ({ isPizzaBaseSpawned: true })),
  addToTotal: (amount: number) =>
    set((state) => ({ total: state.total + amount })),
  clearTotal: () => set(() => ({ total: 0 })),
}));
