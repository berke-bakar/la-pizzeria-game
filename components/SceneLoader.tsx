import { View, Text } from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "@/constants/constants";
import LoadingText from "./LoadingText";
import SuspenseProgress from "./SuspenseProgress";
import { PhysicsProvider } from "@/context/PhysicsProvider";

type Props = {
  scenes: Record<string, (props: any) => React.JSX.Element>;
};

const SceneLoader = ({ scenes }: Props) => {
  const [currentSceneInfo, setCurrentSceneInfo] = useAtom(currentSceneAtom);
  const CurrentScene = scenes[currentSceneInfo.currentScene];
  return (
    <>
      <Suspense fallback={<SuspenseProgress />}>
        <CurrentScene />
      </Suspense>
    </>
  );
};

export default SceneLoader;
