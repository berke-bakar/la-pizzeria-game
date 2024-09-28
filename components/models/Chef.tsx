import * as THREE from "three";
import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber/native";
import { useGLTF, useAnimations } from "@react-three/drei/native";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { Asset } from "expo-asset";

type ActionName = "Angry.001";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Object_7003: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
  };
};

export default function Chef(props: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group<THREE.Object3DEventMap>>();
  const { nodes, materials, animations } = useGLTF(
    Asset.fromModule(require("../../assets/models/Chef_simplified.glb")).uri
  );
  const { actions } = useAnimations(animations as GLTFAction[], group);

  useEffect(() => {
    const action = actions["Angry.001"];
    if (action) {
      action.clampWhenFinished = true;
      // action.setLoop(THREE.LoopOnce, 1);
      if (props.visible) {
        action?.play();
      } else {
        action?.stop();
      }
    }

    return () => {
      if (action) action.stop();
    };
  }, [props.visible]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature001" rotation={[Math.PI / 2, 0, 0]}>
          <skinnedMesh
            name="Object_7003"
            geometry={nodes.Object_7003.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_7003.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/Chef_simplified.glb")).uri
);
