import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';

export default function QuoteCard({ quote, author, onSave, onDelete, theme = 'light', backgroundColor = '#fff' }) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${quote}" — ${author}`,
      });
    } catch (error) {
      // Optionally handle error
    }
  };

  const cardStyles = {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    backgroundColor: backgroundColor,
    ...(theme === 'dark' ? { borderColor: '#333', borderWidth: 1 } : {}),
  };

  return (
    <View style={cardStyles}>
      <Text style={{
        fontSize: 22,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 10,
        color: theme === 'dark' ? '#fff' : '#222',
      }}>{quote}</Text>
      <Text style={{
        fontSize: 16,
        color: theme === 'dark' ? '#bbb' : '#555',
        marginBottom: 10,
      }}>— {author}</Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
      }}>
        {onSave && (
          <TouchableOpacity style={{
            backgroundColor: '#2196F3',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 6,
            marginHorizontal: 4,
          }} onPress={onSave}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{
          backgroundColor: '#4CAF50',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 6,
          marginHorizontal: 4,
        }} onPress={handleShare}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Share</Text>
        </TouchableOpacity>
        {onDelete && (
          <TouchableOpacity style={{
            backgroundColor: '#F44336',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 6,
            marginHorizontal: 4,
          }} onPress={onDelete}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
