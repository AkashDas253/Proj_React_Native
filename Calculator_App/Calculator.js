import React, { useState } from "react";
import { View } from "react-native";
import Display from "./Display";
import Button from "./Button";
import styles from "./styles";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString());
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["C", "0", "=", "+"],
  ];

  return (
    <View style={styles.container}>
      <Display input={input} result={result} />
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <Button key={item} label={item} onPress={() => handlePress(item)} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calculator;
