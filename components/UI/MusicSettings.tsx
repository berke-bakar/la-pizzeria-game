import {
  Animated,
  Easing,
  GestureResponderEvent,
  Platform,
  PointerEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import CustomText from "../CustomText";
import { useAtom, useSetAtom } from "jotai";
import { overlayTextAtom } from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import { moderateScale } from "../Scaling";
import { Slider } from "@miblanchard/react-native-slider";
import useGameStore from "@/hooks/useGameStore";

type Props = {};

const CustomCheckbox = ({
  checked,
  onChange,
  color = "#000",
  size = 24,
}: {
  checked: boolean;
  onChange?: (newIsChecked: boolean) => void;
  color?: string;
  size?: number;
}) => {
  const handleButtonPress = useCallback(
    (evt: GestureResponderEvent) => {
      if (onChange) {
        onChange(!checked);
      }
    },
    [onChange, checked]
  );

  return (
    <Pressable
      onPress={handleButtonPress}
      style={[
        styles.checkbox,
        { width: size, height: size, borderColor: color },
      ]}
    >
      {checked ? (
        <View
          style={[
            styles.checked,
            {
              backgroundColor: color,
              width: size - 8,
              height: size - 8,
            },
          ]}
        />
      ) : null}
    </Pressable>
  );
};

const MusicSettings = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);
  const [playbackSettings, setPlaybackSettings] = useGameStore((state) => [
    state.playbackSettings,
    state.setPlaybackSettings,
  ]);
  const animRef = useMemo(() => new Animated.Value(0.5), []);

  useEffect(() => {
    Animated.timing(animRef, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    return () => {};
  }, [animRef]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    e.stopPropagation();
  }, []);

  const handleCloseButton = useCallback(() => {
    setOverlayText((prev) => ({ ...prev, show: false }));
  }, [setOverlayText]);

  const handleCheckboxClick = useCallback(
    (key: "background" | "soundEffects") => {
      return (newIsChecked: boolean) => {
        const accessedKey = `${key}Enabled`;
        setPlaybackSettings((prev) => ({
          ...prev,
          [accessedKey]: newIsChecked,
        }));
      };
    },
    []
  );

  const handleVolumeChange = useCallback(
    (key: "background" | "soundEffects") => {
      return (evt: number[]) => {
        const accessedKey = `${key}Volume`;
        const value = Number.parseFloat(evt[0].toFixed(2));
        setPlaybackSettings((prev) => ({
          ...prev,
          [accessedKey]: value,
        }));
      };
    },
    []
  );

  return (
    <Animated.View
      style={{ ...styles.container, transform: [{ scale: animRef }] }}
      onPointerDown={handlePointerDown}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: Platform.select({
            web: 0,
            native: 10,
          }),
        }}
      >
        <CustomText style={styles.header}>Music Settings</CustomText>
        <ScrollView style={styles.scrollable}>
          <View style={styles.settingItem}>
            <CustomText>Background Music:</CustomText>
            <CustomCheckbox
              checked={playbackSettings.backgroundEnabled}
              color="#B80000"
              onChange={handleCheckboxClick("background")}
            />
          </View>
          <View style={styles.settingItem}>
            <CustomText>Sount Effects:</CustomText>
            <CustomCheckbox
              checked={playbackSettings.soundEffectsEnabled}
              color="#B80000"
              onChange={handleCheckboxClick("soundEffects")}
            />
          </View>
          <View>
            <CustomText>Background Volume:</CustomText>
            <Slider
              animateTransitions
              minimumTrackTintColor={
                playbackSettings.backgroundEnabled ? "#B80000" : "#9b9b9b"
              }
              thumbStyle={
                playbackSettings.backgroundEnabled
                  ? { ...styles.thumb, ...styles.thumbActive }
                  : { ...styles.thumb, ...styles.thumbDisabled }
              }
              trackStyle={
                playbackSettings.backgroundEnabled
                  ? { ...styles.track, ...styles.trackActive }
                  : { ...styles.track, ...styles.trackDisabled }
              }
              minimumValue={0}
              maximumValue={1}
              value={playbackSettings.backgroundVolume}
              onSlidingComplete={handleVolumeChange("background")}
              trackMarks={[0, 0.5, 1.0]}
              disabled={!playbackSettings.backgroundEnabled}
            />
          </View>
          <View>
            <CustomText>Sound Effects Volume:</CustomText>
            <Slider
              animateTransitions
              minimumTrackTintColor={
                playbackSettings.soundEffectsEnabled ? "#B80000" : "#9b9b9b"
              }
              thumbStyle={
                playbackSettings.soundEffectsEnabled
                  ? { ...styles.thumb, ...styles.thumbActive }
                  : { ...styles.thumb, ...styles.thumbDisabled }
              }
              trackStyle={
                playbackSettings.soundEffectsEnabled
                  ? { ...styles.track, ...styles.trackActive }
                  : { ...styles.track, ...styles.trackDisabled }
              }
              minimumValue={0}
              maximumValue={1}
              value={playbackSettings.soundEffectsVolume}
              trackMarks={[0, 0.5, 1.0]}
              trackClickable
              onSlidingComplete={handleVolumeChange("soundEffects")}
              disabled={!playbackSettings.soundEffectsEnabled}
            />
          </View>
        </ScrollView>
      </View>
      <AnimatedButton onPress={handleCloseButton}>Close</AnimatedButton>
    </Animated.View>
  );
};

export default MusicSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(20),
    maxHeight: "70%",
    width: "60%",
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
    gap: 10,
  },

  header: {
    color: "#B80000",
    fontSize: moderateScale(18),
    includeFontPadding: false,
  },

  scrollable: {
    width: "80%",
  },

  info: {
    color: "#820300",
    fontSize: Platform.select({
      web: 16,
      native: 12,
    }),
    includeFontPadding: false,
    alignSelf: "center",
  },

  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  checked: {
    backgroundColor: "#000",
  },

  thumb: {
    borderRadius: 5,
    height: 30,
    width: 10,
  },

  thumbActive: {
    backgroundColor: "#eb6e1b",
  },

  thumbDisabled: {
    backgroundColor: "#8f8e8e",
  },

  track: {
    borderRadius: 5,
    height: 10,
  },

  trackActive: {
    backgroundColor: "#d0d0d0",
  },

  trackDisabled: {
    backgroundColor: "#b5b5b5",
  },
});
