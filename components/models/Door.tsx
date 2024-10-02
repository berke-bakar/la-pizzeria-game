import * as THREE from "three";
import React, { forwardRef, Ref, RefObject, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type ActionName = "DoorOpen";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    door: THREE.Mesh;
  };
  materials: {
    ["restaurant.002"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export type DoorRefProps = {
  actions: Record<ActionName, THREE.AnimationAction | null>;
  mixer: THREE.AnimationMixer;
  group: RefObject<THREE.Group<THREE.Object3DEventMap> | undefined>;
};

export type DoorRef = Ref<DoorRefProps>;

export type DoorProps = Omit<JSX.IntrinsicElements["group"], "ref">;

export const DoorModel = forwardRef<DoorRefProps, DoorProps>(function DoorModel(
  props: JSX.IntrinsicElements["group"],
  ref
) {
  const group = React.useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    Asset.fromModule(require("../../assets/models/door.glb")).uri
  ) as GLTFResult;
  const { actions, mixer } = useAnimations(animations, group);

  useImperativeHandle(
    ref,
    () => ({
      group: group,
      actions: actions,
      mixer: mixer,
    }),
    [actions, mixer]
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="doorRoot" position={[-0.76, 0, -18.295]} scale={2.302}>
          <mesh
            name="door"
            geometry={nodes.door.geometry}
            material={materials["restaurant.002"]}
            scale={[126, 121, 50]}
          />
        </group>
      </group>
    </group>
  );
});

useGLTF.preload(Asset.fromModule(require("../../assets/models/door.glb")).uri);
