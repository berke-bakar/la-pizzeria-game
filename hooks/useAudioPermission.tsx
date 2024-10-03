import { useEffect, useState } from "react";
import { Platform } from "react-native";

const useAudioPermission = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(
    Platform.OS === "web" ? false : true
  );

  useEffect(() => {
    if (Platform.OS === "web") {
      let context: AudioContext;
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        context = new (window.AudioContext || window.webkitAudioContext)();

        const unlockAudio = () => {
          if (context.state === "suspended") {
            context.resume().then(() => {
              setIsAudioEnabled(true);
            });
          }
        };

        document.body.addEventListener("click", unlockAudio);
        return () => {
          document.body.removeEventListener("click", unlockAudio);
        };
      }
    }
  }, []);

  return isAudioEnabled;
};

export default useAudioPermission;
