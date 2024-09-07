import { View, Text, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  ContactShadows,
  Grid,
  Helper,
  PerspectiveCamera,
  StatsGl,
} from "@react-three/drei/native";
import { DirectionalLightHelper, MathUtils } from "three";
import { useControls } from "leva";

type Props = {
  showGrid: boolean;
};

const StagePrep = ({ showGrid }: Props) => {
  const { cameraPos, cameraRotate } = useControls({
    cameraPos: {
      value: [0, 1, 7.5],
      joystick: true,
      step: 0.2,
    },
    cameraRotate: {
      value: [0, 0, 0],
      joystick: true,
      step: 0.2,
      min: 0,
      max: Math.PI * 2,
    },
  });
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={cameraPos}
        rotation={cameraRotate}
        fov={60}
      />
      <Grid visible={showGrid} infiniteGrid />
      {Platform.OS === "web" && <StatsGl />}
      <ambientLight intensity={1} />
      <directionalLight position={[-5, 5, 0]} intensity={5}>
        <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
      </directionalLight>
      {/* <color attach="background" args={["#512da8"]} /> */}
      <color attach="background" args={["#f4511e"]} />
      <ContactShadows />
    </>
  );
};

export default StagePrep;
