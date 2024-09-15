import { useGLTF, useAnimations } from "@react-three/drei/native";
import { Asset } from "expo-asset";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import React from "react";
import { useFrame, useGraph } from "@react-three/fiber/native";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { useAtom, useAtomValue } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";
import { GamePhase } from "@/constants/types";
import { damp3 } from "maath/easing";

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

const characters = [
  "casualMan",
  "casualWoman",
  "punk",
  "suitMan",
  "suitWoman",
  "worker",
];

export function Customer(props: JSX.IntrinsicElements["group"]) {
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
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);
  const currentAnimTime = useRef(0);
  const currentAnimation = useRef(actions["Idle"]);

  const paths = useMemo(
    () => ({
      path1: new THREE.LineCurve3(
        new THREE.Vector3(0, 0, -18),
        new THREE.Vector3(0, 0, -4)
      ),
      path2: new THREE.LineCurve3(
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(6, 0, -6)
      ),
      path3: new THREE.CatmullRomCurve3([
        new THREE.Vector3(6, 0, -6),
        new THREE.Vector3(5, 0, -12),
        new THREE.Vector3(3, 0, -12),
        new THREE.Vector3(0, 0, -18),
      ]),
    }),
    []
  );

  const currentPath = useMemo(() => {
    if (currentGamePhase.subphase === "customerWalk")
      return currentGamePhase.phase === "start" ? paths.path1 : paths.path3;
    else if (currentGamePhase.subphase === "pizzaToBox") return paths.path2;
    return null;
  }, [currentGamePhase]);

  useEffect(() => {
    if (currentGamePhase.subphase === "generateCustomer") {
      resetCharacter();
      updateGamePhase("advancePhase");
    } else if (currentGamePhase.subphase === "takeOrderDialogue") {
      setTimeout(() => {
        //TODO: Remove later
        updateGamePhase("advancePhase");
      }, 2000);
    } else if (currentGamePhase.subphase === "pizzaToBox") {
      group.current?.rotation.set(0, Math.PI / 2, 0);
    } else if (
      currentGamePhase.nextButtonText &&
      currentGamePhase.nextButtonText === "Deliver"
    ) {
      group.current?.rotation.set(0, 0, 0);
    }

    changeAnimation(currentGamePhase);

    // return () => {
    //   // mixer.stopAllAction();
    // };
  }, [currentGamePhase, actions, mixer]);

  const resetCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    if (group.current) {
      group.current.visible = false;
      group.current.position.set(0, 0, -18);
      group.current.rotation.set(0, 0, 0);
    }
    setSelectedCharacter(characters[randomIndex]);
  };

  const changeAnimation = (phaseIndex: GamePhase) => {
    // mixer.stopAllAction();
    const prevAnim = currentAnimation.current;
    currentAnimation.current = actions["Idle"];

    if (
      phaseIndex.phase === "start" &&
      phaseIndex.subphase === "customerWalk"
    ) {
      currentAnimation.current = actions["Walking"];
    } else if (
      phaseIndex.phase === "takingOrder" &&
      phaseIndex.subphase === "takeOrderDialogue"
    ) {
      currentAnimation.current = actions["Ordering3"];
    } else if (phaseIndex.subphase === "pizzaToBox") {
      currentAnimation.current = actions["Walking"];
    }
    // Change animation, only when needed
    if (currentAnimation.current && currentAnimation.current !== prevAnim) {
      currentAnimTime.current = 0;
      if (prevAnim) {
        currentAnimation.current
          .reset()
          .crossFadeFrom(prevAnim, 0.5, false)
          .play();
      } else {
        currentAnimation.current.reset().fadeIn(0.5).play();
      }
      currentAnimation.current.setLoop(THREE.LoopRepeat, Infinity);
    }
  };

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

  useFrame((state, delta) => {
    if (!currentPath || !group.current) return;

    currentAnimTime.current = Math.min(
      currentAnimTime.current + delta * 0.2,
      1
    );
    const pointOnPath = currentPath.getPointAt(currentAnimTime.current);
    damp3(group.current.position, pointOnPath, 0.3, delta);
    if (currentAnimTime.current >= 1) {
      currentAnimTime.current = 0;
      updateGamePhase("advancePhase");
    }
    // Update game phase when the customer reaches the target
  });

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

useGLTF.preload([
  Asset.fromModule(require("../../assets/models/allCharacters.glb")).uri,
  Asset.fromModule(require("../../assets/models/animations.glb")).uri,
]);
