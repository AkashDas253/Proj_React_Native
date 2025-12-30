import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles";

const Display = ({ input, result }) => {
  return (
    <View style={styles.displayContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        <Text style={styles.inputText}>{input || "0"}</Text>
      </ScrollView>
      <Text style={styles.resultText}>{result}</Text>
    </View>
  );
};

export default Display;