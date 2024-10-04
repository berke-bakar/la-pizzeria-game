import React, {
  forwardRef,
  Ref,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { PizzaBaseInstances, PizzaBaseModel } from "./models/PizzaBase";
import { Group, Object3DEventMap } from "three";
import { useToppings } from "@/hooks/useToppings";
import { ThreeEvent } from "@react-three/fiber/native";
import { useAtomValue } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";
import { selectedToppingAtom } from "../constants/constants";
import { generateRandomPos } from "@/utils/utils";
import { Toppings } from "./models/Toppings";

export type PizzaMakerRefProps = {
  group: RefObject<Group<Object3DEventMap> | undefined>;
  setFrustumCulled: React.Dispatch<React.SetStateAction<boolean>>;
};
export type PizzaMakerRef = Ref<PizzaMakerRefProps>;

type PizzaMakerProps = Omit<JSX.IntrinsicElements["group"], "ref">;

const PizzaMaker = forwardRef<PizzaMakerRefProps, PizzaMakerProps>(
  function PizzaMaker(props, ref) {
    const [addTopping, isPizzaBaseSpawned] = useToppings((state) => [
      state.addTopping,
      state.isPizzaBaseSpawned,
    ]);
    const selectedTopping = useAtomValue(selectedToppingAtom);
    const currentGamePhase = useAtomValue(gamePhaseControllerAtom);
    const group = useRef<Group>();
    const [frustumCulled, setFrustumCulled] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        group: group,
        setFrustumCulled: setFrustumCulled,
      }),
      [group, setFrustumCulled]
    );

    const handleToppingAdd = useCallback(
      (e: ThreeEvent<PointerEvent>) => {
        if (currentGamePhase.specialButtonText === "Ready") {
          addTopping(
            selectedTopping,
            generateRandomPos(0.855, 2, [2.5, 2.5, -3.2]),
            selectedTopping === "peppers"
              ? 3
              : selectedTopping === "olives"
              ? 2
              : 1
          );
        }
      },
      [currentGamePhase, selectedTopping]
    );

    return (
      <group ref={group} dispose={null}>
        <PizzaBaseInstances
          onPointerDown={handleToppingAdd}
          frustumCulled={false}
          key={"pizzaBaseInstances"}
        >
          {isPizzaBaseSpawned && (
            <PizzaBaseModel
              key={`pizzaBase-0`}
              initialPosition={[2.5, 4, -3.2]}
            />
          )}
        </PizzaBaseInstances>
        <Toppings frustumCulled={frustumCulled} />
      </group>
    );
  }
);
export default PizzaMaker;
