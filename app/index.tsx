import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, EventManager, RootState } from "@react-three/fiber/native";
import { Leva } from "leva";
import StagePrep from "@/components/StagePrep";
import MenuExperience from "@/components/MenuExperience";
import useControls from "r3f-native-orbitcontrols";
import * as THREE from "three";
import SceneLoader from "@/components/SceneLoader";
import GameExperience from "@/components/GameExperience";
import LoadingText from "@/components/LoadingText";

export const EXPERIENCES: Record<string, React.JSX.Element> = {
  game: <GameExperience />,
  menu: <MenuExperience />,
};

export default function Index() {
  return (
    <View style={{ ...styles.container }}>
      {Platform.OS === "web" && <Leva />}
      <Canvas camera={{ position: [0, 2, 10], fov: 30 }}>
        <StagePrep showGrid />
        <axesHelper />
        <SceneLoader scenes={EXPERIENCES} />
      </Canvas>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.footer}>
        <Text style={styles.footerText}>Made with 💖 for 🍕</Text>
      </SafeAreaView>
      <LoadingText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    userSelect: "none",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },

  footerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});
