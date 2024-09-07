import { Float, RoundedBox, Text3D } from "@react-three/drei/native";
import { ThreeEvent } from "@react-three/fiber/native";
import React, { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import fontPath from "../assets/fonts/Poppins_Bold.json";

type Button3DProps = {
  position?: [number, number, number];
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
  color: string;
  height?: number;
  width?: number;
  depth?: number;
} & React.PropsWithChildren;

export default function Button3D({
  position = [0, 0, 0],
  onClick,
  children,
  color,
  height = 1,
  width = 1,
  depth = 1,
}: Button3DProps & JSX.IntrinsicElements["group"]) {
  return (
    <group>
      <RoundedBox
        position={new Vector3(...position)}
        args={[width, height, depth]}
        radius={0.3}
        smoothness={4}
        bevelSegments={4}
        creaseAngle={0.8}
      >
        <meshBasicMaterial color={color} />
        <Text3D
          font={fontPath}
          scale={0.1}
          bevelSegments={3}
          bevelEnabled
          bevelThickness={0.001}
          position={[-0.2, -0.1, 0.5]}
        >
          {children}
        </Text3D>
      </RoundedBox>
    </group>
  );
}
