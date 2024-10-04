import React, { Suspense, useMemo } from "react";
import { useAtomValue } from "jotai";
import { currentSceneAtom } from "@/constants/constants";
import SuspenseProgress from "../SuspenseProgress";
import MenuExperience from "../experiences/MenuExperience";
import { Color } from "three";
import GameExperience from "../experiences/GameExperience";
import AudioLoader from "./AudioLoader";
import SimplePerfMonitor from "../debug/SimplePerfMonitor";

type Props = {
  debug?: boolean;
  perf?: boolean;
};

const SceneLoader = ({ debug = false, perf = false }: Props) => {
  const currentSceneInfo = useAtomValue(currentSceneAtom);
  const currentColor = useMemo(
    () =>
      new Color(
        currentSceneInfo.currentScene === "menu" ? "#f4511e" : "#009dff"
      ),
    [currentSceneInfo.currentScene]
  );

  return (
    <>
      <Suspense fallback={<SuspenseProgress />}>
        <color attach="background" args={[currentColor]} />
        <MenuExperience
          visible={currentSceneInfo.currentScene === "menu"}
          debug={debug}
        />
        <GameExperience
          visible={currentSceneInfo.currentScene === "game"}
          debug={debug}
        />
        <AudioLoader />
        <SimplePerfMonitor perf={perf} />
      </Suspense>
    </>
  );
};

export default SceneLoader;
