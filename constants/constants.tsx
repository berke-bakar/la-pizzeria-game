import {
  AnchoviesInstances,
  AnchoviesModel,
} from "@/components/models/Anchovies_Slice_Fish_0";
import {
  BaconInstances,
  BaconModel,
} from "@/components/models/Bacon_Slice_Bacon_0";
import {
  ChickenInstances,
  ChickenModel,
} from "@/components/models/Chicken_Slice_Chicken_0";
import { HamInstances, HamModel } from "@/components/models/Ham_Slice_Ham_0";
import {
  MushroomInstances,
  MushroomModel,
} from "@/components/models/Mushroom_Slice_Mushroom_0";
import {
  OnionInstances,
  OnionModel,
} from "@/components/models/Onion_Slice_Onion_0";
import {
  PickleInstances,
  PickleModel,
} from "@/components/models/Pickle_Slice_Pickles_0";
import {
  PineappleInstances,
  PineappleModel,
} from "@/components/models/Pineapple_Slice_Pineapple_0";
import {
  SalamiInstances,
  SalamiModel,
} from "@/components/models/Salami_Slice_Salami_0";
import {
  SausageInstances,
  SausageModel,
} from "@/components/models/Sausage_Slice_Sausage_0";
import {
  ShrimpInstances,
  ShrimpModel,
} from "@/components/models/Shrimp_Slice_Shrimp_0";
import {
  TomatoInstances,
  TomatoModel,
} from "@/components/models/Tomato_Slice_Tomato_0";
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
import { PeppersInstances, PeppersModel } from "@/components/models/Peppers";
import { OlivesInstances, OlivesModel } from "@/components/models/Olives";
import { Asset } from "expo-asset";
import { SvgProps } from "react-native-svg";

/**
 * Ingredients info
 */
export const INGREDIENTS: Record<
  string,
  {
    Instances: (props: any) => React.JSX.Element;
    Model: (props: any) => React.JSX.Element;
    icon: React.FC<SvgProps>;
    price: number;
  }
> = {
  anchovies: {
    Instances: AnchoviesInstances,
    Model: AnchoviesModel,
    icon: AnchoviesIcon,
    price: 0,
  },
  bacon: {
    Instances: BaconInstances,
    Model: BaconModel,
    icon: BaconIcon,
    price: 10,
  },
  chicken: {
    Instances: ChickenInstances,
    Model: ChickenModel,
    icon: ChickenIcon,
    price: 10,
  },
  ham: {
    Instances: HamInstances,
    Model: HamModel,
    icon: HamIcon,
    price: 10,
  },
  mushroom: {
    Instances: MushroomInstances,
    Model: MushroomModel,
    icon: MushroomIcon,
    price: 10,
  },
  olives: {
    Instances: OlivesInstances,
    Model: OlivesModel,
    icon: OlivesIcon,
    price: 10,
  },
  onion: {
    Instances: OnionInstances,
    Model: OnionModel,
    icon: OnionIcon,
    price: 10,
  },
  peppers: {
    Instances: PeppersInstances,
    Model: PeppersModel,
    icon: PeppersIcon,
    price: 10,
  },
  pickle: {
    Instances: PickleInstances,
    Model: PickleModel,
    icon: PickleIcon,
    price: 20,
  },
  pineapple: {
    Instances: PineappleInstances,
    Model: PineappleModel,
    icon: PineappleIcon,
    price: 30,
  },
  salami: {
    Instances: SalamiInstances,
    Model: SalamiModel,
    icon: SalamiIcon,
    price: 40,
  },
  sausage: {
    Instances: SausageInstances,
    Model: SausageModel,
    icon: SausageIcon,
    price: 50,
  },
  shrimp: {
    Instances: ShrimpInstances,
    Model: ShrimpModel,
    icon: ShrimpIcon,
    price: 60,
  },
  tomato: {
    Instances: TomatoInstances,
    Model: TomatoModel,
    icon: TomatoIcon,
    price: 70,
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
    // Packaging and reaction
    {
      position: [8, 4, 0],
      rotation: {
        x: -MathUtils.DEG2RAD * 22.5,
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
}>({
  show: false,
  OverlayItem: null,
});

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
    // TODO: Play audio
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
    // TODO: Animation controller needed
  },
  {
    phase: "pizzaTakeOut",
    subphase: "nextButtonActive",
    nextButtonText: "Deliver",
  },
  {
    phase: "delivery",
    subphase: "reaction",
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
];

export const gamePhaseControllerAtom = atom(
  (get) => {
    const currentPhaseIndex = get(currentPhaseIndexAtom);
    console.log("Current phase", GAME_PHASES[currentPhaseIndex]);
    return GAME_PHASES[currentPhaseIndex % GAME_PHASES.length];
  },
  (get, set, action) => {
    const currentPhaseIndex = get(currentPhaseIndexAtom);
    if (action === "advancePhase") {
      set(
        currentPhaseIndexAtom,
        Math.min(currentPhaseIndex + 1, GAME_PHASES.length - 1)
      );
    } else if (action === "retreatPhase") {
      set(currentPhaseIndexAtom, Math.max(currentPhaseIndex - 1, 0));
    } else if (action === "reset") {
      set(currentPhaseIndexAtom, RESET);
    }
  }
);
