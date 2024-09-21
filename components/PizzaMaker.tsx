import React, {
  forwardRef,
  Ref,
  RefObject,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { PizzaBaseInstances, PizzaBaseModel } from "./models/PizzaBase";
import { Group, Object3DEventMap } from "three";
import { WorldContext } from "@/context/PhysicsProvider";
import { useToppings } from "@/hooks/useToppings";
import { ToppingType } from "@/constants/types";
import { ThreeEvent } from "@react-three/fiber/native";
import { useAtomValue } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";
import { selectedToppingAtom } from "./models/ToppingsContainer";
import { generateRandomPos } from "@/utils/utils";
import { ToppingInstances, ToppingModel } from "./models/Toppings";

export type PizzaMakerRefProps = {
  group: RefObject<Group<Object3DEventMap> | undefined>;
  setFrustumCulled: React.Dispatch<React.SetStateAction<boolean>>;
};
export type PizzaMakerRef = Ref<PizzaMakerRefProps>;

type PizzaMakerProps = Omit<JSX.IntrinsicElements["group"], "ref">;

const PizzaMaker = forwardRef<PizzaMakerRefProps, PizzaMakerProps>(
  function PizzaMaker(props, ref) {
    const [toppings, addTopping] = useToppings((state) => [
      state.toppings,
      state.addTopping,
    ]);
    const selectedTopping = useAtomValue(selectedToppingAtom);
    const world = useContext(WorldContext);
    const currentGamePhase = useAtomValue(gamePhaseControllerAtom);
    const group = useRef<Group>();
    const [frustumCulled, setFrustumCulled] = useState(false);

    const handlePointerDown = useRef<
      ((e: ThreeEvent<PointerEvent>) => void) | undefined
    >(undefined);

    useImperativeHandle(
      ref,
      () => ({
        group: group,
        setFrustumCulled: setFrustumCulled,
      }),
      [group, setFrustumCulled, handlePointerDown.current]
    );

    const handleToppingAdd = useMemo(() => {
      if (currentGamePhase.specialButtonText === "Ready") {
        return (e: ThreeEvent<PointerEvent>) => {
          addTopping(
            selectedTopping,
            generateRandomPos(0.855, 1, [2.5, 2.5, -3.2]),
            selectedTopping === "peppers"
              ? 3
              : selectedTopping === "olives"
              ? 2
              : 1
          );
        };
      }
      return undefined;
    }, [currentGamePhase, selectedTopping]);

    const renderToppingsModels = (
      toppingType: string,
      toppingsList: ToppingType[]
    ) => {
      if (!toppingsList || !toppingsList.length) return null;
      return toppingsList.map((topping: ToppingType, toppingIndex) => {
        let position = topping.initialPos;
        if (world) {
          topping.id.forEach((bodyId, ind) => {
            const body = world.bodies.find((body) => body.id === bodyId);
            if (body) {
              position.copy(body.position);
            }
          });
        }
        const Model =
          toppingType === "pizzaBase" ? PizzaBaseModel : ToppingModel;
        return (
          <Model
            key={`${toppingType}-${toppingIndex}`}
            toppingType={toppingType}
            position={position}
            bodyId={topping.id}
          />
        );
      });
    };

    return (
      <group ref={group} dispose={null}>
        <PizzaBaseInstances
          onPointerDown={handleToppingAdd}
          frustumCulled={false}
          key={"pizzaBaseInstances"}
        >
          {renderToppingsModels("pizzaBase", toppings["pizzaBase"])}
        </PizzaBaseInstances>
        <ToppingInstances
          frustumCulled={frustumCulled}
          key={"toppingInstances"}
        >
          {renderToppingsModels("Anchovies", toppings["anchovies"])}
          {renderToppingsModels("Bacon", toppings["bacon"])}
          {renderToppingsModels("Chicken", toppings["chicken"])}
          {renderToppingsModels("Ham", toppings["ham"])}
          {renderToppingsModels("Olives", toppings["olives"])}
          {renderToppingsModels("Onion", toppings["onion"])}
          {renderToppingsModels("Peppers", toppings["peppers"])}
          {renderToppingsModels("Pickle", toppings["pickle"])}
          {renderToppingsModels("Salami", toppings["salami"])}
          {renderToppingsModels("Sausage", toppings["sausage"])}
          {renderToppingsModels("Shrimp", toppings["shrimp"])}
          {renderToppingsModels("Tomato", toppings["tomato"])}
          {renderToppingsModels("Mushroom", toppings["mushroom"])}
          {renderToppingsModels("Pineapple", toppings["pineapple"])}
        </ToppingInstances>
      </group>
    );
  }
);

export default PizzaMaker;
