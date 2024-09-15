import React, { Suspense } from "react";
import { useAtomValue } from "jotai";
import { currentSceneAtom } from "@/constants/constants";
import SuspenseProgress from "./SuspenseProgress";
import MenuExperience from "./experiences/MenuExperience";
import GameExperience from "./experiences/GameExperience";

type Props = {
  debug: boolean;
};

const SceneLoader = ({ debug }: Props) => {
  const currentSceneInfo = useAtomValue(currentSceneAtom);
  return (
    <>
      <Suspense fallback={<SuspenseProgress />}>
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
