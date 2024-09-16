import * as THREE from "three";
import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import { useAtom, useAtomValue } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";

type ActionName = "LidClose" | "LidOpen";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    lid: THREE.Mesh;
    pizzaBox: THREE.Mesh;
  };
  materials: {
    _defaultMat: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function PizzaBox(props: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    Asset.fromModule(require("../../assets/models/pizzaBox.glb")).uri
  ) as GLTFResult;
  const { actions, mixer } = useAnimations(animations as GLTFAction[], group);
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);

  useEffect(() => {
    const onAnimFinish = (e) => {
      const clipName = e.action.getClip().name;
      updateGamePhase("advancePhase");
    };

    mixer.addEventListener("finished", onAnimFinish);
    return () => {
      mixer.removeEventListener("finished", onAnimFinish);
    };
  }, []);

  useEffect(() => {
    if (currentGamePhase.subphase === "packaging") {
      const action = actions["LidClose"];
      if (action) {
        action.loop = THREE.LoopOnce;
        action.clampWhenFinished = true;
        action.reset().play();
      }
    } else if (currentGamePhase.subphase === "pizzaReveal") {
      const action = actions["LidOpen"];
      if (action) {
        // action.clampWhenFinished = true;
        mixer.stopAllAction();
        action.loop = THREE.LoopOnce;
        action.reset().play();
      }
    }
  }, [currentGamePhase]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="lid"
          geometry={nodes.lid.geometry}
          material={materials._defaultMat}
          position={[8, 2.764, -4.3]}
        />
        <mesh
          name="pizzaBox"
          geometry={nodes.pizzaBox.geometry}
          material={materials._defaultMat}
          position={[8, 2.608, -3.2]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/pizzaBox.glb")).uri
);
