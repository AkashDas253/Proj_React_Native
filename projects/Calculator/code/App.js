import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Calculator from "./src/components/Calculator";
import { theme } from "./src/styles";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <Calculator />
    </SafeAreaView>
  );
};

export default App;