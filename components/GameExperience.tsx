import { View, Text, Platform } from "react-native";
import React, { Suspense, useContext } from "react";
import { Helper, StatsGl } from "@react-three/drei/native";
import { DirectionalLightHelper, Vector3 } from "three";
import { PhysicsProvider, WorldContext } from "@/context/PhysicsProvider";
import { PizzaBaseInstances, PizzaBaseModel } from "./models/PizzaBase";
import { INGREDIENTS } from "@/constants/constants";
import { useToppings } from "@/hooks/useToppings";
import Ground from "./Ground";
import SuspenseProgress from "./SuspenseProgress";

type Props = {};

const GameExperience = (props: Props) => {
  const [addTopping, lastAddedTopping, toppings] = useToppings((state) => [
    state.addTopping,
    state.lastAddedTopping,
    state.toppings,
  ]);
  const world = useContext(WorldContext);
  return (
    <>
      {Platform.OS === "web" && <StatsGl />}
      <ambientLight intensity={1} />
      <directionalLight position={[-5, 5, 0]} intensity={5}>
        <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
      </directionalLight>
      <color attach="background" args={["#512da8"]} />
      {/* <color attach="background" args={["#f4511e"]} /> */}
      <PhysicsProvider>
        {/* {Platform.OS === "web" && <PhysicsBodyWireframes />} */}
        <Suspense fallback={<SuspenseProgress />}>
          <PizzaBaseInstances>
            <PizzaBaseModel position={new Vector3(0, 1, 0)} scale={[2, 2, 2]} />
          </PizzaBaseInstances>
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
          <Ground />
        </Suspense>
      </PhysicsProvider>
    </>
  );
};

export default GameExperience;
