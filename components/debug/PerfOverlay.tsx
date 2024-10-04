import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAtomValue } from "jotai";
import { perfMonitorAtom } from "@/constants/constants";

type Props = {
  perf: boolean;
};

const PerfOverlay = ({ perf }: Props) => {
  const perfInfo = useAtomValue(perfMonitorAtom);

  if (!perf) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.textInfo}>Frame: {perfInfo.frame}</Text>
      <Text style={styles.textInfo}>Draw Calls: {perfInfo.calls}</Text>
      <Text style={styles.textInfo}>Triangles: {perfInfo.triangles}</Text>
      <Text style={styles.textInfo}>Geometries: {perfInfo.geometries}</Text>
      <Text style={styles.textInfo}>Textures: {perfInfo.textures}</Text>
    </View>
  );
};

export default PerfOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9000,
    right: 10,
    top: "20%",
    backgroundColor: "black",
    borderRadius: 8,
    padding: 10,
    userSelect: "none",
  },

  textInfo: {
    fontSize: 20,
    color: "white",
    userSelect: "none",
  },
});
