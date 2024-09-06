import { INGREDIENTS } from "@/constants/constants";
import { create } from "zustand";

export const useToppings = create<{
  toppings: { id: number; name: string }[];
  lastAddedTopping: { id: number; name: string } | null;
  total: number;
  addTopping: any;
  clearToppings: any;
}>()((set) => ({
  toppings: [],
  lastAddedTopping: null,
  total: 0,
  addTopping: (topping: { id: number; name: string }) =>
    set((state) => ({
      toppings: [...state.toppings, topping],
      lastAddedTopping: topping,
      total: state.total + INGREDIENTS[topping.name].price,
    })),
  clearToppings: () =>
    set((state) => ({ toppings: [], lastAddedTopping: null, total: 0 })),
}));
