import React, { useEffect, useRef, useState } from "react";
import Chef from "../models/Chef";
import Menu from "../Menu";
// import { useControls } from "leva";
import Button3D from "../Button3D";
import { BuildingsScene } from "../models/BuildingsScene";
import { ThreeEvent } from "@react-three/fiber/native";
import { Svg, Text3D } from "@react-three/drei/native";
import fontPath from "../../assets/fonts/PlaywriteCU_Regular.json";
import { useAtom, useSetAtom } from "jotai";
import { currentSceneAtom, overlayTextAtom } from "@/constants/constants";
import { Asset } from "expo-asset";
import HowToPlay from "../UI/HowToPlay";

const MenuExperience = (props: JSX.IntrinsicElements["group"]) => {
  const setCurrentScene = useSetAtom(currentSceneAtom);
  const setOverlayText = useSetAtom(overlayTextAtom);
  // const {
  //   chefPos,
  //   chefRot,
  //   chefScale,
  //   menuExpPos,
  //   buildingsPos,
  //   buildingsRot,
  //   buildingsScale,
  // } = useControls({
  //   chefPos: { value: [0.8, 0, 0], step: 0.2 },
  //   chefRot: {
  //     value: [0, -0.15, 0],
  //     joystick: true,
  //     step: 0.01,
  //     min: -3.14,
  //     max: 3.14,
  //   },
  //   chefScale: {
  //     value: 2,
  //     step: 0.1,
  //     min: 0,
  //     max: 10,
  //   },
  //   menuExpPos: { value: [-1, 0.2, 0], step: 0.2 },
  //   buildingsPos: { value: [0, 0, -8], step: 0.2 },
  //   buildingsRot: {
  //     value: [0, 0, 0],
  //     joystick: true,
  //     step: 0.2,
  //     min: 0,
  //     max: Math.PI * 2,
  //   },
  //   buildingsScale: {
  //     value: 2,
  //     step: 0.1,
  //     min: 0,
  //     max: 10,
  //   },
  // });

  function handleStartClick(evt: ThreeEvent<PointerEvent>) {
    evt.stopPropagation();
    setCurrentScene({ currentScene: "game", transitionNeeded: false });
  }

  function handleHowToClick(evt: ThreeEvent<PointerEvent>) {
    evt.stopPropagation();
    setOverlayText({ OverlayItem: HowToPlay, show: true });
  }

  return (
    <group {...props}>
      {/* <BuildingsScene
        scale={buildingsScale}
        position={buildingsPos}
        rotation={buildingsRot}
      /> */}
      <BuildingsScene scale={2} position={[0, 0, -8]} rotation={[0, 0, 0]} />
      {/* <Chef scale={chefScale} position={chefPos} rotation={chefRot} /> */}
      <Chef scale={2} position={[0.8, 0, 0]} rotation={[0, -0.15, 0]} />
      {/* <mesh scale={0.01} rotation={[0, 0, 0]} position={[1.2, 2.5, 0]}>
        <Svg
          src={Asset.fromModule("../assets/images/speech_bubble.svg").uri}
          position={[0, 0, 0]}
        />
      </mesh> */}
      <Menu position={[-1, 0.2, 0]}>
        <Text3D
          font={fontPath}
          scale={0.2}
          bevelSegments={3}
          bevelEnabled
          bevelThickness={0.001}
          position-x={-0.75}
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
          onPointerDown={handleStartClick}
        >
          Start Game
        </Button3D>
        <Button3D
          color="#512da8"
          width={1.1}
          height={0.5}
          depth={0.01}
          textScale={0.05}
          onPointerDown={handleHowToClick}
        >
          Learn How
        </Button3D>
      </Menu>
    </group>
  );
};

export default MenuExperience;
