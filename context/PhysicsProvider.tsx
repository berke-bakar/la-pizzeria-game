import React, { createContext, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber/native";
import * as CANNON from "cannon-es";

export const WorldContext = createContext<CANNON.World | null>(null);

export const PhysicsProvider = ({ children }: React.PropsWithChildren) => {
  const [world] = useState(() => new CANNON.World());

  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    world.gravity.set(0, -10, 0);
  }, [world]);

  // Run world stepper every frame
  useFrame(() => {
    // world.step(1 / 60)
    world.fixedStep(1 / 60, 20);
  });

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
};
