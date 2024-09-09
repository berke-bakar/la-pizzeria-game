import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useAtom } from "jotai";
import { progressAtom } from "@/constants/constants";

type Props = {};

const SuspenseProgress = (props: Props) => {
  const { progress } = useProgress();
  const [_, setProgress] = useAtom(progressAtom);
  useEffect(() => {
    if (progress) {
      setProgress(progress);
    }
  }, [progress]);

  return null;
};

export default SuspenseProgress;
