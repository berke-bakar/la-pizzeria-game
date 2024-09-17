import {
  View,
  Text,
  StyleSheet,
  PointerEvent,
  Modal,
  Alert,
} from "react-native";
import React, { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { overlayTextAtom } from "@/constants/constants";

type Props = {};

const OverlayTextPresenter = (props: Props) => {
  const [overlayText, setOverlayText] = useAtom(overlayTextAtom);

  const handleClick = useCallback(
    (e: PointerEvent) => {
      e.stopPropagation();
      setOverlayText((prev) => ({ ...prev, show: false }));
    },
    [setOverlayText]
  );

  if (!overlayText.OverlayItem) {
    return null;
  }

  return (
    overlayText.show && (
      <View
        style={styles.container}
        id="textOverlay"
        onPointerDown={handleClick}
      >
        <overlayText.OverlayItem />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 9000,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OverlayTextPresenter;
