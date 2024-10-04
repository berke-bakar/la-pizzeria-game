import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    restraunt001?: THREE.Mesh;
    backWall001?: THREE.Mesh;
  };
  materials: {
    ["PaletteMaterial001.001"]: THREE.MeshStandardMaterial;
    PaletteMaterial001?: THREE.MeshStandardMaterial;
  };
};

export function Restraunt(
  props: JSX.IntrinsicElements["group"] & { debug: boolean }
) {
  const { nodes, materials } = useGLTF(
    props.debug
      ? Asset.fromModule(require("../../assets/models/restraunt_debug.glb")).uri
      : Asset.fromModule(require("../../assets/models/restraunt.glb")).uri
  ) as GLTFResult;
  return props.debug ? (
    <group {...props} dispose={null}>
      {!props.debug && (
        <mesh
          position={[1.497, 7.8, -7.049]}
          scale={[13, 13, 13.405]}
          rotation-x={-Math.PI / 2}
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial attach={"material"} side={THREE.BackSide} />
        </mesh>
      )}
      <mesh
        geometry={nodes.backWall001!.geometry}
        material={materials.PaletteMaterial001}
        position={[1.506, 3.955, 6.427]}
      />
    </group>
  ) : (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.restraunt001!.geometry}
        material={materials["PaletteMaterial001.001"]}
        position={[1.506, 3.955, 6.427]}
      />
    </group>
  );
}

useGLTF.preload([
  Asset.fromModule(require("../../assets/models/restraunt.glb")).uri,
  Asset.fromModule(require("../../assets/models/restraunt_debug.glb")).uri,
]);
