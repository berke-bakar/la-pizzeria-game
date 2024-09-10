import {
  Float,
  Outlines,
  RoundedBox,
  Sparkles,
  Text3D,
} from "@react-three/drei/native";
import { ThreeEvent } from "@react-three/fiber/native";
import React, { useMemo, useRef, useState } from "react";
import { Mesh, MeshStandardMaterial, Vector3 } from "three";
// import fontPath from "../assets/fonts/Poppins_Bold.json";
import fontPath from "../assets/fonts/BungeeSpice_Regular.json";
import { useSpring, a, config } from "@react-spring/three";

const AnimatedRoundedBox = a(RoundedBox);

type Button3DProps = {
  position?: [number, number, number];
  onPointerDown?: ((event: ThreeEvent<PointerEvent>) => void) | undefined;
  color: string;
  height?: number;
  width?: number;
  depth?: number;
  textScale?: number;
} & React.PropsWithChildren;

const animConfig = {
  ...config.wobbly,
  duration: 120,
};

export default function Button3D({
  position = [0, 0, 0],
  children,
  color,
  height = 1,
  width = 1,
  depth = 1,
  textScale = 1,
  onPointerDown,
  ...props
}: Button3DProps & JSX.IntrinsicElements["group"]) {
  const [springProps, api] = useSpring(
    () => ({
      scale: 1,
      color: color,
    }),
    []
  );
  function handleClick(e: ThreeEvent<PointerEvent>) {
    api.start({
      to: {
        scale: 1.25,
        color: "#ff00ff",
      },
      onRest: (result, spring) => {
        spring.start({
          to: {
            scale: 1,
            color: color,
          },
          config: animConfig,
          onResolve: () => {
            if (onPointerDown) onPointerDown(e);
          },
        });
      },
      config: animConfig,
    });
  }

  return (
    <a.group {...props} scale={springProps.scale} onPointerDown={handleClick}>
      <AnimatedRoundedBox
        position={position}
        args={[width, height, depth]}
        radius={0.1}
        smoothness={3}
        bevelSegments={4}
        creaseAngle={0.8}
      >
        <a.meshStandardMaterial color={springProps.color} />
        <Outlines thickness={0.01} color={"#ff7d4e"} />
        <Text3D
          font={fontPath}
          scale={textScale}
          bevelSegments={3}
          bevelEnabled
          bevelThickness={0.001}
          position={[-width / 3.5 + 0.1, -0.01, depth / 2 + 0.001]}
        >
          {children}
        </Text3D>
      </AnimatedRoundedBox>
    </a.group>
  );
}
