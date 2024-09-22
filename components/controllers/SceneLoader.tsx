import React, { Suspense, useMemo } from "react";
import { useAtomValue } from "jotai";
import { currentSceneAtom } from "@/constants/constants";
import SuspenseProgress from "../SuspenseProgress";
import MenuExperience from "../experiences/MenuExperience";
import GameExperience from "../experiences/GameExperience";
import { Color } from "three";

type Props = {
  debug: boolean;
};

const SceneLoader = ({ debug }: Props) => {
  const currentSceneInfo = useAtomValue(currentSceneAtom);
  const color =
    currentSceneInfo.currentScene === "menu" ? "#f4511e" : "#009dff";

  return (
    <>
      <Suspense fallback={<SuspenseProgress />}>
        <color attach="background" args={[new Color(color)]} />

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
