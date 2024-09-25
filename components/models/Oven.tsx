import * as THREE from "three";
import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

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
export type OvenRefProps = {
  actions: Record<"Open" | "Close", THREE.AnimationAction | null>;
  mixer: THREE.AnimationMixer;
};
export type OvenRef = Ref<OvenRefProps>;

type OvenProps = Omit<JSX.IntrinsicElements["group"], "ref">;

export const Oven = forwardRef<OvenRefProps, OvenProps>(function Oven(
  props,
  ref
) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    Asset.fromModule(require("../../assets/models/oven.glb")).uri
  ) as GLTFResult;
  const { actions, mixer } = useAnimations(animations as GLTFAction[], group);

  useImperativeHandle(
    ref,
    () => ({
      mixer,
      actions,
    }),
    [actions, mixer]
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="ovenLid"
          position={[5.126, 3.466, 3.949]}
          rotation={[-Math.PI, -1.015, Math.PI / 2]}
          scale={[3.924, 3.235, 2.232]}
        >
          <group position={[0.237, -0.32, -0.05]} scale={0.45}>
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
        </group>
        <group
          name="oven"
          position={[4.083, 2.498, 5.045]}
          scale={[2.493, 2.472, 2.46]}
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
});

useGLTF.preload(Asset.fromModule(require("../../assets/models/oven.glb")).uri);
