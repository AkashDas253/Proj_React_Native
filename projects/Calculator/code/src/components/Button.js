import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const Button = ({ label, onPress, isBlue, isGray }) => {
  const buttonStyle = [
    styles.button,
    isBlue && styles.buttonBlue,
    isGray && styles.buttonLight,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;