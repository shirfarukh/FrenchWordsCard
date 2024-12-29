import React, { useState } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { vocabularyData } from './VocabularyData';

export default function Flashcard() {
  const [sound, setSound] = useState(null);

  // Function to play the pronunciation sound
  async function playSound(pronunciation) {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(pronunciation);
    setSound(newSound);
    await newSound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Render each vocabulary item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.translation}>Translation: {item.translation}</Text>
      <Text style={styles.example}>Example: {item.example}</Text>
      <Button title="Play Pronunciation" onPress={() => playSound(item.pronunciation)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vocabularyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.word}
      />
    </View>
  );
}

// Styling for the flashcard component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  translation: {
    fontSize: 18,
    color: '#444',
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 8,
    color: '#666',
  }
});
