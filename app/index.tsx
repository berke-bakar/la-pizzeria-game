import { Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber/native";
import { Leva } from "leva";
import StagePrep from "@/components/StagePrep";
import MenuExperience from "@/components/MenuExperience";

export default function Index() {
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <Leva />}
      <Canvas>
        <StagePrep showGrid />
        <Suspense>
          <MenuExperience />
        </Suspense>
      </Canvas>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    left: 0,
    width: "100%",
    justifyContent: "center",
    gap: 20,
  },
});
