import React, { useEffect, useState, useMemo } from "react";
import { Image, View, StyleSheet } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import { customerOrderAtom, typingFinishedAtom } from "@/constants/constants";
import CustomText from "../CustomText";

const characterImages = {
  suitMan: "../../assets/images/characters/suitMan.png",
  suitWoman: "../../assets/images/characters/suitWoman.png",
  casualMan: "../../assets/images/characters/casualMan.png",
  casualWoman: "../../assets/images/characters/casualWoman.png",
  punk: "../../assets/images/characters/punk.png",
  worker: "../../assets/images/characters/worker.png",
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
        <Image source={{ uri: selectedImage }} style={styles.image} />
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
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffffffb5",
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: "70%",
    position: "absolute",
    right: 0,
    left: 0,
    height: "20%",
    zIndex: 8000,
    bottom: 30,
    marginHorizontal: "auto",
    gap: 45,
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
    fontSize: 20,
    color: "#333",
  },
});

export default ConversationBox;
