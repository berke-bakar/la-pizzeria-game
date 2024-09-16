import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import { gamePhaseControllerAtom } from "@/constants/constants";
import { useAtom } from "jotai";

type GLTFResult = GLTF & {
  nodes: {
    ["Node-Mesh001"]: THREE.Mesh;
    ["Node-Mesh001_1"]: THREE.Mesh;
    ["Node-Mesh003"]: THREE.Mesh;
    ["Node-Mesh003_1"]: THREE.Mesh;
  };
  materials: {
    ["mat15.001"]: THREE.MeshStandardMaterial;
    ["mat24.001"]: THREE.MeshStandardMaterial;
    ["mat17.001"]: THREE.MeshStandardMaterial;
    ["mat16.001"]: THREE.MeshStandardMaterial;
  };
};

interface GLTFAction extends THREE.AnimationClip {
  name: "Open" | "Close";
}

export function Oven(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    Asset.fromModule(require("../../assets/models/oven.glb")).uri
  ) as GLTFResult;
  const { actions, mixer } = useAnimations(animations as GLTFAction[], group);
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);

  function onAnimFinish() {
    updateGamePhase("advancePhase");
  }

  useEffect(() => {
    mixer.addEventListener("finished", onAnimFinish);
    return () => mixer.removeEventListener("finished", onAnimFinish);
  }, [mixer]);

  useEffect(() => {
    if (currentGamePhase.subphase === "ovenClose") {
      const action = actions["Close"];
      if (action) {
        action.reset().setLoop(THREE.LoopOnce, 1).play();
        action.clampWhenFinished = true;
      }
    } else if (currentGamePhase.subphase === "ovenOpen") {
      const action = actions["Open"];
      if (action) {
        action.clampWhenFinished = true;
        action
          .crossFadeFrom(actions["Open"]!, 0.5, false)
          .setLoop(THREE.LoopOnce, 1)
          .play();
      }
    } else if (currentGamePhase.subphase === "waiting") {
      setTimeout(() => {
        updateGamePhase("advancePhase");
      }, 3000);
    }
  }, [currentGamePhase]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="ovenLid"
          position={[5.1258, 3.4656, 3.9486]}
          rotation={[0, -2.12665, -Math.PI / 2]}
          scale={[3.9242, 3.2349, 2.2318]}
        >
          <mesh
            name="Node-Mesh001"
            geometry={nodes["Node-Mesh001"].geometry}
            material={materials["mat15.001"]}
          />
          <mesh
            name="Node-Mesh001_1"
            geometry={nodes["Node-Mesh001_1"].geometry}
            material={materials["mat24.001"]}
          />
        </group>
        <group
          name="oven"
          position={[4.1363, 3.1063, 5.0906]}
          scale={[3.2622, 3.2349, 3.2193]}
        >
          <mesh
            name="Node-Mesh003"
            geometry={nodes["Node-Mesh003"].geometry}
            material={materials["mat17.001"]}
          />
          <mesh
            name="Node-Mesh003_1"
            geometry={nodes["Node-Mesh003_1"].geometry}
            material={materials["mat16.001"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(Asset.fromModule(require("../../assets/models/oven.glb")).uri);
