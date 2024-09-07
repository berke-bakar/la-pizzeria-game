import * as THREE from "three";
import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber/native";
import { useGLTF, useAnimations } from "@react-three/drei/native";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { Asset } from "expo-asset";

type ActionName = "Armature|mixamo.com|Layer0";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Object_11: THREE.SkinnedMesh;
    Object_12: THREE.SkinnedMesh;
    Object_13: THREE.SkinnedMesh;
    Object_14: THREE.SkinnedMesh;
    Object_18: THREE.SkinnedMesh;
    Object_19: THREE.SkinnedMesh;
    Object_21: THREE.SkinnedMesh;
    Object_22: THREE.SkinnedMesh;
    Object_24: THREE.SkinnedMesh;
    Object_28: THREE.SkinnedMesh;
    Object_32: THREE.SkinnedMesh;
    Object_34: THREE.SkinnedMesh;
    Object_36: THREE.SkinnedMesh;
    Object_38: THREE.SkinnedMesh;
    Object_40: THREE.SkinnedMesh;
    Object_42: THREE.SkinnedMesh;
    Object_44: THREE.SkinnedMesh;
    Object_46: THREE.SkinnedMesh;
    Object_48: THREE.SkinnedMesh;
    Object_50: THREE.SkinnedMesh;
    Object_7: THREE.SkinnedMesh;
    Object_9: THREE.SkinnedMesh;
    Trainers_Cube025_1001: THREE.SkinnedMesh;
    Trainers_Cube025_1001_1: THREE.SkinnedMesh;
    Trainers_Cube025_1: THREE.SkinnedMesh;
    Trainers_Cube025_1_1: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export default function Chef(props: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group<THREE.Object3DEventMap>>();
  const { scene, animations } = useGLTF(
    Asset.fromModule(require("../../assets/models/Chef_simplified.glb")).uri
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Armature|mixamo.com|Layer0"]?.play();
  }, []);

  return (
    <group
      ref={group as React.Ref<THREE.Group<THREE.Object3DEventMap>>}
      {...props}
      dispose={null}
    >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_12"
          geometry={nodes.Object_12.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_12.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_13"
          geometry={nodes.Object_13.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_13.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_14"
          geometry={nodes.Object_14.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_14.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_18"
          geometry={nodes.Object_18.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_18.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_19"
          geometry={nodes.Object_19.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_19.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_21"
          geometry={nodes.Object_21.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_21.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_22"
          geometry={nodes.Object_22.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_22.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_24"
          geometry={nodes.Object_24.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_24.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_28"
          geometry={nodes.Object_28.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_28.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_32"
          geometry={nodes.Object_32.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_32.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_34"
          geometry={nodes.Object_34.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_34.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_36"
          geometry={nodes.Object_36.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_36.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_38"
          geometry={nodes.Object_38.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_38.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_40"
          geometry={nodes.Object_40.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_40.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_42"
          geometry={nodes.Object_42.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_42.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_44"
          geometry={nodes.Object_44.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_44.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_46"
          geometry={nodes.Object_46.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_46.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_48"
          geometry={nodes.Object_48.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_48.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_50"
          geometry={nodes.Object_50.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_50.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group
          name="Trainers_Cube001"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <skinnedMesh
            name="Trainers_Cube025_1001"
            geometry={nodes.Trainers_Cube025_1001.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Trainers_Cube025_1001.skeleton}
          />
          <skinnedMesh
            name="Trainers_Cube025_1001_1"
            geometry={nodes.Trainers_Cube025_1001_1.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Trainers_Cube025_1001_1.skeleton}
          />
        </group>
        <group
          name="Trainers_Cube025"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <skinnedMesh
            name="Trainers_Cube025_1"
            geometry={nodes.Trainers_Cube025_1.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Trainers_Cube025_1.skeleton}
          />
          <skinnedMesh
            name="Trainers_Cube025_1_1"
            geometry={nodes.Trainers_Cube025_1_1.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Trainers_Cube025_1_1.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/Chef_simplified.glb")).uri
);
