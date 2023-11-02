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
        marginTop: 20,
        position: "absolute",
        bottom: 10,
        width: 240,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: -99999,
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
