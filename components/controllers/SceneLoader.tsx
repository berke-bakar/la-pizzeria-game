import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useAtomValue } from "jotai";
import { currentSceneAtom } from "@/constants/constants";
import SuspenseProgress from "../SuspenseProgress";
import MenuExperience from "../experiences/MenuExperience";
import { Color } from "three";
import GameExperience from "../experiences/GameExperience";

type Props = {
  debug: boolean;
};

const SceneLoader = ({ debug }: Props) => {
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
      </Suspense>
    </>
  );
};

export default SceneLoader;
