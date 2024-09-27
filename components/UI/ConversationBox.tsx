import React, { useEffect, useState, useMemo } from "react";
import { Image, View, StyleSheet, Platform } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import { customerOrderAtom, typingFinishedAtom } from "@/constants/constants";
import CustomText from "../CustomText";
import { Asset } from "expo-asset";

const characterImages = {
  suitMan: require("../../assets/images/characters/suitMan.png"),
  suitWoman: require("../../assets/images/characters/suitWoman.png"),
  casualMan: require("../../assets/images/characters/casualMan.png"),
  casualWoman: require("../../assets/images/characters/casualWoman.png"),
  punk: require("../../assets/images/characters/punk.png"),
  worker: require("../../assets/images/characters/worker.png"),
};

const ConversationBox: React.FC = () => {
  const customerOrder = useAtomValue(customerOrderAtom);
  const setTypingFinished = useSetAtom(typingFinishedAtom);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thinkingDots, setThinkingDots] = useState("");

  const selectedImage = useMemo(() => {
    return characterImages[customerOrder.selectedCharacter];
  }, [customerOrder.selectedCharacter]);

  // Reset when order changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setThinkingDots("");
    setTypingFinished(false);
  }, [customerOrder.order, setTypingFinished]);

  useEffect(() => {
    const typeDots = () => {
      setThinkingDots((prev) => {
        if (prev.length < 3) {
          return prev + ".";
        } else {
          return "";
        }
      });
    };
    if (customerOrder.show) {
      const intervalId = setInterval(typeDots, 300);

      return () => clearInterval(intervalId);
    }
  }, [thinkingDots, customerOrder]);

  useEffect(() => {
    if (customerOrder.show) {
      if (currentIndex < customerOrder.order.length) {
        const timer = setTimeout(() => {
          setDisplayedText(
            (prev) => prev + `${customerOrder.order[currentIndex]}, `
          );
          setCurrentIndex((prev) => prev + 1);
          setThinkingDots("");
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        setTypingFinished(true);
      }
    } else {
    }
  }, [currentIndex, customerOrder, setTypingFinished]);

  return (
    customerOrder.show && (
      <View style={styles.container}>
        <Image
          source={{ uri: Asset.fromModule(selectedImage).uri }}
          style={styles.image}
        />
        <View style={styles.textBox}>
          <CustomText style={styles.text}>
            {displayedText}
            {thinkingDots}
          </CustomText>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 8000,
    width: "60%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffffffb5",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    elevation: 5,
    height: "20%",
    bottom: 30,
    gap: Platform.select({
      web: 45,
      native: 20,
    }),
  },
  image: {
    height: "80%",
    aspectRatio: 1,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: Platform.select({
      web: 20,
      native: 12,
    }),
    color: "#333",
  },
});

export default ConversationBox;
