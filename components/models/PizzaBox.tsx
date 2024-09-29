import * as THREE from "three";
import React, { forwardRef, Ref, RefObject, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type ActionName = "LidClose.001" | "Peek.001";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    pizzaBoxMesh: THREE.SkinnedMesh;
    Bone: THREE.Bone;
  };
  materials: {
    _defaultMat: THREE.MeshStandardMaterial;
  };
};

export type PizzaBoxRefProps = {
  actions: Record<ActionName, THREE.AnimationAction | null>;
  mixer: THREE.AnimationMixer;
  group: RefObject<THREE.Group<THREE.Object3DEventMap> | undefined>;
};

export type PizzaBoxRef = Ref<PizzaBoxRefProps>;

export type PizzaBoxProps = Omit<JSX.IntrinsicElements["group"], "ref">;

export const PizzaBox = forwardRef<PizzaBoxRefProps, PizzaBoxProps>(
  function PizzaBox(props, ref) {
    const group = React.useRef<THREE.Group>();
    const rotatingGroup = React.useRef<THREE.Group>();
    const { nodes, materials, animations } = useGLTF(
      Asset.fromModule(require("../../assets/models/pizzaBox.glb")).uri
    ) as GLTFResult;
    const { actions, mixer } = useAnimations(animations as GLTFAction[], group);

    useImperativeHandle(
      ref,
      () => ({
        group: rotatingGroup,
        actions: actions,
        mixer: mixer,
      }),
      [actions, mixer]
    );

    return (
      <group ref={group} {...props} dispose={null}>
        <group name="PizzaBoxArmature" position={[8, 2.601, -3.2]}>
          <group name="Scene" ref={rotatingGroup}>
            <skinnedMesh
              name="pizzaBoxMesh"
              geometry={nodes.pizzaBoxMesh.geometry}
              material={materials._defaultMat}
              skeleton={nodes.pizzaBoxMesh.skeleton}
            />
            <primitive object={nodes.Bone} />
          </group>
        </group>
      </group>
    );
  }
);

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/pizzaBox.glb")).uri
);
