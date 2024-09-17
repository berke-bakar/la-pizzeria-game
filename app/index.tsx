import { Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Canvas } from "@react-three/fiber/native";
import { Leva } from "leva";
import StagePrep from "@/components/StagePrep";
import SceneLoader from "@/components/controllers/SceneLoader";
import LoadingText from "@/components/LoadingText";
import OverlayTextPresenter from "@/components/controllers/OverlayTextPresenter";
import { Bungee_400Regular, useFonts } from "@expo-google-fonts/bungee";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Asset } from "expo-asset";
import CameraController from "@/components/controllers/CameraController";
import HUD from "@/components/UI/HUD";
import Footer from "@/components/Footer";

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

  const debug = Platform.OS === "web" && location.hash === "#debug";

  return (
    <View style={{ ...styles.container }}>
      {Platform.OS === "web" && location.pathname === "#debug" && <Leva />}
      <Canvas
        camera={{ position: [0, 2, 10], fov: 30, rotation: [-0.1, 0, 0] }}
      >
        <StagePrep debug={debug} />
        <SceneLoader debug={debug} />
        <CameraController debug={debug} />
      </Canvas>
      <StatusBar style="auto" />
      <Footer />
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
});
