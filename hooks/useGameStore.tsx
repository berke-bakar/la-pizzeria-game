import { INGREDIENTS } from "@/constants/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  wallet: number;
  dayCount: number;
  boughtToppings: string[];
  addMoney: (amount: number) => void;
  incrementDay: () => void;
  buyTopping: (topping: string, price: number) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      wallet: 100,
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
      addMoney: (amount) => set((state) => ({ wallet: state.wallet + amount })),
      incrementDay: () => set((state) => ({ dayCount: state.dayCount + 1 })),
      buyTopping: (topping, price) => {
        const boughtToppings = get().boughtToppings;
        const currentWallet = get().wallet;
        if (!boughtToppings.includes(topping) && currentWallet >= price) {
          set((state) => ({
            boughtToppings: [...state.boughtToppings, topping],
            wallet: state.wallet - price,
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
