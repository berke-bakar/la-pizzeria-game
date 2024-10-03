import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { useAtomValue, useSetAtom } from "jotai";
import { overlayTextAtom, playbackSettingsAtom } from "@/constants/constants";
import MusicSettings from "./MusicSettings";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {};

const MusicSettingsButton = (props: Props) => {
  const playbackSettings = useAtomValue(playbackSettingsAtom);
  const setOverlayText = useSetAtom(overlayTextAtom);
  const soundIcon =
    playbackSettings.backgroundVolume === 0 ||
    !playbackSettings.backgroundEnabled
      ? "music-off"
      : "music";

  const handleSettingsClick = useCallback(() => {
    setOverlayText({ OverlayItem: MusicSettings, show: true, closeable: true });
  }, [setOverlayText]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.musicIcon} onPress={handleSettingsClick}>
        <MaterialCommunityIcons
          style={{ userSelect: "none" }}
          name={soundIcon}
          size={30}
          color="black"
        />
      </Pressable>
    </View>
  );
};

export default MusicSettingsButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 8000,
    top: Platform.select({ web: 20, native: 25 }),
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center",
  },

  musicIcon: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    elevation: 15,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});
