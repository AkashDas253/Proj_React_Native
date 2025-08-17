import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

// Quotes will be fetched from API

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

export default function App() {
  const [theme, setTheme] = useState('light');
  const [quotes, setQuotes] = useState([]);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    // Fetch 50 random quotes from ZenQuotes API, fallback to local quotes if failed
    fetch('https://zenquotes.io/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        // ZenQuotes returns [{q: quote, a: author, h: html}, ...]
        const formattedQuotes = data.map(q => ({ text: q.q, author: q.a }));
        setQuotes(formattedQuotes);
        setLoading(false);
      })
      .catch((err) => {
        // Fallback quotes
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

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNextQuote = () => {
    setQuoteIdx((quoteIdx + 1) % quotes.length);
  };

  const currentTheme = themes[theme];

  let quoteText = '';
  let quoteAuthor = '';
  if (quotes.length > 0) {
    quoteText = quotes[quoteIdx]?.text || '';
    quoteAuthor = quotes[quoteIdx]?.author || 'Unknown';
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}> 
      {loading ? (
        <Text style={[styles.quote, { color: currentTheme.textColor }]}>Loading...</Text>
      ) : error ? (
        <Text style={[styles.quote, { color: 'red' }]}>{error}</Text>
      ) : (
        <>
          <Text style={[styles.quote, { color: currentTheme.textColor }]}>
            {quoteText}
          </Text>
          <Text style={{ color: currentTheme.textColor, marginBottom: 20 }}>
            — {quoteAuthor}
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.buttonColor }]}
            onPress={handleNextQuote}
          >
            <Text style={{ color: currentTheme.buttonText }}>Next Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.buttonColor, marginTop: 10 }]}
            onPress={handleThemeToggle}
          >
            <Text style={{ color: currentTheme.buttonText }}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </Text>
          </TouchableOpacity>
        </>
      )}
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  quote: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
});
