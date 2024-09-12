import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Canvas } from "@react-three/fiber/native";
import { Leva } from "leva";
import StagePrep from "@/components/StagePrep";
import MenuExperience from "@/components/experiences/MenuExperience";
import SceneLoader from "@/components/SceneLoader";
import GameExperience from "@/components/experiences/GameExperience";
import LoadingText from "@/components/LoadingText";
import OverlayTextPresenter from "@/components/OverlayTextPresenter";
import { Bungee_400Regular, useFonts } from "@expo-google-fonts/bungee";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Asset } from "expo-asset";
import CustomText from "@/components/CustomText";
import CameraController from "@/components/CameraController";
import HUD from "@/components/UI/HUD";

export const EXPERIENCES: Record<string, (props: any) => React.JSX.Element> = {
  game: GameExperience,
  menu: MenuExperience,
};

SplashScreen.preventAutoHideAsync();

export default function Index() {
  let [loaded, error] = useFonts({
    Bungee_400Regular: Asset.fromModule(Bungee_400Regular),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ ...styles.container }}>
      {Platform.OS === "web" && <Leva />}
      <Canvas
        camera={{ position: [0, 2, 10], fov: 30, rotation: [-0.1, 0, 0] }}
      >
        <StagePrep debug />
        <SceneLoader scenes={EXPERIENCES} />
        <CameraController />
      </Canvas>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.footer}>
        <CustomText style={styles.footerText}>Made with 💖 for 🍕</CustomText>
      </SafeAreaView>
      <LoadingText />
      <OverlayTextPresenter />
      <HUD />
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
