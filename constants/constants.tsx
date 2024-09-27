import AnchoviesIcon from "../assets/images/toppings/anchovies.svg";
import BaconIcon from "../assets/images/toppings/bacon.svg";
import ChickenIcon from "../assets/images/toppings/chicken.svg";
import HamIcon from "../assets/images/toppings/ham.svg";
import MushroomIcon from "../assets/images/toppings/mushroom.svg";
import OlivesIcon from "../assets/images/toppings/olives.svg";
import OnionIcon from "../assets/images/toppings/onion.svg";
import PeppersIcon from "../assets/images/toppings/peppers.svg";
import PickleIcon from "../assets/images/toppings/pickle.svg";
import PineappleIcon from "../assets/images/toppings/pineapple.svg";
import SalamiIcon from "../assets/images/toppings/salami.svg";
import SausageIcon from "../assets/images/toppings/sausage.svg";
import ShrimpIcon from "../assets/images/toppings/shrimp.svg";
import TomatoIcon from "../assets/images/toppings/tomato.svg";

import { atom } from "jotai";
import { atomWithReset, RESET } from "jotai/utils";
import { GamePhase, State } from "./types";
import { MathUtils } from "three";
import { SvgProps } from "react-native-svg";

export type IngredientType =
  | "anchovies"
  | "bacon"
  | "chicken"
  | "ham"
  | "mushroom"
  | "olives"
  | "onion"
  | "peppers"
  | "pickle"
  | "pineapple"
  | "salami"
  | "sausage"
  | "shrimp"
  | "tomato";

/**
 * Ingredients info
 */
export const INGREDIENTS: Record<
  IngredientType,
  {
    icon: React.FC<SvgProps>;
    price: number;
    unitPrice: number;
  }
> = {
  anchovies: {
    icon: AnchoviesIcon,
    price: 120,
    unitPrice: 2,
  },
  bacon: {
    icon: BaconIcon,
    price: 100,
    unitPrice: 1.5,
  },
  chicken: {
    icon: ChickenIcon,
    price: 110,
    unitPrice: 1.2,
  },
  ham: {
    icon: HamIcon,
    price: 120,
    unitPrice: 1.4,
  },
  mushroom: {
    icon: MushroomIcon,
    price: 150,
    unitPrice: 1.5,
  },
  olives: {
    icon: OlivesIcon,
    price: 140,
    unitPrice: 1.4,
  },
  onion: {
    icon: OnionIcon,
    price: 110,
    unitPrice: 1.4,
  },
  peppers: {
    icon: PeppersIcon,
    price: 160,
    unitPrice: 2.4,
  },
  pickle: {
    icon: PickleIcon,
    price: 180,
    unitPrice: 1,
  },
  pineapple: {
    icon: PineappleIcon,
    price: 150,
    unitPrice: 2,
  },
  salami: {
    icon: SalamiIcon,
    price: 120,
    unitPrice: 1.3,
  },
  sausage: {
    icon: SausageIcon,
    price: 150,
    unitPrice: 1.3,
  },
  shrimp: {
    icon: ShrimpIcon,
    price: 180,
    unitPrice: 2.3,
  },
  tomato: {
    icon: TomatoIcon,
    price: 160,
    unitPrice: 1.2,
  },
};
/**
 * Camera positions for different scenes and phases
 */
