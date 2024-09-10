import { Platform } from "react-native";
import React, { useEffect } from "react";
import {
  ContactShadows,
  PerspectiveCamera,
  OrbitControls,
  Grid,
  Helper,
  StatsGl,
} from "@react-three/drei/native";
import { DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber/native";

type Props = {
  showGrid: boolean;
};

const StagePrep = ({ showGrid }: Props) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, 1, -2);
  }, []);

  return (
    <>
      {/* <Grid visible={showGrid} infiniteGrid /> */}
      {Platform.OS === "web" && <StatsGl />}
      <ambientLight intensity={1} />
      {/* <axesHelper /> */}
      <directionalLight position={[-5, 5, 5]} intensity={5}>
        {/* <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} /> */}
      </directionalLight>
      {/* <color attach="background" args={["#512da8"]} /> */}
      <color attach="background" args={["#f4511e"]} />

      <ContactShadows />
    </>
  );
};

export default StagePrep;
