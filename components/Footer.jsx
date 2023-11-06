import { View } from "react-native";
import React from "react";
import Button from "./Button";

const COLORS = {
  like: "#1B263B",
  nope: "#1B263B",
};

const Footer = ({ handleChoice }) => {
  return (
    <View
      style={{
        marginBottom:0,
        position: "fixed",
        bottom:-640,
        width: 240,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex:9,
      }}
    >
      <Button
        name="times"
        size={36}
        color={COLORS.nope}
        onPress={() => handleChoice(-1)}
      />
      <Button
        name="heart"
        size={32}
        color={COLORS.like}
        onPress={() => handleChoice(1)}
      />
    </View>
  );
};

export default Footer;
