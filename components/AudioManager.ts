import { Audio } from "expo-av";

class AudioManager {
  private static instance: AudioManager;
  private sound: Audio.Sound | null = null;
  private isLoaded = false;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async loadAudio(fileUri: string) {
    if (!this.isLoaded) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: false }
        );
        this.sound = sound;
        this.isLoaded = true;
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    }
  }

  async playSection(start: number, duration: number) {
    if (this.sound) {
      try {
        await this.sound.setPositionAsync(start * 1000); // Start in ms
        await this.sound.playAsync();

        setTimeout(async () => {
          await this.sound?.stopAsync();
        }, duration * 1000); // Duration in ms
      } catch (error) {
        console.error("Error playing section:", error);
      }
    }
  }

  async unloadAudio() {
    if (this.sound && this.isLoaded) {
      await this.sound.unloadAsync();
      this.isLoaded = false;
    }
  }
}

export default AudioManager;
