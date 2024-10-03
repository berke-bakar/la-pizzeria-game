import useAudioPermission from "@/hooks/useAudioPermission";
import { Asset } from "expo-asset";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import AudioManager from "./AudioManager";
import { playbackSettingsAtom } from "@/constants/constants";

export default function AudioLoader() {
  const playbackSettings = useAtomValue(playbackSettingsAtom);
  const audioManager = useMemo(() => AudioManager.getInstance(), []);
  const isAudioEnabled = useAudioPermission();
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    async function loadAudio() {
      await Promise.all([
        audioManager.loadAudio(
          Asset.fromModule(require("../../assets/sounds/ShakeAndBake.mp3")).uri,
          "background"
        ),
        audioManager.loadAudio(
          Asset.fromModule(require("../../assets/sounds/soundEffects.mp3")).uri,
          "soundEffects"
        ),
      ]).then((val) => {
        if (val[0] && val[1]) {
          setAudioLoaded(true);
          console.log("audio loaded");
        }
      });
    }
    if (!audioLoaded) loadAudio();
  }, []);

  useEffect(() => {
    if (audioLoaded) {
      const bgSound = audioManager.getSound("background");
      const soundEffects = audioManager.getSound("soundEffects");
      if (bgSound) {
        bgSound.setVolumeAsync(playbackSettings.backgroundVolume * 0.8);
      }
      if (soundEffects) {
        soundEffects.setVolumeAsync(playbackSettings.soundEffectsVolume);
      }
    }
  }, [
    playbackSettings.backgroundVolume,
    playbackSettings.soundEffectsVolume,
    audioLoaded,
  ]);

  useEffect(() => {
    if (audioLoaded && isAudioEnabled) {
      const bgSound = audioManager.getSound("background");
      const soundEffects = audioManager.getSound("soundEffects");
      if (bgSound) {
        if (playbackSettings.backgroundEnabled) {
          bgSound.setIsLoopingAsync(true);
          bgSound.playAsync();
        } else {
          bgSound.stopAsync();
        }
      }
      if (soundEffects && !playbackSettings.soundEffectsEnabled) {
        soundEffects.setVolumeAsync(0);
      }
    }
  }, [
    playbackSettings.backgroundEnabled,
    playbackSettings.soundEffectsEnabled,
    audioLoaded,
    isAudioEnabled,
  ]);

  return null;
}
