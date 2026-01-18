import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import 'react-native-gesture-handler';

import CalculatorScreen from './src/screens/CalculatorScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
  useEffect(() => {
    async function initOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    initOrientation();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" translucent />
        <CalculatorScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg || '#000', 
  },
});