export const CAMERA_STATES: Record<string, Array<State>> = {
  menu: [
    // initial position
    {
      position: [0, 2, 10],
      rotation: { x: -0.1, y: 0, z: 0 },
    },
  ],
  game: [
    // Order taking
    { position: [0, 4, 0], rotation: { x: 0, y: 0, z: 0 } },
    // Pizza making
    {
      position: [2.5, 4, 0],
      rotation: { x: -MathUtils.DEG2RAD * 22.5, y: 0, z: 0 },
    },
    // Oven
    {
      position: [5, 4, 0],
      rotation: {
        x: 0,
        y: MathUtils.DEG2RAD * 180,
        z: 0,
      },
    },
    // Packaging
    {
      position: [8, 4, 0],
      rotation: {
        x: -MathUtils.DEG2RAD * 22.5,
        y: 0,
        z: 0,
      },
    },
    // Reaction
    {
      position: [8, 4, 0],
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  ],
};
/**
 * Atom for controlling current scene/stage
 */
export const currentSceneAtom = atom<{
  currentScene: "game" | "menu";
  transitionNeeded: boolean;
}>({ currentScene: "menu", transitionNeeded: true });
export const progressAtom = atom(0);
export const overlayTextAtom = atom<{
  show: boolean;
  OverlayItem: ((props: any) => JSX.Element) | null;
  closeable?: boolean;
}>({
  show: false,
  OverlayItem: null,
  closeable: true,
});
/** Atom for controlling footer visibility */
export const showFooterAtom = atom(true);
/**
 * Atoms for controlling the camera position and otation
 */
// Index for current stage's camera finite state machine
export const cameraStateIndexAtom = atomWithReset(0);
// Atom for current camera state, CameraController consumes this to move and rotate camera
export const currentCameraStateAtom = atom(
  (get) => {
    const { currentScene } = get(currentSceneAtom);
    const index = get(cameraStateIndexAtom);
    return CAMERA_STATES[currentScene][index];
  },
  (get, set, action) => {
    if (action === "advance") {
      const index = get(cameraStateIndexAtom);
      const { currentScene } = get(currentSceneAtom);
      const newIndex = (index + 1) % CAMERA_STATES[currentScene].length;
      set(cameraStateIndexAtom, newIndex);
    } else if (action === "retreat") {
      const index = get(cameraStateIndexAtom);
      const { currentScene } = get(currentSceneAtom);
      const newIndex =
        (index - 1 + CAMERA_STATES[currentScene].length) %
        CAMERA_STATES[currentScene].length;
      set(cameraStateIndexAtom, newIndex);
    }
  }
);
/**
 * Atom for managing game phase state
 */
const currentPhaseIndexAtom = atomWithReset(0);
const GAME_PHASES: Array<GamePhase> = [
  {
    phase: "start",
    subphase: "generateCustomer",
  },
  {
    phase: "start",
    subphase: "doorOpens",
  },
  {
    phase: "start",
    subphase: "customerWalk",
  },
  {
    phase: "takingOrder",
    subphase: "specialButtonActive",
    specialButtonText: "Take Order",
  },
  {
    phase: "takingOrder",
    subphase: "takeOrderDialogue",
  },
  {
    phase: "takingOrder",
    subphase: "nextButtonActive",
    nextButtonText: "Prepare",
  },
  {
    phase: "pizzaMaking",
    subphase: "specialButtonActive",
    specialButtonText: "Spawn Pizza",
  },
  {
    phase: "pizzaMaking",
    subphase: "specialButtonActive",
    specialButtonText: "Ready",
  },
  {
    phase: "pizzaMaking",
    subphase: "nextButtonActive",
    nextButtonText: "Bake",
  },
  {
    phase: "baking",
    subphase: "pizzaToOven",
  },
  {
    phase: "baking",
    subphase: "ovenClose",
  },
  {
    phase: "baking",
    subphase: "waiting",
  },
  {
    phase: "baking",
    subphase: "ovenOpen",
  },
  {
    phase: "baking",
    subphase: "nextButtonActive",
    nextButtonText: "Take out",
  },
  {
    phase: "pizzaTakeOut",
    subphase: "pizzaToBox",
  },
  {
    phase: "pizzaTakeOut",
    subphase: "customerWalk",
  },
  {
    phase: "pizzaTakeOut",
    subphase: "packaging",
  },
  {
    phase: "pizzaTakeOut",
    subphase: "nextButtonActive",
    nextButtonText: "Deliver",
  },
  {
    phase: "delivery",
    subphase: "pizzaRotate",
  },
  {
    phase: "delivery",
    subphase: "pizzaReveal",
  },
  {
    phase: "delivery",
    subphase: "reaction",
  },
  {
    phase: "delivery",
    subphase: "getPaid",
  },
  {
    phase: "delivery",
    subphase: "customerRotate",
  },
  {
    phase: "delivery",
    subphase: "customerWalk",
  },
  {
    phase: "delivery",
    subphase: "nextButtonActive",
    nextButtonText: "New Customer",
  },
  {
    phase: "endGame",
    subphase: "endGame",
  },
];

export const gamePhaseControllerAtom = atom(
  (get) => {
    const currentPhaseIndex = get(currentPhaseIndexAtom);
    return GAME_PHASES[currentPhaseIndex % GAME_PHASES.length];
  },
  (get, set, action: "advancePhase" | "retreatPhase" | "reset") => {
    const currentPhaseIndex = get(currentPhaseIndexAtom);
    if (action === "advancePhase") {
      set(currentPhaseIndexAtom, (currentPhaseIndex + 1) % GAME_PHASES.length);
    } else if (action === "retreatPhase") {
      set(currentPhaseIndexAtom, Math.max(currentPhaseIndex - 1, 0));
    } else if (action === "reset") {
      set(currentPhaseIndexAtom, RESET);
    }
  }
);

export const customerOrderAtom = atom<{
  order: IngredientType[];
  selectedCharacter:
    | "casualMan"
    | "casualWoman"
    | "punk"
    | "suitMan"
    | "suitWoman"
    | "worker";
  show: boolean;
}>({
  order: ["mushroom", "anchovies"],
  selectedCharacter: "suitMan",
  show: false,
});

export const typingFinishedAtom = atom(false);
export const todaysCustomerRatings = atomWithReset<number[]>([]);
