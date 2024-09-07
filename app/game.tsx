import { StyleSheet, Platform, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ref, Suspense, useContext, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber/native";
import {
  ContactShadows,
  Grid,
  Helper,
  StatsGl,
  OrbitControls,
} from "@react-three/drei/native";
import { PhysicsProvider, WorldContext } from "@/context/PhysicsProvider";
import { PhysicsBodyWireframes } from "@/components/PhysicsBodyWireframes";
import { DirectionalLightHelper, Vector3 } from "three";
import Ground from "@/components/Ground";
import { INGREDIENTS } from "@/constants/constants";
import { generateRandomPos } from "@/utils/utils";
import {
  PizzaBaseInstances,
  PizzaBaseModel,
} from "@/components/models/PizzaBase";
import { TouchableOpacity } from "react-native";
import { useToppings } from "@/hooks/useToppings";
import { Link } from "expo-router";

export default function Index() {
  const [addTopping, lastAddedTopping, toppings] = useToppings((state) => [
    state.addTopping,
    state.lastAddedTopping,
    state.toppings,
  ]);
  const world = useContext(WorldContext);

  function handlePress(key: string) {
    for (let index = 0; index < Math.floor(Math.random() * 4) + 3; index++) {
      addTopping(key, generateRandomPos(0.5, 3));
    }
  }

  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [-7.5, 5, 7.5], fov: 30 }}>
        <OrbitControls makeDefault />
        {/* <Grid infiniteGrid /> */}
        {Platform.OS === "web" && <StatsGl />}
        <ambientLight intensity={1} />
        <directionalLight position={[-5, 5, 0]} intensity={5}>
          <Helper type={DirectionalLightHelper} args={[1, 0xff0000]} />
        </directionalLight>
        <color attach="background" args={["#512da8"]} />
        {/* <color attach="background" args={["#f4511e"]} /> */}
        <PhysicsProvider>
          {Platform.OS === "web" && <PhysicsBodyWireframes />}
          <Suspense>
            <PizzaBaseInstances>
              <PizzaBaseModel
                position={new Vector3(0, 1, 0)}
                scale={[2, 2, 2]}
              />
            </PizzaBaseInstances>
            {Object.keys(INGREDIENTS).map((val, ind) => {
              const Instances = INGREDIENTS[val].Instances;
              const Model = INGREDIENTS[val].Model;
              return (
                <Instances key={val}>
                  {toppings[val] &&
                    toppings[val].map((topping, toppingIndex) => {
                      let position = topping.initialPos;
                      if (topping.id !== lastAddedTopping?.id && world) {
                        const body = world.bodies.find(
                          (body) => body.id === topping.id
                        );
                        if (body) {
                          position.copy(body.position);
                        }
                      }
                      return (
                        <Model
                          key={`${val}-${toppingIndex}`}
                          position={position}
                          bodyId={topping.id}
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
      {/* <StatusBar style="auto" /> */}
      <View style={styles.buttonContainer}>
        <Link href="/" asChild>
          <Pressable>
            <Text>Home</Text>
          </Pressable>
        </Link>
        {Object.entries(INGREDIENTS).map(([key, val], ind) => {
          return (
            <TouchableOpacity
              key={key}
              style={{
                borderWidth: 10,
                borderColor: "rgba(0,0,0,1)",
                width: 100,
                height: 100,
                backgroundColor: "rgba(255, 255, 255, 0.65)",
                borderRadius: 50,
              }}
              onPress={() => handlePress(key)}
              id={`${key}Button`}
            >
              <Text
                style={{
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  paddingVertical: "40%",
                }}
              >
                {key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    left: 0,
    width: "100%",
    justifyContent: "center",
    gap: 20,
  },
});
