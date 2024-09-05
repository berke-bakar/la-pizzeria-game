import { Button, StyleSheet, Platform, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ref, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber/native";
import {
  ContactShadows,
  Grid,
  Helper,
  OrbitControls,
  StatsGl,
} from "@react-three/drei/native";
import { PhysicsProvider } from "@/context/PhysicsProvider";
import { PhysicsBodyWireframes } from "@/components/PhysicsBodyWireframes";
import { DirectionalLightHelper, Vector3 } from "three";
import Ground from "@/components/Ground";
import Box from "@/components/Box";
import { INGREDIENTS } from "@/constants/constants";
import { generateRandomPos } from "@/utils/utils";
import {
  PizzaBaseInstances,
  PizzaBaseModel,
} from "@/components/models/PizzaBase";

export default function Index() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [-7.5, 5, 7.55], fov: 30 }}>
        <OrbitControls makeDefault />
        <Grid infiniteGrid />
        {Platform.OS === "web" && <StatsGl />}
        <ambientLight intensity={10} />
        <directionalLight position={[5, 5, 0]} intensity={5}>
          <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
        </directionalLight>
        <color attach="background" args={["#512da8"]} />
        <PhysicsProvider>
          <PhysicsBodyWireframes />
          <Suspense>
            {/* <Box position={[0, 1, 0]} width={1} height={1} depth={1} /> */}
            <PizzaBaseInstances>
              <PizzaBaseModel position={new Vector3(0, 1, 0)} />
            </PizzaBaseInstances>
            {Object.keys(INGREDIENTS).map((val, ind) => {
              const Instances = INGREDIENTS[val].Instances;
              const Model = INGREDIENTS[val].Model;
              return (
                <Instances key={val}>
                  {Array.from({
                    length: count * Math.floor(Math.random() * 3),
                  }).map((val, ind) => {
                    return (
                      <Model
                        key={`${val}-${ind}`}
                        position={generateRandomPos(1, 3)}
                      />
                    );
                  })}
                </Instances>
              );
            })}
            <Ground />
          </Suspense>
        </PhysicsProvider>
      </Canvas>
      <StatusBar style="auto" />
      <View>
        <Button
          title="Spawn"
          onPress={() => {
            setCount((state) => state + 1);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
