import { Platform } from "react-native";
import { useThree } from "@react-three/fiber/native";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { perfMonitorAtom } from "@/constants/constants";

type Props = {
  perf: boolean;
};

const SimplePerfMonitor = ({ perf }: Props) => {
  const setPerfMonitorScores = useSetAtom(perfMonitorAtom);
  const { gl } = useThree();
  useEffect(() => {
    let intervalId = undefined;
    if (perf)
      intervalId = setInterval(() => {
        setPerfMonitorScores({
          frame: gl.info.render.frame,
          calls: gl.info.render.calls,
          triangles: gl.info.render.triangles,
          geometries: gl.info.memory.geometries,
          textures: gl.info.memory.textures,
        });
      }, 5000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gl]);

  return null;
};

export default SimplePerfMonitor;
