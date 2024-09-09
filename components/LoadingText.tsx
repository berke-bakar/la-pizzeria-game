import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei/native";
import { createPortal } from "@react-three/fiber";
import { progressAtom } from "@/constants/constants";
import { useAtom } from "jotai";

type Props = {};

const LoadingText = (props: Props) => {
  const [progress] = useAtom(progressAtom);
  // Initial value for opacity: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Initial value for width: 0
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }),
    ]);
    const loopAnim = Animated.loop(animation, {
      resetBeforeIteration: true,
      // iterations: 10,
    });
    loopAnim.start();

    return () => {
      loopAnim.stop();
      animation.stop();
    };
  }, [fadeAnim]);

  useEffect(() => {
    const prevAnim = Animated.timing(progressAnim, {
      toValue: progress,
      useNativeDriver: true,
      duration: 100,
    });
    prevAnim.start();

    return () => {
      prevAnim.stop();
    };
  }, [progress]);

  return (
    <View style={{ ...styles.loadingContainer }}>
      <Animated.Text style={{ ...styles.loadingText, opacity: fadeAnim }}>
        Loading...{progress.toFixed(0)}%
      </Animated.Text>
      <Animated.View
        style={{ ...styles.loadingProgressContainer, opacity: fadeAnim }}
      >
        <Animated.View
          style={{
            ...styles.loadingProgressIndicator,
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          }}
        ></Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "rgba(244, 80, 30, 1)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },

  loadingText: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },

  loadingProgressContainer: {
    width: "50%",
    maxWidth: 500,
    height: 75,
    borderWidth: 10,
    borderColor: "white",
  },
  loadingProgressIndicator: {
    backgroundColor: "white",
    height: "100%",
    width: "0%",
  },
});

export default LoadingText;
