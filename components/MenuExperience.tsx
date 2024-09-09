import React, { useEffect, useRef, useState } from "react";
import Chef from "./models/Chef";
import Menu from "./Menu";
import { useControls } from "leva";
import Button3D from "./Button3D";
import { BuildingsScene } from "./models/BuildingsScene";
import { ThreeEvent } from "@react-three/fiber/native";
import { Text3D } from "@react-three/drei/native";
import fontPath from "../assets/fonts/PlaywriteCU_Regular.json";
import { useAtom } from "jotai";
import { currentSceneAtom } from "@/constants/constants";

const MenuExperience = (props: JSX.IntrinsicElements["group"]) => {
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);
  const {
    chefPos,
    chefRot,
    chefScale,
    menuExpPos,
    buildingsPos,
    buildingsRot,
    buildingsScale,
  } = useControls({
    chefPos: { value: [0.8, 0, 0], step: 0.2 },
    chefRot: {
      value: [0, -0.15, 0],
      joystick: true,
      step: 0.01,
      min: -3.14,
      max: 3.14,
    },
    chefScale: {
      value: 2,
      step: 0.1,
      min: 0,
      max: 10,
    },
    menuExpPos: { value: [-1, 0.2, 0], step: 0.2 },
    buildingsPos: { value: [0, 0, -6], step: 0.2 },
    buildingsRot: {
      value: [0, 0, 0],
      joystick: true,
      step: 0.2,
      min: 0,
      max: Math.PI * 2,
    },
    buildingsScale: {
      value: 2,
      step: 0.1,
      min: 0,
      max: 10,
    },
  });

  function handleClick(evt: ThreeEvent<PointerEvent>) {
    evt.stopPropagation();
    // setStartPlaying(!startPlaying);
    setCurrentScene("game");
  }

  return (
    <group {...props}>
      <BuildingsScene
        scale={buildingsScale}
        position={buildingsPos}
        rotation={buildingsRot}
      />
      <Chef scale={chefScale} position={chefPos} rotation={chefRot} />
      <Menu position={menuExpPos}>
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
          onPointerDown={handleClick}
        >
          Start Game
        </Button3D>
        <Button3D
          color="#512da8"
          width={1.1}
          height={0.5}
          depth={0.01}
          textScale={0.05}
        >
          Learn How
        </Button3D>
      </Menu>
    </group>
  );
};

export default MenuExperience;
