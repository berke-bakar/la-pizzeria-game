import React, {
  forwardRef,
  Ref,
  RefObject,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { INGREDIENTS } from "@/constants/constants";
import { PizzaBaseInstances, PizzaBaseModel } from "./models/PizzaBase";
import { Group, Object3DEventMap } from "three";
import { WorldContext } from "@/context/PhysicsProvider";
import { useToppings } from "@/hooks/useToppings";
import { BaconInstances, BaconModel } from "./models/Bacon_Slice_Bacon_0";
import { generateRandomPos } from "@/utils/utils";
import { ToppingType } from "@/constants/types";
import {
  AnchoviesInstances,
  AnchoviesModel,
} from "./models/Anchovies_Slice_Fish_0";
import {
  ChickenInstances,
  ChickenModel,
} from "./models/Chicken_Slice_Chicken_0";
import { HamInstances, HamModel } from "./models/Ham_Slice_Ham_0";
import {
  MushroomInstances,
  MushroomModel,
} from "./models/Mushroom_Slice_Mushroom_0";
import { OnionInstances, OnionModel } from "./models/Onion_Slice_Onion_0";
import { OlivesInstances, OlivesModel } from "./models/Olives";
import { PeppersInstances, PeppersModel } from "./models/Peppers";
import { PickleInstances, PickleModel } from "./models/Pickle_Slice_Pickles_0";
import {
  PineappleInstances,
  PineappleModel,
} from "./models/Pineapple_Slice_Pineapple_0";
import { SalamiInstances, SalamiModel } from "./models/Salami_Slice_Salami_0";
import {
  SausageInstances,
  SausageModel,
} from "./models/Sausage_Slice_Sausage_0";
import { ShrimpInstances, ShrimpModel } from "./models/Shrimp_Slice_Shrimp_0";
import { TomatoInstances, TomatoModel } from "./models/Tomato_Slice_Tomato_0";

export type PizzaMakerRefProps = {
  group: RefObject<Group<Object3DEventMap> | undefined>;
};
export type PizzaMakerRef = Ref<PizzaMakerRefProps>;

type PizzaMakerProps = Omit<JSX.IntrinsicElements["group"], "ref">;

const PizzaMaker = forwardRef<PizzaMakerRefProps, PizzaMakerProps>(
  function PizzaMaker(props, ref) {
    const [addTopping, lastAddedTopping, toppings] = useToppings((state) => [
      state.addTopping,
      state.lastAddedTopping,
      state.toppings,
    ]);
    const world = useContext(WorldContext);
    const group = useRef<Group>();

    useImperativeHandle(
      ref,
      () => ({
        group: group,
      }),
      [group]
    );

    const renderToppingsModels = (
      toppingType: string,
      Model: (props: any) => React.JSX.Element,
      toppingsList: ToppingType[]
    ) => {
      if (!toppingsList || !toppingsList.length) return null;

      return toppingsList.map((topping, toppingIndex) => {
        let position = topping.initialPos;

        if (Array.isArray(topping.id) && world) {
          const body = world.bodies.find((body) => body.id === topping.id[0]);
          if (body) {
            position.copy(body.position);
          }
        } else if (topping.id !== lastAddedTopping?.id && world) {
          const body = world.bodies.find((body) => body.id === topping.id);
          if (body) {
            position.copy(body.position);
          }
        }

        return (
          <Model
            key={`${toppingType}-${toppingIndex}`}
            position={position}
            bodyId={Array.isArray(topping.id) ? topping.id[0] : topping.id}
          />
        );
      });
    };

    return (
      <group ref={group} dispose={null}>
        <PizzaBaseInstances
          onPointerDown={() => {
            const toppingList = Object.keys(INGREDIENTS);
            const randomTopping =
              toppingList[Math.floor(Math.random() * (toppingList.length - 1))];
            addTopping(
              randomTopping,
              generateRandomPos(1, 1, [2.5, 2.5, -3.2])
            );
          }}
          frustumCulled={false}
        >
          {renderToppingsModels(
            "pizzaBase",
            PizzaBaseModel,
            toppings["pizzaBase"]
          )}
        </PizzaBaseInstances>
        <AnchoviesInstances frustumCulled={false}>
          {renderToppingsModels(
            "anchovies",
            AnchoviesModel,
            toppings["anchovies"]
          )}
        </AnchoviesInstances>
        <BaconInstances frustumCulled={false}>
          {renderToppingsModels("bacon", BaconModel, toppings["bacon"])}
        </BaconInstances>
        <ChickenInstances frustumCulled={false}>
          {renderToppingsModels("chicken", ChickenModel, toppings["chicken"])}
        </ChickenInstances>
        <HamInstances frustumCulled={false}>
          {renderToppingsModels("ham", HamModel, toppings["ham"])}
        </HamInstances>
        <MushroomInstances frustumCulled={false}>
          {renderToppingsModels(
            "mushroom",
            MushroomModel,
            toppings["mushroom"]
          )}
        </MushroomInstances>
        <OlivesInstances frustumCulled={false}>
          {renderToppingsModels("olives", OlivesModel, toppings["olives"])}
        </OlivesInstances>
        <OnionInstances frustumCulled={false}>
          {renderToppingsModels("onion", OnionModel, toppings["onion"])}
        </OnionInstances>
        <PeppersInstances frustumCulled={false}>
          {renderToppingsModels("peppers", PeppersModel, toppings["peppers"])}
        </PeppersInstances>
        <PickleInstances frustumCulled={false}>
          {renderToppingsModels("pickle", PickleModel, toppings["pickle"])}
        </PickleInstances>
        <PineappleInstances frustumCulled={false}>
          {renderToppingsModels(
            "pineapple",
            PineappleModel,
            toppings["pineapple"]
          )}
        </PineappleInstances>
        <SalamiInstances frustumCulled={false}>
          {renderToppingsModels("salami", SalamiModel, toppings["salami"])}
        </SalamiInstances>
        <SausageInstances frustumCulled={false}>
          {renderToppingsModels("sausage", SausageModel, toppings["sausage"])}
        </SausageInstances>
        <ShrimpInstances frustumCulled={false}>
          {renderToppingsModels("shrimp", ShrimpModel, toppings["shrimp"])}
        </ShrimpInstances>
        <TomatoInstances frustumCulled={false}>
          {renderToppingsModels("tomato", TomatoModel, toppings["tomato"])}
        </TomatoInstances>
      </group>
    );
  }
);

export default PizzaMaker;
