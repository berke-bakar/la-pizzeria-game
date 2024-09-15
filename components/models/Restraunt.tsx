import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    group1358954356001: THREE.Mesh;
    ["(%ignore)001_1"]: THREE.Mesh;
    ["(%ignore)001_2"]: THREE.Mesh;
    group1873420653001: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshStandardMaterial;
    PaletteMaterial004: THREE.MeshStandardMaterial;
    ["Solid.092"]: THREE.MeshStandardMaterial;
  };
};

export function Restraunt(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/restraunt.glb")).uri
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Plane"
          geometry={nodes.Plane.geometry}
          material={materials.PaletteMaterial001}
          position={[1.497, -0.025, -7.049]}
          scale={[13, 13, 13.405]}
        />
        <mesh
          name="group1358954356001"
          geometry={nodes.group1358954356001.geometry}
          material={materials.PaletteMaterial002}
          position={[1.373, 3.955, -5.849]}
          rotation={[0, -1.57, 0]}
          scale={[13.027, 11.843, 11.843]}
        />
        <group
          name="(%ignore)001"
          position={[1.569, 3.906, -18.305]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8.91, 16.436, 11.585]}
        >
          <mesh
            name="(%ignore)001_1"
            geometry={nodes["(%ignore)001_1"].geometry}
            material={materials.PaletteMaterial003}
          />
          <mesh
            name="(%ignore)001_2"
            geometry={nodes["(%ignore)001_2"].geometry}
            material={materials.PaletteMaterial004}
          />
        </group>
        <mesh
          name="group1873420653001"
          geometry={nodes.group1873420653001.geometry}
          material={materials["Solid.092"]}
          position={[0.142, 2.569, -3.152]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.528}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/restraunt.glb")).uri
);
