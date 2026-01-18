import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  bg: '#000000',
  surface: '#1C1C1E',
  accent: '#5E5CE6',
  operator: '#FF9F0A',
  function: '#A5A5A5',
  number: '#333333',
  text: '#FFFFFF',
  textDim: '#8E8E93',
  error: '#FF453A',
};

export const LAYOUT = {
  spacing: 12,
  buttonSize: (width - (12 * 5)) / 4,
  borderRadius: 40,
};