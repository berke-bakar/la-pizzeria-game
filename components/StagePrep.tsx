import { Platform } from "react-native";
import React, { useEffect } from "react";
import {
  ContactShadows,
  Grid,
  Helper,
  StatsGl,
} from "@react-three/drei/native";

type Props = {
  debug: boolean;
};

const StagePrep = ({ debug = false }: Props) => {
  return (
    <>
      <Grid visible={debug} infiniteGrid />
      {Platform.OS === "web" && debug && <StatsGl />}
      <ambientLight intensity={1} />
      <axesHelper visible={debug} />
      <ContactShadows />
    </>
  );
};

export default StagePrep;
