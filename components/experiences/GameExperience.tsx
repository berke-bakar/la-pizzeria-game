import React, { Suspense, useContext, useEffect, useRef } from "react";
import { Environment, Helper, OrbitControls } from "@react-three/drei/native";
import { DirectionalLightHelper, PerspectiveCamera, Vector3 } from "three";
import { PhysicsProvider } from "@/context/PhysicsProvider";
import Ground from "../Ground";
import SuspenseProgress from "../SuspenseProgress";
import { PhysicsBodyWireframes } from "@/components/debug/PhysicsBodyWireframes";
import { useThree } from "@react-three/fiber/native";
import { Customer, CustomerRefProps } from "../models/Customer";
import { Restraunt } from "../models/Restraunt";
import { Oven, OvenRef, OvenRefProps } from "../models/Oven";
import AnimationPath from "../debug/AnimationPaths";
import PizzaMaker, { PizzaMakerRef, PizzaMakerRefProps } from "../PizzaMaker";
import { PizzaBox, PizzaBoxRefProps } from "../models/PizzaBox";
import GameController from "../controllers/GameController";
import { ToppingsContainer } from "../models/ToppingsContainer";
import { DoorModel, DoorRefProps } from "../models/Door";

const GameExperience = ({
  debug = false,
  visible = false,
  ...props
}: JSX.IntrinsicElements["group"] & { debug: boolean }) => {
  const { camera } = useThree();
  const pizzaMakerRef = useRef<PizzaMakerRefProps>(null);
  const ovenRef = useRef<OvenRefProps>(null);
  const pizzaBoxRef = useRef<PizzaBoxRefProps>(null);
  const customerRef = useRef<CustomerRefProps>(null);
  const doorRef = useRef<DoorRefProps>(null);

  useEffect(() => {
    if (visible) {
      (camera as PerspectiveCamera).fov = 50;
      if (debug) {
        camera.position.set(0, 0, -30);
        camera.far = 50;
      }
      camera.updateProjectionMatrix();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <group visible={visible} {...props}>
      <Environment preset="city" environmentIntensity={0.5} />
      {debug && <OrbitControls makeDefault position={[0, 4, -20]} />}
      <directionalLight position={[2, 5, 2]} intensity={3}>
        {debug && <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />}
      </directionalLight>

      {/* <Suspense fallback={<SuspenseProgress />}> */}
      <PhysicsProvider>
        {debug && <PhysicsBodyWireframes />}
        <Restraunt debug={debug} />
        <DoorModel ref={doorRef} />
        <ToppingsContainer />
        <Ground position={[0, 2.55, 0]} />
        <PizzaMaker ref={pizzaMakerRef} />
        <Oven ref={ovenRef} />
        <PizzaBox ref={pizzaBoxRef} />
        <Customer scale={1.25} ref={customerRef} />
        <GameController
          customerRef={customerRef}
          ovenRef={ovenRef}
          pizzaMakerRef={pizzaMakerRef}
          pizzaBoxRef={pizzaBoxRef}
          doorRef={doorRef}
          gameSceneVisible={visible}
        />
      </PhysicsProvider>
      <AnimationPath debug={debug} />
      {/* </Suspense> */}
    </group>
  );
};

export default GameExperience;
