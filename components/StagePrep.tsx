import { Platform } from "react-native";
import React from "react";
import { ContactShadows, Grid, StatsGl } from "@react-three/drei/native";

type Props = {
  debug: boolean;
};

const StagePrep = ({ debug = false }: Props) => {
  return (
    <>
      {Platform.OS === "web" && debug && <StatsGl />}
      <ambientLight intensity={1} />
      {debug && (
        <>
          <Grid infiniteGrid />
          <axesHelper />
        </>
      )}
      {/* {Platform.OS === "web" && <ContactShadows />} */}
    </>
  );
};

export default StagePrep;
