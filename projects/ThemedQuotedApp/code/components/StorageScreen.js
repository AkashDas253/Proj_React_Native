import React from 'react';
import { View, Text, FlatList } from 'react-native';
import QuoteCard from './QuoteCard';

export default function StorageScreen({ savedQuotes, onDeleteQuote }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>Saved Quotes</Text>
      {savedQuotes && savedQuotes.length > 0 ? (
        <FlatList
          data={savedQuotes}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => (
            <QuoteCard
              quote={item.text}
              author={item.author}
              onDelete={() => onDeleteQuote(index)}
            />
          )}
        />
      ) : (
        <Text style={{ fontSize: 18, textAlign: 'center' }}>No quotes saved yet.</Text>
      )}
    </View>
  );
}
