import { useState } from 'react';

import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOption } from '../types';

const moods: MoodOption[] = [

  { emoji: '😭', description: 'Terrible' },

  { emoji: '😞', description: 'Bad' },

  { emoji: '😐', description: 'Neutral' },

  { emoji: '😊', description: 'Good' },

  { emoji: '😁', description: 'Great' },

];

export default function MoodScreen() {

  const [selectedMood, setSelectedMood] = useState<MoodOption>();

  const [moodHistory, setMoodHistory] = useState<MoodOption[]>([]);

  const saveMood = async () => {

    if (!selectedMood) return;

    

    const newHistory = [...moodHistory, selectedMood];

    setMoodHistory(newHistory);

    await AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));

    setSelectedMood(undefined);

  };

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>How are you feeling today?</Text>

      

      <View style={styles.moodOptions}>

        {moods.map((mood) => (

          <Pressable

            key={mood.emoji}

            onPress={() => setSelectedMood(mood)}

            style={[

              styles.moodButton,

              selectedMood?.emoji === mood.emoji && styles.selectedMood

            ]}

          >

            <Text style={styles.moodEmoji}>{mood.emoji}</Text>

            <Text style={styles.moodText}>{mood.description}</Text>

          </Pressable>

        ))}

      </View>

      <Pressable 

        style={styles.saveButton} 

        onPress={saveMood}

        disabled={!selectedMood}

      >

        <Text style={styles.saveButtonText}>Save Mood</Text>

      </Pressable>

      <Text style={styles.historyTitle}>Mood History</Text>

      {moodHistory.map((mood, index) => (

        <View key={index} style={styles.historyItem}>

          <Text style={styles.historyEmoji}>{mood.emoji}</Text>

          <Text style={styles.historyText}>{mood.description}</Text>

          <Text style={styles.historyDate}>

            {new Date().toLocaleDateString()}

          </Text>

        </View>

      ))}

    </ScrollView>

  );

}



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFE6E6', // Soft pink background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#AD88C6', // Deep purple for the title
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  moodButton: {
    backgroundColor: '#E1AFD1', // Light purple for buttons
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexBasis: '30%',
  },
  selectedMood: {
    backgroundColor: '#AD88C6', // Deep purple for selected mood
    borderColor: '#AD88C6',
    borderWidth: 1,
  },
  moodEmoji: {
    fontSize: 30,
    marginBottom: 5,
    color: '#FFFFFF', // White for emojis
  },
  moodText: {
    fontSize: 12,
    color: '#FFFFFF', // White for text
  },
  saveButton: {
    backgroundColor: '#AD88C6', // Deep purple for save button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#FFFFFF', // White for save button text
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#AD88C6', // Deep purple for history title
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E1AFD1', // Light purple for history items
    borderRadius: 8,
    marginBottom: 5,
  },
  historyEmoji: {
    fontSize: 24,
    marginRight: 10,
    color: '#FFFFFF', // White for history emojis
  },
  historyText: {
    flex: 1,
    marginRight: 10,
    color: '#FFFFFF', // White for history text
  },
  historyDate: {
    color: '#FFFFFF', // White for history date
  },
});
