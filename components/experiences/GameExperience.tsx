import { View, Text, Platform } from "react-native";
import React, { Suspense, useContext, useEffect, useRef } from "react";
import {
  Environment,
  Helper,
  OrbitControls,
  StatsGl,
} from "@react-three/drei/native";
import {
  DirectionalLightHelper,
  Euler,
  PerspectiveCamera,
  Vector3,
} from "three";
import { PhysicsProvider, WorldContext } from "@/context/PhysicsProvider";
import { PizzaBaseInstances, PizzaBaseModel } from "../models/PizzaBase";
import { INGREDIENTS } from "@/constants/constants";
import { useToppings } from "@/hooks/useToppings";
import Ground from "../Ground";
import SuspenseProgress from "../SuspenseProgress";
import { PhysicsBodyWireframes } from "@/components/PhysicsBodyWireframes";
import { useFrame, useThree } from "@react-three/fiber/native";
import { Restaurant } from "../models/Restraunt";
import { damp3 } from "maath/easing";
import { useControls } from "leva";
import { RestrauntUpdated } from "../models/RestrauntUpdated";

type Props = {};

const GameExperience = (props: Props) => {
  const [addTopping, lastAddedTopping, toppings] = useToppings((state) => [
    state.addTopping,
    state.lastAddedTopping,
    state.toppings,
  ]);
  const world = useContext(WorldContext);
  const { camera } = useThree();

  // const cameraTarget1 = useRef(new Vector3(2, 2, 9));
  // [0, 2, 10]
  useEffect(() => {
    (camera as PerspectiveCamera).fov = 40;
    camera.position.set(-2, 4.5, 6);
    camera.updateProjectionMatrix();
    // camera.lookAt(-2, 2, -1);
  }, []);

  const { cameraTarget, lookAtTarget } = useControls({
    cameraTarget: {
      value: [0, 2, 10],
      joystick: true,
      step: 0.1,
    },
    lookAtTarget: {
      value: [0, 0, 3],
      joystick: true,
      step: 0.1,
    },
  });

  useFrame((state) => {
    // damp3(state.camera.position, cameraTarget, 0.25);
    // state.camera.lookAt(...lookAtTarget);
  });

  return (
    <>
      {Platform.OS === "web" && <StatsGl />}
      <Environment
        preset="warehouse"
        environmentIntensity={0.5}
        // environmentRotation={new Euler(0, 0.5, 0)}
        background
      />
      {/* <OrbitControls makeDefault /> */}
      <directionalLight position={[2, 5, 2]} intensity={3}>
        <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
      </directionalLight>
      <PhysicsProvider>
        {Platform.OS === "web" && <PhysicsBodyWireframes />}
        <Suspense fallback={<SuspenseProgress />}>
          <PizzaBaseInstances>
            <PizzaBaseModel position={[2.25, 2, 6]} scale={[1, 1, 1]} />
          </PizzaBaseInstances>
          {/* <Restaurant position={[3, 0.25, 8]} /> */}
          <RestrauntUpdated />
          {Object.keys(INGREDIENTS).map((val, ind) => {
            const Instances = INGREDIENTS[val].Instances;
            const Model = INGREDIENTS[val].Model;
            return (
              <Instances key={val}>
                {toppings[val] &&
                  toppings[val].map((topping, toppingIndex) => {
                    let position = topping.initialPos;
                    if (topping.id !== lastAddedTopping?.id && world) {
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
          <Ground position={[0, 0.32, 2]} />
        </Suspense>
      </PhysicsProvider>
    </>
  );
};

export default GameExperience;
