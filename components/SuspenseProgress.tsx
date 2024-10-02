import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useSetAtom } from "jotai";
import {
  cameraStateIndexAtom,
  currentSceneAtom,
  progressAtom,
} from "@/constants/constants";
import { useResetAtom } from "jotai/utils";

type Props = {};

const SuspenseProgress = (props: Props) => {
  const { progress, active } = useProgress();
  const setProgress = useSetAtom(progressAtom);
  const setCurrentScene = useSetAtom(currentSceneAtom);
  const resetCameraStateIndex = useResetAtom(cameraStateIndexAtom);
  useEffect(() => {
    if (progress) {
      if (progress === 100) {
        setCurrentScene((prev) => ({
          currentScene: prev.currentScene,
          transitionNeeded: false,
        }));
        resetCameraStateIndex();
        setProgress({ progress: 0, active: false });
      } else {
        setProgress({ progress, active });
      }
    }
  }, [progress]);

  return null;
};

export default SuspenseProgress;
