import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import QuoteCard from './components/QuoteCard';
import SettingsScreen from './components/SettingsScreen';
import StorageScreen from './components/StorageScreen';

const themes = {
  light: {
    backgroundColor: '#fff',
    textColor: '#222',
    buttonColor: '#222',
    buttonText: '#fff',
  },
  dark: {
    backgroundColor: '#222',
    textColor: '#fff',
    buttonColor: '#fff',
    buttonText: '#222',
  }
};

const bgShades = {
  default: '#fff',
  blue: '#e3f2fd',
  green: '#e8f5e9',
  yellow: '#fffde7',
};

function HomeScreen({ navigation, theme, setTheme, bgShade, setBgShade, savedQuotes, setSavedQuotes }) {
  const [quotes, setQuotes] = useState([]);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://zenquotes.io/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        const formattedQuotes = data.map(q => ({ text: q.q, author: q.a }));
        setQuotes(formattedQuotes);
        setLoading(false);
      })
      .catch((err) => {
        setQuotes([
          { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
          { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
          { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
          { text: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
          { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" }
        ]);
        setError('Showing local quotes.');
        setLoading(false);
      });
  }, []);

  const currentTheme = themes[theme];

  let quoteText = '';
  let quoteAuthor = '';
  if (quotes.length > 0) {
    quoteText = quotes[quoteIdx]?.text || '';
    quoteAuthor = quotes[quoteIdx]?.author || 'Unknown';
  }

  const handleNextQuote = () => {
    setQuoteIdx((quoteIdx + 1) % quotes.length);
  };

  const handleSaveQuote = async () => {
    try {
      const existing = await AsyncStorage.getItem('savedQuotes');
      let arr = existing ? JSON.parse(existing) : [];
      arr.push({ text: quoteText, author: quoteAuthor });
      await AsyncStorage.setItem('savedQuotes', JSON.stringify(arr));
      setSavedQuotes(arr);
      alert('Quote saved to device.');
    } catch (e) {
      alert('Failed to save quote.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgShades[bgShade], justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>Themed Quote App</Text>
      {loading ? (
        <QuoteCard quote="Loading..." author="" />
      ) : error ? (
        <QuoteCard quote={error} author="" />
      ) : (
        <QuoteCard quote={quoteText} author={quoteAuthor} onSave={handleSaveQuote} theme={theme} backgroundColor={bgShades[bgShade]} />
      )}
      <TouchableOpacity
        style={{ marginTop: 10, backgroundColor: currentTheme.buttonColor, padding: 12, borderRadius: 8 }}
        onPress={handleNextQuote}
      >
        <Text style={{ color: currentTheme.buttonText }}>Next Quote</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 10, backgroundColor: currentTheme.buttonColor, padding: 12, borderRadius: 8 }}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={{ color: currentTheme.buttonText }}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 10, backgroundColor: currentTheme.buttonColor, padding: 12, borderRadius: 8 }}
        onPress={() => navigation.navigate('Storage')}
      >
        <Text style={{ color: currentTheme.buttonText }}>Saved Quotes</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState('light');
  const [bgShade, setBgShade] = useState('default');
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quotes = await AsyncStorage.getItem('savedQuotes');
        setSavedQuotes(quotes ? JSON.parse(quotes) : []);
      } catch (e) {
        setSavedQuotes([]);
      }
    };
    fetchQuotes();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await AsyncStorage.setItem('theme', theme);
      await AsyncStorage.setItem('bgShade', bgShade);
      alert('Settings saved!');
    } catch (e) {
      alert('Failed to save settings.');
    }
  };

  const handleDeleteQuote = async (index) => {
    try {
      const updated = [...savedQuotes];
      updated.splice(index, 1);
      await AsyncStorage.setItem('savedQuotes', JSON.stringify(updated));
      setSavedQuotes(updated);
    } catch (e) {
      alert('Failed to delete quote.');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            headerTitle: () => (
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: themes[theme].textColor }}>Themed Quote App</Text>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Storage')}
                  style={{ marginRight: 16 }}
                  accessibilityLabel="Saved Quotes"
                >
                  <Text style={{ fontSize: 24 }}>💾</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                  style={{ marginRight: 16 }}
                  accessibilityLabel="Settings"
                >
                  <Text style={{ fontSize: 24 }}>⚙️</Text>
                </TouchableOpacity>
              </View>
            ),
            headerStyle: { backgroundColor: themes[theme].backgroundColor },
          })}
        >
          {props => (
            <HomeScreen
              {...props}
              theme={theme}
              setTheme={setTheme}
              bgShade={bgShade}
              setBgShade={setBgShade}
              savedQuotes={savedQuotes}
              setSavedQuotes={setSavedQuotes}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {props => (
            <SettingsScreen
              {...props}
              theme={theme}
              setTheme={setTheme}
              bgShade={bgShade}
              setBgShade={setBgShade}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Storage">
          {props => (
            <StorageScreen
              {...props}
              savedQuotes={savedQuotes}
              onDeleteQuote={handleDeleteQuote}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
