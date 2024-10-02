import { StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import AnimatedButton from "./AnimatedButton";
import { useAtom } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";
import { useToppings } from "@/hooks/useToppings";

type Props = {};

const SpecialButton = (props: Props) => {
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);
  const [spawnPizzaBase, clearToppings] = useToppings((state) => [
    state.spawnPizzaBase,
    state.clearToppings,
  ]);

  const text = useMemo(() => {
    if (currentGamePhase.subphase === "specialButtonActive") {
      return currentGamePhase.specialButtonText;
    }
    return null;
  }, [currentGamePhase]);

  const handleClick = useCallback(() => {
    if (currentGamePhase.specialButtonText === "Take Order") {
      updateGamePhase("advancePhase");
    } else if (currentGamePhase.specialButtonText === "Spawn Pizza") {
      clearToppings();
      spawnPizzaBase();
      updateGamePhase("advancePhase");
    } else if (currentGamePhase.specialButtonText == "Ready") {
      updateGamePhase("advancePhase");
    } else if (currentGamePhase.specialButtonText == "Take out") {
      updateGamePhase("advancePhase");
    }
  }, [currentGamePhase, updateGamePhase, clearToppings]);

  return text ? (
    <AnimatedButton onPress={handleClick}>{text!}</AnimatedButton>
  ) : null;
};

export default SpecialButton;

const styles = StyleSheet.create({});
