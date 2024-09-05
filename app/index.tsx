import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei/native";
import { PhysicsProvider } from "@/context/PhysicsProvider";
import { useCannon } from "@/hooks/useCannon";
import * as CANNON from "cannon-es";
import { PhysicsBodyWireframes } from "@/components/PhysicsBodyWireframes";

type BoxProps = {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
};

const Box = ({ position, width, height, depth }: BoxProps) => {
  const ref = useCannon({ mass: 10 }, (body) => {
    body.addShape(
      new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
    );
    body.position.set(...position);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[width, height, depth]} />
      <meshBasicMaterial attach="material" />
    </mesh>
  );
};

const Ground = () => {
  const ref = useCannon({ mass: 0 }, (body) => {
    const groundShape = new CANNON.Plane();
    body.addShape(groundShape);
    body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 8, 8]} />
      <meshBasicMaterial attach="material" />
    </mesh>
  );
};

export default function Index() {
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [-7.5, 5, 7.55], fov: 30 }}>
        <OrbitControls makeDefault />
        <color attach="background" args={["#512da8"]} />
        <PhysicsProvider>
          <PhysicsBodyWireframes />
          <Suspense>
            <Box position={[0, 1, 0]} width={1} height={1} depth={1} />
            <Ground />
          </Suspense>
        </PhysicsProvider>
      </Canvas>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
