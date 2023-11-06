import React from "react";
import { RadioButton } from "react-native-paper";

export default function RadioButtonscmp({ selectedValue, onValueChange }) {
  return (
    <RadioButton.Group onValueChange={onValueChange} value={selectedValue}>
      <RadioButton.Item label="User Profile " value="option1" />
      <RadioButton.Item label="Apartments Profile" value="option2" />
    </RadioButton.Group>
  );
}
