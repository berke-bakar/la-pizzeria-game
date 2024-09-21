import React, { createContext, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber/native";
import * as CANNON from "cannon-es";
import { useAtomValue } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";

export const WorldContext = createContext<CANNON.World | null>(null);

export const PhysicsProvider = ({ children }: React.PropsWithChildren) => {
  const [world] = useState(() => new CANNON.World());
  const currentGamePhase = useAtomValue(gamePhaseControllerAtom);

  useEffect(() => {
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.defaultMaterial = new CANNON.Material({
      friction: 10,
      restitution: 0,
    });
    world.defaultContactMaterial = new CANNON.ContactMaterial(
      world.defaultMaterial,
      world.defaultMaterial,
      { restitution: 0, friction: 10 }
    );
    world.gravity.set(0, -10, 0);
  }, [world]);

  // Run world stepper every frame
  useFrame(() => {
    if (
      currentGamePhase.specialButtonText === "Spawn Pizza" ||
      currentGamePhase.specialButtonText === "Ready"
    ) {
      world.step(1 / 60);
    }
  });

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
};
