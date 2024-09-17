import * as THREE from "three";
import React, { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

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

export type PizzaBoxRefProps = {
  actions: Record<"LidOpen" | "LidClose", THREE.AnimationAction | null>;
  mixer: THREE.AnimationMixer;
};

export type PizzaBoxRef = Ref<PizzaBoxRefProps>;

export type PizzaBoxProps = Omit<JSX.IntrinsicElements["group"], "ref">;

export const PizzaBox = forwardRef<PizzaBoxRefProps, PizzaBoxProps>(
  function PizzaBox(props, ref) {
    const group = React.useRef<THREE.Group>();
    const { nodes, materials, animations } = useGLTF(
      Asset.fromModule(require("../../assets/models/pizzaBox.glb")).uri
    ) as GLTFResult;
    const { actions, mixer } = useAnimations(animations as GLTFAction[], group);

    useImperativeHandle(
      ref,
      () => ({
        actions: actions,
        mixer: mixer,
      }),
      [actions, mixer]
    );

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
);

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/pizzaBox.glb")).uri
);
