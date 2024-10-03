import { Audio } from "expo-av";

type MediaEvent = {
  trackName: string;
  start: number;
  duration: number;
};

class AudioManager {
  private static instance: AudioManager;
  private sounds: Record<string, Audio.Sound> = {};
  private isLoaded: Record<string, boolean> = {};

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async loadAudio(fileUri: string, trackName: string) {
    if (!this.isLoaded[trackName]) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: false }
        );
        this.sounds[trackName] = sound;
        this.isLoaded[trackName] = true;
        return sound;
      } catch (error) {
        console.error("Error loading audio:", error);
        return null;
      }
    }
  }

  async playSection(
    trackName: string,
    start: number,
    duration: number,
    onFinished?: (evt: MediaEvent) => void
  ) {
    if (this.sounds[trackName]) {
      try {
        await this.sounds[trackName].playFromPositionAsync(start * 1000);

        setTimeout(async () => {
          await this.sounds[trackName]?.stopAsync();
          if (onFinished)
            onFinished({
              duration: duration,
              start: start,
              trackName: trackName,
            });
        }, duration * 1000); // Duration in ms
      } catch (error) {
        console.error("Error playing section:", error);
      }
    }
  }

  async unloadAudio(trackName: string) {
    if (this.sounds[trackName] && this.isLoaded[trackName]) {
      await this.sounds[trackName].unloadAsync();
      this.isLoaded[trackName] = false;
    }
  }

  getSound(trackName: string) {
    return this.sounds[trackName];
  }
}

export default AudioManager;
