import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../constants/theme';

const KeypadBtn = ({ label, type = 'number', onPress, flex = 1 }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(label);
  };

  const getStyles = () => {
    switch (type) {
      case 'accent': return { bg: COLORS.accent, txt: '#FFF', size: isLandscape ? 22 : 28 };
      case 'operator': return { bg: COLORS.operator, txt: '#FFF', size: isLandscape ? 24 : 32 };
      case 'function': return { bg: COLORS.function, txt: COLORS.text, size: isLandscape ? 16 : 20 };
      case 'red': return { bg: '#3A3A42', txt: COLORS.error, size: isLandscape ? 20 : 24 };
      default: return { bg: COLORS.number, txt: COLORS.text, size: isLandscape ? 22 : 30 };
    }
  };

  const theme = getStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.btn,
        { 
          backgroundColor: theme.bg, 
          flex: flex,
          aspectRatio: isLandscape ? undefined : (flex > 1 ? undefined : 1),
          height: isLandscape ? 45 : undefined, 
        }
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.txt, { color: theme.txt, fontSize: theme.size }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 4, 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  txt: {
    fontWeight: '600',
  }
});

export default KeypadBtn;