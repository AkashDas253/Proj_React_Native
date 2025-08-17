import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

const colorOptions = [
  { key: 'default', label: 'Default', color: '#fff' },
  { key: 'blue', label: 'Blue', color: '#e3f2fd' },
  { key: 'green', label: 'Green', color: '#e8f5e9' },
  { key: 'yellow', label: 'Yellow', color: '#fffde7' },
];

export default function SettingsScreen({ theme, setTheme, bgShade, setBgShade, onSaveSettings }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: bgShade === 'default' ? '#fff' : colorOptions.find(opt => opt.key === bgShade)?.color }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: theme === 'dark' ? '#fff' : '#222' }}>App Settings</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginRight: 10, color: theme === 'dark' ? '#fff' : '#222' }}>Dark Theme</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={val => setTheme(val ? 'dark' : 'light')}
        />
      </View>
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10, color: theme === 'dark' ? '#fff' : '#222' }}>Background Color</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
        {colorOptions.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: opt.color,
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
