import { useGLTF, useAnimations } from "@react-three/drei/native";
import { Asset } from "expo-asset";
import {
  forwardRef,
  Ref,
  RefObject,
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
    casualMan_body_1: THREE.SkinnedMesh;
    casualMan_body_2: THREE.SkinnedMesh;
    casualMan_feet_1: THREE.SkinnedMesh;
    casualMan_feet_2: THREE.SkinnedMesh;
    casualMan_head_1: THREE.SkinnedMesh;
    casualMan_head_2: THREE.SkinnedMesh;
    casualMan_head_3: THREE.SkinnedMesh;
    casualMan_head_4: THREE.SkinnedMesh;
    casualMan_legs_1: THREE.SkinnedMesh;
    casualMan_legs_2: THREE.SkinnedMesh;
    casualWoman_body_1: THREE.SkinnedMesh;
    casualWoman_body_2: THREE.SkinnedMesh;
    casualWoman_feet_1: THREE.SkinnedMesh;
    casualWoman_feet_2: THREE.SkinnedMesh;
    casualWoman_head_1: THREE.SkinnedMesh;
    casualWoman_head_2: THREE.SkinnedMesh;
    casualWoman_head_3: THREE.SkinnedMesh;
    casualWoman_head_4: THREE.SkinnedMesh;
    casualWoman_legs: THREE.SkinnedMesh;
    punk_body_1: THREE.SkinnedMesh;
    punk_body_2: THREE.SkinnedMesh;
    punk_body_3: THREE.SkinnedMesh;
    punk_feet_1: THREE.SkinnedMesh;
    punk_feet_2: THREE.SkinnedMesh;
    punk_head_1: THREE.SkinnedMesh;
    punk_head_2: THREE.SkinnedMesh;
    punk_head_3: THREE.SkinnedMesh;
    punk_head_4: THREE.SkinnedMesh;
    punk_head_5: THREE.SkinnedMesh;
    punk_head_6: THREE.SkinnedMesh;
    punk_legs_1: THREE.SkinnedMesh;
    punk_legs_2: THREE.SkinnedMesh;
    suitMan_body_1: THREE.SkinnedMesh;
    suitMan_body_2: THREE.SkinnedMesh;
    suitMan_body_3: THREE.SkinnedMesh;
    suitMan_body_4: THREE.SkinnedMesh;
    suitMan_feet: THREE.SkinnedMesh;
    suitMan_head_1: THREE.SkinnedMesh;
    suitMan_head_2: THREE.SkinnedMesh;
    suitMan_head_3: THREE.SkinnedMesh;
    suitMan_head_4: THREE.SkinnedMesh;
    suitMan_legs: THREE.SkinnedMesh;
    suitWoman_body_1: THREE.SkinnedMesh;
    suitWoman_body_2: THREE.SkinnedMesh;
    suitWoman_body_3: THREE.SkinnedMesh;
    suitWoman_feet_1: THREE.SkinnedMesh;
    suitWoman_feet_2: THREE.SkinnedMesh;
    suitWoman_head_1: THREE.SkinnedMesh;
    suitWoman_head_2: THREE.SkinnedMesh;
    suitWoman_head_3: THREE.SkinnedMesh;
    suitWoman_head_4: THREE.SkinnedMesh;
    suitWoman_legs: THREE.SkinnedMesh;
    worker_body_1: THREE.SkinnedMesh;
    worker_body_2: THREE.SkinnedMesh;
    worker_body_3: THREE.SkinnedMesh;
    worker_body_4: THREE.SkinnedMesh;
    worker_feet_1: THREE.SkinnedMesh;
    worker_feet_2: THREE.SkinnedMesh;
    worker_head_1: THREE.SkinnedMesh;
    worker_head_2: THREE.SkinnedMesh;
    worker_head_3: THREE.SkinnedMesh;
    worker_head_4: THREE.SkinnedMesh;
    worker_legs_1: THREE.SkinnedMesh;
    worker_legs_2: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshStandardMaterial;
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
            <>
              <group name="casualMan_body">
                <skinnedMesh
                  geometry={nodes.casualMan_body_1.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.casualMan_body_1.skeleton}
                />
                <skinnedMesh
                  geometry={nodes.casualMan_body_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_body_2.skeleton}
                />
              </group>
              <group name="casualMan_feet">
                <skinnedMesh
                  geometry={nodes.casualMan_feet_1.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.casualMan_feet_1.skeleton}
                />
                <skinnedMesh
                  geometry={nodes.casualMan_feet_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_feet_2.skeleton}
                />
              </group>
              <group name="casualMan_head">
                <skinnedMesh
                  geometry={nodes.casualMan_head_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_head_1.skeleton}
                />
                <skinnedMesh
                  geometry={nodes.casualMan_head_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_head_2.skeleton}
                />
                <skinnedMesh
                  geometry={nodes.casualMan_head_3.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_head_3.skeleton}
                />
                <skinnedMesh
                  geometry={nodes.casualMan_head_4.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_head_4.skeleton}
                />
              </group>
              <group name="casualMan_legs">
                <skinnedMesh
                  geometry={nodes.casualMan_legs_1.geometry}
                  material={materials.PaletteMaterial003}
                  skeleton={nodes.casualMan_legs_1.skeleton}
                />
                <skinnedMesh
                  geometry={nodes.casualMan_legs_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualMan_legs_2.skeleton}
                />
              </group>
            </>
          );
        case "casualWoman":
          return (
            <>
              <group name="casualWoman_body">
                <skinnedMesh
                  name="casualWoman_body_1"
                  geometry={nodes.casualWoman_body_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualWoman_body_1.skeleton}
                />
                <skinnedMesh
                  name="casualWoman_body_2"
                  geometry={nodes.casualWoman_body_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualWoman_body_2.skeleton}
                />
              </group>
              <group name="casualWoman_feet">
                <skinnedMesh
                  name="casualWoman_feet_1"
                  geometry={nodes.casualWoman_feet_1.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.casualWoman_feet_1.skeleton}
                />
                <skinnedMesh
                  name="casualWoman_feet_2"
                  geometry={nodes.casualWoman_feet_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualWoman_feet_2.skeleton}
                />
              </group>
              <group name="casualWoman_head">
                <skinnedMesh
                  name="casualWoman_head_1"
                  geometry={nodes.casualWoman_head_1.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.casualWoman_head_1.skeleton}
                />
                <skinnedMesh
                  name="casualWoman_head_2"
                  geometry={nodes.casualWoman_head_2.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.casualWoman_head_2.skeleton}
                />
                <skinnedMesh
                  name="casualWoman_head_3"
                  geometry={nodes.casualWoman_head_3.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.casualWoman_head_3.skeleton}
                />
                <skinnedMesh
                  name="casualWoman_head_4"
                  geometry={nodes.casualWoman_head_4.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.casualWoman_head_4.skeleton}
                />
              </group>
              <skinnedMesh
                name="casualWoman_legs"
                geometry={nodes.casualWoman_legs.geometry}
                material={materials.PaletteMaterial001}
                skeleton={nodes.casualWoman_legs.skeleton}
              />
            </>
          );
        case "punk":
          return (
            <>
              <group name="punk_body">
                <skinnedMesh
                  name="punk_body_1"
                  geometry={nodes.punk_body_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_body_1.skeleton}
                />
                <skinnedMesh
                  name="punk_body_2"
                  geometry={nodes.punk_body_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_body_2.skeleton}
                />
                <skinnedMesh
                  name="punk_body_3"
                  geometry={nodes.punk_body_3.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_body_3.skeleton}
                />
              </group>
              <group name="punk_feet">
                <skinnedMesh
                  name="punk_feet_1"
                  geometry={nodes.punk_feet_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_feet_1.skeleton}
                />
                <skinnedMesh
                  name="punk_feet_2"
                  geometry={nodes.punk_feet_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_feet_2.skeleton}
                />
              </group>
              <group name="punk_head">
                <skinnedMesh
                  name="punk_head_1"
                  geometry={nodes.punk_head_1.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.punk_head_1.skeleton}
                />
                <skinnedMesh
                  name="punk_head_2"
                  geometry={nodes.punk_head_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_head_2.skeleton}
                />
                <skinnedMesh
                  name="punk_head_3"
                  geometry={nodes.punk_head_3.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_head_3.skeleton}
                />
                <skinnedMesh
                  name="punk_head_4"
                  geometry={nodes.punk_head_4.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.punk_head_4.skeleton}
                />
                <skinnedMesh
                  name="punk_head_5"
                  geometry={nodes.punk_head_5.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.punk_head_5.skeleton}
                />
                <skinnedMesh
                  name="punk_head_6"
                  geometry={nodes.punk_head_6.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_head_6.skeleton}
                />
              </group>
              <group name="punk_legs">
                <skinnedMesh
                  name="punk_legs_1"
                  geometry={nodes.punk_legs_1.geometry}
                  material={materials.PaletteMaterial003}
                  skeleton={nodes.punk_legs_1.skeleton}
                />
                <skinnedMesh
                  name="punk_legs_2"
                  geometry={nodes.punk_legs_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.punk_legs_2.skeleton}
                />
              </group>
            </>
          );
        case "suitMan":
          return (
            <>
              <group name="suitMan_body">
                <skinnedMesh
                  name="suitMan_body_1"
                  geometry={nodes.suitMan_body_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitMan_body_1.skeleton}
                />
                <skinnedMesh
                  name="suitMan_body_2"
                  geometry={nodes.suitMan_body_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitMan_body_2.skeleton}
                />
                <skinnedMesh
                  name="suitMan_body_3"
                  geometry={nodes.suitMan_body_3.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.suitMan_body_3.skeleton}
                />
                <skinnedMesh
                  name="suitMan_body_4"
                  geometry={nodes.suitMan_body_4.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitMan_body_4.skeleton}
                />
              </group>
              <skinnedMesh
                name="suitMan_feet"
                geometry={nodes.suitMan_feet.geometry}
                material={materials.PaletteMaterial002}
                skeleton={nodes.suitMan_feet.skeleton}
              />
              <group name="suitMan_head">
                <skinnedMesh
                  name="suitMan_head_1"
                  geometry={nodes.suitMan_head_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitMan_head_1.skeleton}
                />
                <skinnedMesh
                  name="suitMan_head_2"
                  geometry={nodes.suitMan_head_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitMan_head_2.skeleton}
                />
                <skinnedMesh
                  name="suitMan_head_3"
                  geometry={nodes.suitMan_head_3.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.suitMan_head_3.skeleton}
                />
                <skinnedMesh
                  name="suitMan_head_4"
                  geometry={nodes.suitMan_head_4.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitMan_head_4.skeleton}
                />
              </group>
              <skinnedMesh
                name="suitMan_legs"
                geometry={nodes.suitMan_legs.geometry}
                material={materials.PaletteMaterial002}
                skeleton={nodes.suitMan_legs.skeleton}
              />
            </>
          );
        case "suitWoman":
          return (
            <>
              <group name="suitWoman_body">
                <skinnedMesh
                  name="suitWoman_body_1"
                  geometry={nodes.suitWoman_body_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_body_1.skeleton}
                />
                <skinnedMesh
                  name="suitWoman_body_2"
                  geometry={nodes.suitWoman_body_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_body_2.skeleton}
                />
                <skinnedMesh
                  name="suitWoman_body_3"
                  geometry={nodes.suitWoman_body_3.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_body_3.skeleton}
                />
              </group>
              <group name="suitWoman_feet">
                <skinnedMesh
                  name="suitWoman_feet_1"
                  geometry={nodes.suitWoman_feet_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_feet_1.skeleton}
                />
                <skinnedMesh
                  name="suitWoman_feet_2"
                  geometry={nodes.suitWoman_feet_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_feet_2.skeleton}
                />
              </group>
              <group name="suitWoman_head">
                <skinnedMesh
                  name="suitWoman_head_1"
                  geometry={nodes.suitWoman_head_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_head_1.skeleton}
                />
                <skinnedMesh
                  name="suitWoman_head_2"
                  geometry={nodes.suitWoman_head_2.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.suitWoman_head_2.skeleton}
                />
                <skinnedMesh
                  name="suitWoman_head_3"
                  geometry={nodes.suitWoman_head_3.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_head_3.skeleton}
                />
                <skinnedMesh
                  name="suitWoman_head_4"
                  geometry={nodes.suitWoman_head_4.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.suitWoman_head_4.skeleton}
                />
              </group>
              <skinnedMesh
                name="suitWoman_legs"
                geometry={nodes.suitWoman_legs.geometry}
                material={materials.PaletteMaterial002}
                skeleton={nodes.suitWoman_legs.skeleton}
              />
            </>
          );
        case "worker":
          return (
            <>
              <group name="worker_body">
                <skinnedMesh
                  name="worker_body_1"
                  geometry={nodes.worker_body_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_body_1.skeleton}
                />
                <skinnedMesh
                  name="worker_body_2"
                  geometry={nodes.worker_body_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_body_2.skeleton}
                />
                <skinnedMesh
                  name="worker_body_3"
                  geometry={nodes.worker_body_3.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.worker_body_3.skeleton}
                />
                <skinnedMesh
                  name="worker_body_4"
                  geometry={nodes.worker_body_4.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.worker_body_4.skeleton}
                />
              </group>
              <group name="worker_feet">
                <skinnedMesh
                  name="worker_feet_1"
                  geometry={nodes.worker_feet_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_feet_1.skeleton}
                />
                <skinnedMesh
                  name="worker_feet_2"
                  geometry={nodes.worker_feet_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_feet_2.skeleton}
                />
              </group>
              <group name="worker_head">
                <skinnedMesh
                  name="worker_head_1"
                  geometry={nodes.worker_head_1.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_head_1.skeleton}
                />
                <skinnedMesh
                  name="worker_head_2"
                  geometry={nodes.worker_head_2.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_head_2.skeleton}
                />
                <skinnedMesh
                  name="worker_head_3"
                  geometry={nodes.worker_head_3.geometry}
                  material={materials.PaletteMaterial002}
                  skeleton={nodes.worker_head_3.skeleton}
                />
                <skinnedMesh
                  name="worker_head_4"
                  geometry={nodes.worker_head_4.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.worker_head_4.skeleton}
                />
              </group>
              <group name="worker_legs">
                <skinnedMesh
                  name="worker_legs_1"
                  geometry={nodes.worker_legs_1.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.worker_legs_1.skeleton}
                />
                <skinnedMesh
                  name="worker_legs_2"
                  geometry={nodes.worker_legs_2.geometry}
                  material={materials.PaletteMaterial001}
                  skeleton={nodes.worker_legs_2.skeleton}
                />
              </group>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <group {...props} dispose={null}>
        <group name="Scene" ref={group}>
          <group name="OrignalArmature">
            <primitive object={nodes.mixamorigHips} />
            {renderCharacter(selectedCharacter)}
          </group>
        </group>
      </group>
    );
  }
);

useGLTF.preload([
  Asset.fromModule(require("../../assets/models/allCharacters.glb")).uri,
  Asset.fromModule(require("../../assets/models/animations.glb")).uri,
]);
