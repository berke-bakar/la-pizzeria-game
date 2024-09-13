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
  const { progress } = useProgress();
  const setProgress = useSetAtom(progressAtom);
  const setCurrentScene = useSetAtom(currentSceneAtom);
  const resetCameraStateIndex = useResetAtom(cameraStateIndexAtom);
  useEffect(() => {
    if (progress) {
      if (
        100 - Number.EPSILON <= progress &&
        progress >= 100 + Number.EPSILON
      ) {
        setCurrentScene((prev) => ({
          currentScene: prev.currentScene,
          transitionNeeded: false,
        }));
        resetCameraStateIndex();
        setProgress(0);
      } else {
        setProgress(progress);
      }
    }
  }, [progress]);

  return null;
};

export default SuspenseProgress;
