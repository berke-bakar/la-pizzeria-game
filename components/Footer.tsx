import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useAtomValue } from "jotai";
import { showFooterAtom } from "@/constants/constants";

const Footer = () => {
  const showFooter = useAtomValue(showFooterAtom);
  return (
    showFooter && (
      <SafeAreaView style={styles.footer}>
        <CustomText style={styles.footerText}>Made with 💖 for 🍕</CustomText>
      </SafeAreaView>
    )
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    userSelect: "none",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },

  footerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});
