import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const Display = ({ input, result }) => {
  return (
    <View style={styles.display}>
      <Text style={styles.inputText}>{input}</Text>
      <Text style={styles.resultText}>{result}</Text>
    </View>
  );
};

export default Display;
