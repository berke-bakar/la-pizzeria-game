import { View, Text } from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "@/constants/constants";
import LoadingText from "./LoadingText";
import SuspenseProgress from "./SuspenseProgress";

type Props = {
  scenes: Record<string, React.JSX.Element>;
};

const SceneLoader = ({ scenes }: Props) => {
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);

  return (
    <>
      <Suspense fallback={<SuspenseProgress />}>
        {scenes[currentScene]}
      </Suspense>
    </>
  );
};

export default SceneLoader;
