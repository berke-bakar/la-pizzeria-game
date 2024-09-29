import { useGLTF, useAnimations } from "@react-three/drei/native";
import { Asset } from "expo-asset";
import {
  forwardRef,
  Ref,
  RefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as THREE from "three";
import React from "react";
import { useGraph } from "@react-three/fiber/native";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName =
  | "Angry"
  | "Idle"
  | "GoofyRun"
  | "Ordering"
  | "Walking"
  | "Ordering2"
  | "Ordering3"
  | "Surprised"
  | "Terrified"
  | "Unhappy";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    casualMan_body001: THREE.SkinnedMesh;
    casualWoman_body001: THREE.SkinnedMesh;
    punk_body001: THREE.SkinnedMesh;
    suitMan_body001: THREE.SkinnedMesh;
    suitWoman_body001: THREE.SkinnedMesh;
    worker_body001: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    material_atlas_00003_1: THREE.MeshStandardMaterial;
  };
};

export type CustomerRefProps = {
  actions: Record<ActionName, THREE.AnimationAction | null>;
  mixer: THREE.AnimationMixer;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string>>;
  group: RefObject<THREE.Group<THREE.Object3DEventMap> | undefined>;
};
export type CustomerRef = Ref<CustomerRefProps>;

type CustomerProps = Omit<JSX.IntrinsicElements["group"], "ref">;

export const Customer = forwardRef<CustomerRefProps, CustomerProps>(
  function Customer(props, ref) {
    const group = React.useRef<THREE.Group>();
    const { scene } = useGLTF(
      Asset.fromModule(require("../../assets/models/allCharacters.glb")).uri
    );
    const { animations } = useGLTF(
      Asset.fromModule(require("../../assets/models/animations.glb")).uri
    );

    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as GLTFResult;
    const { actions, mixer } = useAnimations(animations as GLTFAction[], group);
    const [selectedCharacter, setSelectedCharacter] = useState<string>("");

    useEffect(() => {
      materials.material_atlas_00003_1.roughness = 0.9;
    }, [materials]);

    useImperativeHandle(
      ref,
      () => ({
        setSelectedCharacter,
        group: group,
        actions: actions,
        mixer: mixer,
      }),
      [group, actions, mixer]
    );

    const renderCharacter = (characterName: string) => {
      if (group.current) group.current.visible = true;
      switch (characterName) {
        case "casualMan":
          return (
            <skinnedMesh
              geometry={nodes.casualMan_body001.geometry}
              material={materials.material_atlas_00003_1}
              skeleton={nodes.casualMan_body001.skeleton}
            />
          );
        case "casualWoman":
          return (
            <skinnedMesh
              geometry={nodes.casualWoman_body001.geometry}
              material={materials.material_atlas_00003_1}
              skeleton={nodes.casualWoman_body001.skeleton}
            />
          );
        case "punk":
          return (
            <skinnedMesh
              geometry={nodes.punk_body001.geometry}
              material={materials.material_atlas_00003_1}
              skeleton={nodes.punk_body001.skeleton}
            />
          );
        case "suitMan":
          return (
            <skinnedMesh
              geometry={nodes.suitMan_body001.geometry}
              material={materials.material_atlas_00003_1}
              skeleton={nodes.suitMan_body001.skeleton}
            />
          );
        case "suitWoman":
          return (
            <skinnedMesh
              geometry={nodes.suitWoman_body001.geometry}
              material={materials.material_atlas_00003_1}
              skeleton={nodes.suitWoman_body001.skeleton}
            />
          );
        case "worker":
          return (
            <skinnedMesh
              geometry={nodes.worker_body001.geometry}
              material={materials.material_atlas_00003_1}
              skeleton={nodes.worker_body001.skeleton}
            />
          );
        default:
          return null;
      }
    };
    return (
      <group {...props} dispose={null}>
        <group name="Scene" ref={group}>
          <primitive object={nodes.mixamorigHips} />
          {renderCharacter(selectedCharacter)}
        </group>
      </group>
    );
  }
);

useGLTF.preload([
  Asset.fromModule(require("../../assets/models/allCharacters.glb")).uri,
  Asset.fromModule(require("../../assets/models/animations.glb")).uri,
]);
