import { INGREDIENTS } from "@/constants/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  money: number;
  dayCount: number;
  boughtToppings: string[];
  addMoney: (amount: number) => void;
  incrementDay: () => void;
  buyTopping: (topping: string, price: number) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      money: 100,
      dayCount: 1,
      boughtToppings: [
        "bacon",
        "mushroom",
        "olives",
        "onion",
        "peppers",
        "salami",
        "tomato",
      ],
      addMoney: (amount) => set((state) => ({ money: state.money + amount })),
      incrementDay: () => set((state) => ({ dayCount: state.dayCount + 1 })),
      buyTopping: (topping, price) => {
        const boughtToppings = get().boughtToppings;
        if (!boughtToppings.includes(topping)) {
          set((state) => ({
            boughtToppings: [...state.boughtToppings, topping],
            money: state.money - price,
          }));
        }
      },
    }),
    {
      name: "la-pizzeria-game-store",
    }
  )
);

export default useGameStore;
