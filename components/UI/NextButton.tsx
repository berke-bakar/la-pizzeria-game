import React, { useCallback, useMemo } from "react";
import AnimatedButton from "./AnimatedButton";
import { useAtom, useSetAtom } from "jotai";
import {
  currentCameraStateAtom,
  gamePhaseControllerAtom,
} from "@/constants/constants";

type Props = {};

const NextButton = (props: Props) => {
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);
  const advanceCamera = useSetAtom(currentCameraStateAtom);

  const text = useMemo(() => {
    if (currentGamePhase.subphase === "nextButtonActive") {
      return currentGamePhase.nextButtonText;
    }
    return null;
  }, [currentGamePhase]);

  const handleClick = useCallback(() => {
    updateGamePhase("advancePhase");
    advanceCamera("advance");
    // if (currentGamePhase.nextButtonText !== "Deliver") advanceCamera("advance");
  }, [updateGamePhase, advanceCamera, currentGamePhase]);

  return (
    <AnimatedButton
      disabled={!text}
      onPointerDown={!!text ? handleClick : undefined}
    >
      {text ? text : "Next"}
    </AnimatedButton>
  );
};

export default NextButton;
