import React, { useState, useEffect } from 'react';
import {
 View,
 Text,
 StyleSheet,
 Pressable,
 ScrollView,
 TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { MoodOption } from '../../types';
import { MaterialIcons } from '@expo/vector-icons';

const moods: MoodOption[] = [
 { emoji: '😭', description: 'Terrible', gradient: ['#C68FE6', '#FFCFCF'] },
 { emoji: '😞', description: 'Bad', gradient: ['#789DBC', '#FFE2E2'] },
 { emoji: '😐', description: 'Neutral', gradient: ['#86A788', '#789DBC'] },
 { emoji: '😊', description: 'Good', gradient: ['#FFE2E2', '#86A788'] },
 { emoji: '😁', description: 'Great', gradient: ['#FFCFCF', '#C68FE6'] },
];


export default function MoodScreen() {
 const [selectedMood, setSelectedMood] = useState<MoodOption>();
 const [moodHistory, setMoodHistory] = useState<MoodOption[]>([]);
 const [gradientColors, setGradientColors] = useState(['#FFFFFF', '#FFFFFF']);


 // State for journal entries
 const [gratitude, setGratitude] = useState('');
 const [challenges, setChallenges] = useState('');
 const [reflection, setReflection] = useState('');


 useEffect(() => {
 loadMoodHistory();
 }, []);


 useEffect(() => {
 if (selectedMood) {
 setGradientColors(selectedMood.gradient);
 } else {
 setGradientColors(['#FFFFFF', '#FFFFFF']);
 }
 }, [selectedMood]);


 const loadMoodHistory = async () => {
 try {
 const storedHistory = await AsyncStorage.getItem('moodHistory');
 if (storedHistory) {
 setMoodHistory(JSON.parse(storedHistory));
 }
 } catch (error) {
 console.error('Failed to load mood history:', error);
 }
 };


 const saveMood = async () => {
 if (!selectedMood) return;


 try {
 const journalEntry = {
 mood: selectedMood,
 gratitude: gratitude,
 challenges: challenges,
 reflection: reflection,
 timestamp: new Date().toISOString(),
 };


 const newHistory = [...moodHistory, journalEntry];
 setMoodHistory(newHistory);
 await AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));
 setSelectedMood(undefined);
 setGratitude('');
 setChallenges('');
 setReflection('');
 } catch (error) {
 console.error('Failed to save mood:', error);
 }
 };


 return (
 <LinearGradient colors={gradientColors} style={styles.container}>
 <ScrollView contentContainerStyle={styles.scrollContent}>
 <Text style={styles.title}>Daily Journal</Text>


 {/* Mood Selection */}
 <View style={styles.section}>
 <Text style={styles.sectionTitle}>How are you feeling today?</Text>
 <View style={styles.moodOptions}>
 {moods.map((mood) => (
 <Pressable
 key={mood.emoji}
 onPress={() => setSelectedMood(mood)}
 style={[
 styles.moodButton,
 selectedMood?.emoji === mood.emoji && styles.selectedMood,
 ]}
 >
 <Text style={styles.moodEmoji}>{mood.emoji}</Text>
 <Text style={styles.moodText}>{mood.description}</Text>
 </Pressable>
 ))}
 </View>
 </View>


 {/* Gratitude Section */}
 <View style={styles.section}>
 <Text style={styles.sectionTitle}>Gratitude</Text>
 <TextInput
 style={styles.input}
 placeholder="What are you grateful for today?"
 value={gratitude}
 onChangeText={setGratitude}
 />
 </View>


 {/* Challenges Section */}
 <View style={styles.section}>
 <Text style={styles.sectionTitle}>Challenges</Text>
 <TextInput
 style={styles.input}
 placeholder="What challenges did you face today?"
 value={challenges}
 onChangeText={setChallenges}
 />
 </View>


 {/* Reflection Section */}
 <View style={styles.section}>
 <Text style={styles.sectionTitle}>Reflection</Text>
 <TextInput
 style={[styles.input, styles.multilineInput]}
 placeholder="Reflect on your day"
 multiline
 value={reflection}
 onChangeText={setReflection}
 />
 </View>


 <Pressable
 style={styles.saveButton}
 onPress={saveMood}
 disabled={!selectedMood}
 >
 <MaterialIcons name="save" size={24} color="#FFFDEC" />
 <Text style={styles.saveButtonText}>Save Mood</Text>
 </Pressable>


 {/* Mood History */}
 <Text style={styles.historyTitle}>Mood History</Text>
 {moodHistory.map((entry, index) => (
 <View key={index} style={styles.historyItem}>
 <Text style={styles.historyEmoji}>{entry.mood?.emoji}</Text>
 <Text style={styles.historyText}>{entry.mood?.description}</Text>
 <Text style={styles.historyDate}>
 {new Date(entry.timestamp).toLocaleDateString()}
 </Text>
 </View>
 ))}
 </ScrollView>
 </LinearGradient>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 },
 scrollContent: {
 padding: 20,
 alignItems: 'center',
 flexGrow: 1,
 },
 title: {
 fontSize: 28,
 fontWeight: 'bold',
 marginBottom: 20,
 textAlign: 'center',
 color: '#789DBC',
 },
 section: {
 marginBottom: 20,
 padding: 15,
 borderRadius: 10,
 backgroundColor: '#FFE2E2', // Consistent background
 width: '90%',
 },
 sectionTitle: {
 fontSize: 18,
 fontWeight: '600',
 marginBottom: 10,
 color: '#5E5E5E',
 },
 input: {
 borderWidth: 1,
 borderColor: '#FFCFCF',
 borderRadius: 8,
 padding: 10,
 fontSize: 16,
 backgroundColor: '#fff',
 color: '#333',
 marginBottom: 10,
 },
 multilineInput: {
 height: 100,
 textAlignVertical: 'top',
 },
 moodOptions: {
 flexDirection: 'row',
 justifyContent: 'space-around',
 flexWrap: 'wrap',
 marginTop: 10,
 },
 moodButton: {
 backgroundColor: '#FFE2E2',
 padding: 12,
 borderRadius: 20,
 alignItems: 'center',
 margin: 5,
 },
 selectedMood: {
 backgroundColor: '#FFCFCF',
 },
 moodEmoji: {
 fontSize: 24,
 marginBottom: 5,
 },
 moodText: {
 fontSize: 12,
 color: '#789DBC',
 fontWeight: '600',
 },
 saveButton: {
 backgroundColor: '#86A788',
 padding: 15,
 borderRadius: 25,
 alignItems: 'center',
 marginVertical: 20,
 flexDirection: 'row',
 },
 saveButtonText: {
 color: '#fff',
 fontWeight: 'bold',
 fontSize: 16,
 textTransform: 'uppercase',
 letterSpacing: 1,
 marginLeft: 10,
 },
 historyTitle: {
 fontSize: 20,
 fontWeight: '600',
 marginBottom: 10,
 color: '#789DBC',
 },
 historyItem: {
 flexDirection: 'row',
 alignItems: 'center',
 padding: 15,
 backgroundColor: '#f9f9f9',
 borderRadius: 12,
 marginBottom: 10,
 },
 historyEmoji: {
 fontSize: 28,
 marginRight: 15,
 },
 historyText: {
 flex: 1,
 marginRight: 10,
 color: '#789DBC',
 fontWeight: '500',
 fontSize: 14,
 },
 historyDate: {
 color: '#666',
 fontSize: 12,
 fontStyle: 'italic',
 },
});

