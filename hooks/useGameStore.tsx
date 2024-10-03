import { IngredientType } from "@/constants/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlaybackSettingsType } from "@/constants/types";

interface GameState {
  wallet: number;
  dayCount: number;
  boughtToppings: Record<IngredientType, boolean>;
  playbackSettings: PlaybackSettingsType;
  addMoney: (amount: number) => void;
  incrementDay: () => void;
  buyTopping: (topping: IngredientType, price: number) => void;
  setPlaybackSettings: (
    fn: (prev: PlaybackSettingsType) => Partial<PlaybackSettingsType>
  ) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      wallet: 100,
      dayCount: 1,
      boughtToppings: {
        anchovies: false,
        bacon: true,
        chicken: false,
        ham: false,
        mushroom: true,
        olives: true,
        onion: true,
        peppers: true,
        pickle: false,
        pineapple: false,
        salami: true,
        sausage: false,
        shrimp: false,
        tomato: true,
      },
      playbackSettings: {
        soundEffectsEnabled: true,
        backgroundEnabled: true,
        soundEffectsVolume: 0,
        backgroundVolume: 1,
      },
      addMoney: (amount) => set((state) => ({ wallet: state.wallet + amount })),
      incrementDay: () => set((state) => ({ dayCount: state.dayCount + 1 })),
      buyTopping: (topping, price) => {
        const boughtToppings = get().boughtToppings;
        const currentWallet = get().wallet;
        if (!boughtToppings[topping] && currentWallet >= price) {
          set((state) => ({
            boughtToppings: { ...state.boughtToppings, [topping]: true },
            wallet: state.wallet - price,
          }));
        }
      },
      setPlaybackSettings: (fn) => {
        const prev = get().playbackSettings;
        const partial = fn(prev);
        set((state) => ({
          playbackSettings: { ...prev, ...partial },
        }));
      },
    }),
    {
      name: "la-pizzeria-game-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGameStore;
