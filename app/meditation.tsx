
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

          style={styles.exerciseCard}

          onPress={() => console.log('Start exercise:', exercise.title)}

        >

          <View style={styles.exerciseInfo}>

            <Text style={styles.exerciseTitle}>{exercise.title}</Text>

            <Text style={styles.exerciseDuration}>{exercise.duration} minutes</Text>

          </View>

          <Text style={styles.playButton}>▶</Text>

        </Pressable>

      ))}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,

  },

  exerciseCard: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    backgroundColor: '#fff',

    padding: 15,

    borderRadius: 10,

    marginBottom: 10,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 1 },

    shadowOpacity: 0.2,

    shadowRadius: 2,

    elevation: 2,

  },

  exerciseInfo: {

    flex: 1,

  },

  exerciseTitle: {

    fontSize: 16,

    fontWeight: '600',

    marginBottom: 5,

  },

  exerciseDuration: {

    fontSize: 14,

    color: '#666',

  },

  playButton: {

    fontSize: 24,

    color: '#007AFF',

    marginLeft: 10,

  },

});


