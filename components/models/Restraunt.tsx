import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    ground: THREE.Mesh;
    sideWalls: THREE.Mesh;
    frontWall: THREE.Mesh;
    counter: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshStandardMaterial;
    ["Solid.092"]: THREE.MeshStandardMaterial;
  };
};

export function Restraunt(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/restraunt.glb")).uri
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.ground.geometry}
        material={materials.PaletteMaterial001}
        position={[1.497, -0.025, -7.049]}
        scale={[13, 13, 13.405]}
      />
      <mesh
        geometry={nodes.sideWalls.geometry}
        material={materials.PaletteMaterial002}
        position={[1.373, 3.904, -5.849]}
        rotation={[0, -1.57, 0]}
        scale={[13.027, 11.843, 11.843]}
      />
      <mesh
        geometry={nodes.frontWall.geometry}
        material={materials.PaletteMaterial003}
        position={[1.319, 4.185, -18.305]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[7.361, 13.292, 10.072]}
      />
      <mesh
        geometry={nodes.counter.geometry}
        material={materials["Solid.092"]}
        position={[0.142, 2.569, -3.152]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.528}
      />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/restraunt.glb")).uri
);
