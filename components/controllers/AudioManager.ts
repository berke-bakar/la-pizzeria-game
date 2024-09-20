import { Audio } from "expo-av";

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
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    }
  }

  async playSection(trackName: string, start: number, duration: number) {
    if (this.sounds[trackName]) {
      try {
        await this.sounds[trackName].setPositionAsync(start * 1000); // Start in ms
        await this.sounds[trackName].playAsync();

        setTimeout(async () => {
          await this.sounds[trackName]?.stopAsync();
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
}

export default AudioManager;
