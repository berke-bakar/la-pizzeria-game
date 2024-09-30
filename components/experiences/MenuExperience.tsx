import React, { useEffect } from "react";
import Chef from "../models/Chef";
import Menu from "../Menu";
import Button3D from "../Button3D";
import { BuildingsScene } from "../models/BuildingsScene";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber/native";
import { Helper, Text3D } from "@react-three/drei/native";
import fontPath from "../../assets/fonts/PlaywriteCU_Regular.json";
import { useSetAtom } from "jotai";
import {
  cameraStateIndexAtom,
  currentSceneAtom,
  overlayTextAtom,
} from "@/constants/constants";
import HowToPlay from "../UI/HowToPlay";
import { DirectionalLightHelper, PerspectiveCamera } from "three";
import { useResetAtom } from "jotai/utils";
import Store from "../UI/Store";

const MenuExperience = ({
  visible,
  debug,
  ...props
}: JSX.IntrinsicElements["group"] & { debug: boolean }) => {
  const { camera } = useThree();
  const setCurrentScene = useSetAtom(currentSceneAtom);
  const setOverlayText = useSetAtom(overlayTextAtom);
  const resetCameraStateIndex = useResetAtom(cameraStateIndexAtom);

  function handleStartClick(evt: ThreeEvent<PointerEvent>) {
    evt.stopPropagation();
    setCurrentScene({ currentScene: "game", transitionNeeded: false });
    resetCameraStateIndex();
  }

  function handleStoreClick(evt: ThreeEvent<PointerEvent>) {
    evt.stopPropagation();
    setOverlayText({ OverlayItem: Store, show: true, closeable: true });
  }

  function handleHowToClick(evt: ThreeEvent<PointerEvent>) {
    evt.stopPropagation();
    setOverlayText({ OverlayItem: HowToPlay, show: true, closeable: true });
  }

  useEffect(() => {
    if (visible) {
      (camera as PerspectiveCamera).fov = 30;
      camera.updateProjectionMatrix();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <group visible={visible} {...props}>
        <directionalLight position={[-5, 5, 5]} intensity={visible ? 5 : 0}>
          {debug && visible && (
            <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
          )}
        </directionalLight>

        <BuildingsScene scale={2} position={[0, 0, -8]} rotation={[0, 0, 0]} />
        <Chef
          position={[0.8, 0, 0]}
          rotation={[0, -0.15, 0]}
          visible={visible}
        />
        <Menu position={[-1, 0.2, 0]} visible={visible}>
          <Text3D
            font={fontPath}
            scale={0.2}
            position-x={-0.75}
            visible={visible}
          >
            La Pizzeria
            <meshStandardMaterial color={"#FCDE70"} />
          </Text3D>
          <Button3D
            color="#512da8"
            width={1.1}
            height={0.5}
            depth={0.01}
            textScale={0.05}
            onPointerDown={visible ? handleStartClick : undefined}
            visible={visible}
          >
            Start Game
          </Button3D>
          <Button3D
            color="#512da8"
            width={1.1}
            height={0.5}
            depth={0.01}
            textScale={0.05}
            onPointerDown={visible ? handleStoreClick : undefined}
            visible={visible}
          >
            {"       Store"}
          </Button3D>
          <Button3D
            color="#512da8"
            width={1.1}
            height={0.5}
            depth={0.01}
            textScale={0.05}
            onPointerDown={visible ? handleHowToClick : undefined}
            visible={visible}
          >
            Learn How
          </Button3D>
        </Menu>
      </group>
    </>
  );
};

export default MenuExperience;
