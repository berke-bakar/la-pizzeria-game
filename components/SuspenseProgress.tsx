import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useAtom, useSetAtom } from "jotai";
import { currentSceneAtom, progressAtom } from "@/constants/constants";

type Props = {};

const SuspenseProgress = (props: Props) => {
  const { progress } = useProgress();
  const setProgress = useSetAtom(progressAtom);
  const setCurrentScene = useSetAtom(currentSceneAtom);
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
        setProgress(0);
      } else {
        setProgress(progress);
      }
    }
  }, [progress]);

  return null;
};

export default SuspenseProgress;
