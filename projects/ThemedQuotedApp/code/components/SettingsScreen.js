import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

const colorOptions = [
  { key: 'default', label: 'Default', colorLight: '#fff', colorDark: '#222', textLight: '#222', textDark: '#fff' },
  { key: 'blue', label: 'Blue', colorLight: '#e3f2fd', colorDark: '#1565c0', textLight: '#1565c0', textDark: '#e3f2fd' },
  { key: 'green', label: 'Green', colorLight: '#e8f5e9', colorDark: '#388e3c', textLight: '#388e3c', textDark: '#e8f5e9' },
  { key: 'yellow', label: 'Yellow', colorLight: '#fffde7', colorDark: '#fbc02d', textLight: '#fbc02d', textDark: '#fffde7' },
];

export default function SettingsScreen({ theme, setTheme, bgShade, setBgShade, onSaveSettings }) {
  const selectedBg = colorOptions.find(opt => opt.key === bgShade) || colorOptions[0];
  const bgColor = theme === 'dark' ? selectedBg.colorDark : selectedBg.colorLight;
  const textColor = theme === 'dark' ? selectedBg.textDark : selectedBg.textLight;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: bgColor }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: textColor }}>App Settings</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginRight: 10, color: textColor }}>Dark Theme</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={val => setTheme(val ? 'dark' : 'light')}
        />
      </View>
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10, color: textColor }}>Background Color</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
        {colorOptions.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: theme === 'dark' ? opt.colorDark : opt.colorLight,
              borderWidth: bgShade === opt.key ? 3 : 1,
              borderColor: bgShade === opt.key ? '#2196F3' : '#ccc',
              marginHorizontal: 8,
            }}
            onPress={() => setBgShade(opt.key)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{ backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, marginBottom: 10 }}
        onPress={onSaveSettings}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
