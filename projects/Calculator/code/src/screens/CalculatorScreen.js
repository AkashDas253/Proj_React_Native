import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { History, Maximize2, Minimize2 } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useCalcStore } from '../store/useCalcStore';
import { COLORS } from '../constants/theme';
import CalcButton from '../components/CalcButton';
import HistoryDrawer from '../components/HistoryDrawer';

const CalculatorScreen = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  
  const { input, result, addToInput, backspace, clear, calculate } = useCalcStore();
  const [historyVisible, setHistoryVisible] = React.useState(false);

  const toggleRotation = async () => {
    try {
      if (isLandscape) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      }
    } catch (error) {
      console.error("Failed to change orientation:", error);
    }
  };

  const mainKeys = [
    ['AC', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
  ];
  const sciKeys = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', 'π', 'e', '^', 'abs(', '(', ')'];

  // --- LAYOUT A: PORTRAIT (Standard) ---
  const PortraitLayout = () => (
    <View style={styles.flex1}>
      <View style={[styles.displayArea, { flex: 1.2 }]}>
        <Text style={styles.portraitInput} numberOfLines={2} adjustsFontSizeToFit>{input || '0'}</Text>
        <Text style={styles.portraitResult}>{result ? `= ${result}` : ''}</Text>
      </View>
      <View style={styles.keypadPortrait}>
        {mainKeys.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map(k => (
              <CalcButton key={k} label={k} type={getBtnType(k)} onPress={getBtnAction(k)} />
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <CalcButton label="0" flex={2} onPress={addToInput} />
          <CalcButton label="." onPress={addToInput} />
          <CalcButton label="=" type="operator" onPress={calculate} />
        </View>
      </View>
    </View>
  );

  // --- LAYOUT B: LANDSCAPE (Scientific) ---
  const LandscapeLayout = () => (
    <View style={styles.flex1}>
      <View style={[styles.displayArea, { flex: 0.8, paddingBottom: 10 }]}>
        <Text style={styles.landscapeInput} numberOfLines={1} adjustsFontSizeToFit>{input || '0'}</Text>
        <Text style={styles.landscapeResult}>{result ? `= ${result}` : ''}</Text>
      </View>
      
      <View style={[styles.row, { flex: 2 }]}>
        <View style={styles.sciSection}>
          <View style={styles.gridInner}>
            {sciKeys.map(k => (
              <View key={k} style={styles.sciBtnWrapper}>
                <CalcButton label={k} type="scientific" onPress={addToInput} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.mainSection}>
          {mainKeys.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map(k => (
                <CalcButton key={k} label={k} type={getBtnType(k)} onPress={getBtnAction(k)} />
              ))}
            </View>
          ))}
          <View style={styles.row}>
            <CalcButton label="0" flex={2} onPress={addToInput} />
            <CalcButton label="." onPress={addToInput} />
            <CalcButton label="=" type="operator" onPress={calculate} />
          </View>
        </View>
      </View>
    </View>
  );

  // Helper logic for buttons
  const getBtnType = (k) => ['÷','×','−','+'].includes(k) ? 'operator' : (['AC','⌫','%'].includes(k) ? 'function' : 'number');
  const getBtnAction = (k) => k === 'AC' ? clear : (k === '⌫' ? backspace : addToInput);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
      <HistoryDrawer visible={historyVisible} onClose={() => setHistoryVisible(false)} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setHistoryVisible(true)}>
          <History color={COLORS.textDim} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={toggleRotation}>
          {isLandscape ? <Minimize2 color={COLORS.accent} size={22} /> : <Maximize2 color={COLORS.textDim} size={22} />}
        </TouchableOpacity>
      </View>

      {isLandscape ? <LandscapeLayout /> : <PortraitLayout />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  flex1: { flex: 1 },
  row: { flexDirection: 'row', flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    height: 50, 
    alignItems: 'center',
    zIndex: 10
  },
  iconBtn: { padding: 10, backgroundColor: COLORS.surface, borderRadius: 12 },
  
  // Display Styles
  displayArea: { justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 30 },
  portraitInput: { color: '#FFF', fontSize: 70, fontWeight: '300' },
  portraitResult: { color: COLORS.accent, fontSize: 35, marginTop: 5 },
  landscapeInput: { color: '#FFF', fontSize: 45, fontWeight: '300' },
  landscapeResult: { color: COLORS.accent, fontSize: 25 },

  // Keypad Styles
  keypadPortrait: { flex: 2, paddingHorizontal: 10, paddingBottom: 20 },
  sciSection: { flex: 1, paddingRight: 10 },
  mainSection: { flex: 1.5 },
  gridInner: { flexDirection: 'row', flexWrap: 'wrap', flex: 1 },
  sciBtnWrapper: { width: '33%', height: '25%' }, 
});

export default CalculatorScreen;