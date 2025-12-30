import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Vibration } from "react-native";
import Display from "./Display";
import Button from "./Button";
import styles from "../styles";

const MAX_INPUT_LENGTH = 15;

const History = ({ history, onRestore }) => {
  const scrollViewRef = useRef();

  return (
    <View style={{ height: 100, width: "100%", paddingHorizontal: 20, marginBottom: 10 }}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={true}
      >
        {history.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => onRestore(item.result)}>
            <Text style={{ color: "#888", fontSize: 18, textAlign: "right", marginVertical: 2 }}>
              {item.expression} = <Text style={{ color: "#FFF" }}>{item.result}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handlePress = (value) => {
    if (result === "Error") {
      setResult("");
      setInput(value === "C" || value === "⌫" ? "" : value);
      return;
    }

    if (value === "C") {
      setInput("");
      setResult("");
      return;
    }

    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      if (input.length > 0) calculateResult();
      return;
    }

    if (input.length >= MAX_INPUT_LENGTH) {
      Vibration.vibrate(50);
      return;
    }

    if (value === "()") {
      const openCount = (input.match(/\(/g) || []).length;
      const closeCount = (input.match(/\)/g) || []).length;
      const lastChar = input.slice(-1);

      if (openCount > closeCount && input.length > 0 && /[\d)]/.test(lastChar)) {
        setInput((prev) => prev + ")");
      } else {
        if (/[\d)]/.test(lastChar)) {
          setInput((prev) => prev + "*(");
        } else {
          setInput((prev) => prev + "(");
        }
      }
      return;
    }

    if (value === "√") {
      const lastChar = input.slice(-1);
      if (/[\d)]/.test(lastChar)) {
        setInput((prev) => prev + "*√(");
      } else {
        setInput((prev) => prev + "√(");
      }
      return;
    }

    if (value === ".") {
      const splitNumbers = input.split(/[\+\-\*\/\%\(\)√]/);
      const currentNumber = splitNumbers[splitNumbers.length - 1];
      if (currentNumber.includes(".")) return;
      setInput((prev) => prev + ".");
      return;
    }

    if (["+", "-", "*", "/", "%"].includes(value)) {
      const lastChar = input.slice(-1);

      if (["+", "-", "*", "/", "."].includes(lastChar)) {
        if (value === "-" && ["*", "/"].includes(lastChar)) {
          setInput((prev) => prev + value);
        } else {
          setInput((prev) => prev.slice(0, -1) + value);
        }
        return;
      }
    }

    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      let formattedInput = input;
      const openCount = (formattedInput.match(/\(/g) || []).length;
      const closeCount = (formattedInput.match(/\)/g) || []).length;

      if (openCount > closeCount) {
        formattedInput += ")".repeat(openCount - closeCount);
      }

      const evalInput = formattedInput
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/\)\(/g, ")*(")
        .replace(/(\d)\(/g, "$1*(")
        .replace(/\)(\d)/g, ")*$1")
        .replace(/%/g, "/100");

      const finalResult = Function('"use strict";return (' + evalInput + ')')();

      if (!isFinite(finalResult) || isNaN(finalResult)) {
        setResult("Error");
        return;
      }

      const formattedResult = parseFloat(finalResult.toFixed(8)).toString();
      
      setHistory((prev) => [...prev.slice(-4), { expression: input, result: formattedResult }]);
      
      setResult(formattedResult);
      setInput(formattedResult.slice(0, MAX_INPUT_LENGTH));
    } catch (e) {
      setResult("Error");
    }
  };

  const restoreHistory = (val) => {
    setInput(val.toString());
    setResult("");
  };

  const buttons = [
    ["()", "√", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["C", "0", ".", "="],
  ];

  return (
    <View style={styles.container}>
      <History history={history} onRestore={restoreHistory} />
      <Display input={input} result={result} />
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => {
              const isBlue = ["/", "*", "-", "+", "="].includes(item);
              const isGray = ["C", "()", "√", "%"].includes(item);
              return (
                <Button
                  key={item}
                  label={item}
                  onPress={() => handlePress(item)}
                  isBlue={isBlue}
                  isGray={isGray}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calculator;