import * as THREE from "three";
import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    ovenCombined_1: THREE.SkinnedMesh;
    ovenCombined_2: THREE.SkinnedMesh;
    Root: THREE.Bone;
    neutral_bone: THREE.Bone;
  };
  materials: {
    ["mat24.001"]: THREE.MeshStandardMaterial;
    material_atlas_00001_1: THREE.MeshStandardMaterial;
  };
};

interface GLTFAction extends THREE.AnimationClip {
  name: "OvenClose" | "OvenOpen";
}
export type OvenRefProps = {
  actions: Record<"OvenClose" | "OvenOpen", THREE.AnimationAction | null>;
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
        <group name="OvenArmature" position={[5.12854, 2.53462, 3.95033]}>
          <group name="ovenCombined">
            <skinnedMesh
              name="ovenCombined_1"
              geometry={nodes.ovenCombined_1.geometry}
              material={materials["mat24.001"]}
              skeleton={nodes.ovenCombined_1.skeleton}
            />
            <skinnedMesh
              name="ovenCombined_2"
              geometry={nodes.ovenCombined_2.geometry}
              material={materials.material_atlas_00001_1}
              skeleton={nodes.ovenCombined_2.skeleton}
            />
          </group>
          <primitive object={nodes.Root} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
});

useGLTF.preload(Asset.fromModule(require("../../assets/models/oven.glb")).uri);
