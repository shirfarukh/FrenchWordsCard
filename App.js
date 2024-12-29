import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Flashcard from './components/Flashcard';

export default function App() {
  const [showFlashcard, setShowFlashcard] = useState(false);

  return (
    <View style={styles.container}>
      {showFlashcard ? (
        <Flashcard />
      ) : (
        <TouchableOpacity
          style={styles.button} 
          onPress={() => setShowFlashcard(true)}
          > 
          <Text style={styles.buttonText}>ذخیره لغات</Text>
        </TouchableOpacity>

        
        
      )}
      {showFlashcard && (
        <Button 
          title="صفحه اول" 
          onPress={() => setShowFlashcard(false)} 
        />
      )}
    </View>
  );
}

// Styling for the main app container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#152D47',
  },
  button: {
    width: 100, 
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  }
});
