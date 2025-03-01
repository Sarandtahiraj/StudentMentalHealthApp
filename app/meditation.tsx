import { View, Text, StyleSheet, Pressable } from 'react-native';

const exercises = [
  { title: 'Deep Breathing', duration: 5 },
  { title: 'Body Scan', duration: 10 },
  { title: 'Mindful Walking', duration: 15 },
  { title: 'Guided Imagery', duration: 20 },
];

export default function MeditationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relaxation Exercises</Text>

      {exercises.map((exercise, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.exerciseCard,
            pressed && styles.pressedCard, // Add pressed effect
          ]}
          onPress={() => console.log('Start exercise:', exercise.title)}
        >
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseTitle}>{exercise.title}</Text>
            <Text style={styles.exerciseDuration}>{exercise.duration} minutes</Text>
          </View>
          <View style={styles.playButton}>
            <Text style={styles.playButtonText}>▶</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#FFFDEC', // Light cream background
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE2E2', // Light pink background
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFCFCF', // Darker pink border
  },
  pressedCard: {
    opacity: 0.8, // Slight opacity change when pressed
    transform: [{ scale: 0.98 }], // Slight scale down when pressed
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 15,
  },
  exerciseTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#86A788', // Soft green text
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.3,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#86A788', // Soft green background
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#86A788', // Matching shadow color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonText: {
    fontSize: 20,
    color: '#FFFFFF', // White text for contrast
    marginLeft: 3,
  },
});
