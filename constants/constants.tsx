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
  Olive0Instances,
  Olive0Model,
} from "@/components/models/Olive_Slice_Oilives_0";
import {
  Olive1Instances,
  Olive1Model,
} from "@/components/models/Olive_Slice_Oilives_0_001";
import {
  OnionInstances,
  OnionModel,
} from "@/components/models/Onion_Slice_Onion_0";
import {
  Pepper0Instances,
  Pepper0Model,
} from "@/components/models/Pepper_Slice_Pepper_0";
import {
  Pepper1Instances,
  Pepper1Model,
} from "@/components/models/Pepper_Slice_Pepper_0_001";
import {
  Pepper2Instances,
  Pepper2Model,
} from "@/components/models/Pepper_Slice_Pepper_0_002";
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

export const INGREDIENTS: Record<
  string,
  {
    Instances: (props: any) => React.JSX.Element;
    Model: (props: any) => React.JSX.Element;
    icon: string;
    price: number;
  }
> = {
  anchovies: {
    Instances: AnchoviesInstances,
    Model: AnchoviesModel,
    icon: "🍞",
    price: 0,
  },
  bacon: {
    Instances: BaconInstances,
    Model: BaconModel,
    icon: "🥓",
    price: 0,
  },
  chicken: {
    Instances: ChickenInstances,
    Model: ChickenModel,
    icon: "🍗",
    price: 0,
  },
  ham: {
    Instances: HamInstances,
    Model: HamModel,
    icon: "🍖",
    price: 0,
  },
  mushroom: {
    Instances: MushroomInstances,
    Model: MushroomModel,
    icon: "🍄",
    price: 0,
  },
  olive0: {
    Instances: Olive0Instances,
    Model: Olive0Model,
    icon: "⚫",
    price: 0,
  },
  olive1: {
    Instances: Olive1Instances,
    Model: Olive1Model,
    icon: "⚫",
    price: 0,
  },
  onion: {
    Instances: OnionInstances,
    Model: OnionModel,
    icon: "🧅",
    price: 0,
  },
  pepper0: {
    Instances: Pepper0Instances,
    Model: Pepper0Model,
    icon: "🌶",
    price: 0,
  },
  pepper1: {
    Instances: Pepper1Instances,
    Model: Pepper1Model,
    icon: "🌶",
    price: 0,
  },
  pepper2: {
    Instances: Pepper2Instances,
    Model: Pepper2Model,
    icon: "🌶",
    price: 0,
  },
  pickle: {
    Instances: PickleInstances,
    Model: PickleModel,
    icon: "🌶",
    price: 0,
  },
  pineapple: {
    Instances: PineappleInstances,
    Model: PineappleModel,
    icon: "🌶",
    price: 0,
  },
  salami: {
    Instances: SalamiInstances,
    Model: SalamiModel,
    icon: "🌶",
    price: 0,
  },
  sausage: {
    Instances: SausageInstances,
    Model: SausageModel,
    icon: "🌶",
    price: 0,
  },
  shrimp: {
    Instances: ShrimpInstances,
    Model: ShrimpModel,
    icon: "🌶",
    price: 0,
  },
  tomato: {
    Instances: TomatoInstances,
    Model: TomatoModel,
    icon: "🌶",
    price: 0,
  },
};
