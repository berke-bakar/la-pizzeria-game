import React, { Suspense, useContext, useEffect } from "react";
import { Environment, Helper, OrbitControls } from "@react-three/drei/native";
import { DirectionalLightHelper, PerspectiveCamera, Vector3 } from "three";
import { PhysicsProvider, WorldContext } from "@/context/PhysicsProvider";
import { PizzaBaseInstances, PizzaBaseModel } from "../models/PizzaBase";
import { currentCameraStateAtom, INGREDIENTS } from "@/constants/constants";
import { useToppings } from "@/hooks/useToppings";
import Ground from "../Ground";
import SuspenseProgress from "../SuspenseProgress";
import { PhysicsBodyWireframes } from "@/components/PhysicsBodyWireframes";
import { useThree } from "@react-three/fiber/native";
import { RestrauntUpdated } from "../models/RestrauntUpdated";
import { useSetAtom } from "jotai";
import { generateRandomPos } from "@/utils/utils";

type Props = {};

const GameExperience = (props: Props) => {
  const [addTopping, lastAddedTopping, toppings] = useToppings((state) => [
    state.addTopping,
    state.lastAddedTopping,
    state.toppings,
  ]);
  const world = useContext(WorldContext);
  const { camera } = useThree();

  useEffect(() => {
    (camera as PerspectiveCamera).fov = 50;
    camera.updateProjectionMatrix();
  }, []);

  return (
    <>
      <Environment preset="city" environmentIntensity={0.5} />
      {/* <OrbitControls makeDefault /> */}
      <directionalLight position={[2, 5, 2]} intensity={3}>
        <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
      </directionalLight>
      <color attach="background" args={["#f4511e"]} />
      {/* {Platform.OS === "web" && <PhysicsBodyWireframes />} */}
      <Suspense fallback={<SuspenseProgress />}>
        <PhysicsProvider>
          <PizzaBaseInstances>
            <PizzaBaseModel position={{ x: 2.5, y: 4, z: -3.2 } as Vector3} />
          </PizzaBaseInstances>
          <RestrauntUpdated
            onPointerDown={() => {
              // advanceCamera("advance");
              // addTopping("olives", new Vector3(2.5, 6, -3.2), 2);
            }}
          />
          {Object.keys(INGREDIENTS).map((val, ind) => {
            const Instances = INGREDIENTS[val].Instances;
            const Model = INGREDIENTS[val].Model;
            return (
              <Instances key={val}>
                {toppings[val] &&
                  toppings[val].map((topping, toppingIndex) => {
                    let position = topping.initialPos;
                    if (Array.isArray(topping.id) && world) {
                      const body = world.bodies.find(
                        (body) => body.id === topping.id[0]
                      );
                      if (body) {
                        position.copy(body.position);
                      }
                    } else if (topping.id !== lastAddedTopping?.id && world) {
                      const body = world.bodies.find(
                        (body) => body.id === topping.id
                      );
                      if (body) {
                        position.copy(body.position);
                      }
                    }
                    return (
                      <Model
                        key={`${val}-${toppingIndex}`}
                        position={position}
                        bodyId={topping.id}
                      />
                    );
                  })}
              </Instances>
            );
          })}
          <Ground position={[0, 2.55, 0]} />
        </PhysicsProvider>
      </Suspense>
    </>
  );
};

export default GameExperience;
