import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, LAYOUT } from '../constants/theme';

const CalcButton = ({ label, type = 'number', onPress, flex = 1 }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(label);
  };

  const getStyle = () => {
    const fontScale = isLandscape ? 0.8 : 1;

    switch (type) {
      case 'accent': 
        return { bg: COLORS.accent, txt: '#FFF', fontSize: 32 * fontScale };
      case 'operator': 
        return { bg: COLORS.operator, txt: '#FFF', fontSize: 34 * fontScale };
      case 'function': 
        return { bg: COLORS.function, txt: '#000', fontSize: 26 * fontScale };
      case 'scientific': 
        return { bg: COLORS.surface, txt: COLORS.text, fontSize: 20 * fontScale };
      default: 
        return { bg: COLORS.number, txt: COLORS.text, fontSize: 32 * fontScale };
    }
  };

  const styleConfig = getStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        { 
          backgroundColor: styleConfig.bg, 
          flex: flex, 
          aspectRatio: isLandscape ? undefined : (flex > 1 ? undefined : 1),
          
          height: isLandscape ? '90%' : undefined, 
          margin: isLandscape ? 4 : 6, 
          borderRadius: isLandscape ? 10 : LAYOUT.borderRadius || 24,
        }
      ]}
      onPress={handlePress}
    >
      <Text 
        style={[
          styles.text, 
          { 
            color: styleConfig.txt, 
            fontSize: styleConfig.fontSize,
            paddingHorizontal: 2 
          }
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CalcButton;