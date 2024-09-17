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

const GameExperience = ({
  debug = false,
  visible,
  ...props
}: JSX.IntrinsicElements["group"] & { debug: boolean }) => {
  const { camera } = useThree();
  const pizzaMakerRef = useRef<PizzaMakerRefProps>(null);
  const ovenRef = useRef<OvenRefProps>(null);
  const pizzaBoxRef = useRef<PizzaBoxRefProps>(null);
  const customerRef = useRef<CustomerRefProps>(null);

  useEffect(() => {
    if (visible) {
      (camera as PerspectiveCamera).fov = 50;
      camera.near = 0.01;
      camera.far = 1000;
      if (debug) camera.position.set(0, 0, -30);
      camera.updateProjectionMatrix();
    }
  }, [visible]);

  return (
    <group visible={visible} {...props}>
      <Environment preset="city" environmentIntensity={0.5} />
      {debug && <OrbitControls makeDefault position={[0, 4, -20]} />}
      <directionalLight position={[2, 5, 2]} intensity={3}>
        {debug && <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />}
      </directionalLight>
      <color attach="background" args={["#f4511e"]} />
      <color attach="background" args={["black"]} />
      {/* <Suspense fallback={<SuspenseProgress />}> */}
      <PhysicsProvider>
        {debug && <PhysicsBodyWireframes />}
        <Restraunt />
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
        />
      </PhysicsProvider>
      <AnimationPath debug={debug} />
      {/* </Suspense> */}
    </group>
  );
};

export default GameExperience;
