
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const professionals = [

  { name: 'Dr. Sarah Johnson', specialization: 'Anxiety & Stress' },

  { name: 'Michael Chen, LCSW', specialization: 'College Counseling' },

  { name: 'Dr. Maria Gonzalez', specialization: 'Trauma & PTSD' },

  { name: 'James Wilson, PhD', specialization: 'Cognitive Behavioral Therapy' },

];

export default function CounselorScreen() {

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Available Professionals</Text>

      <Text style={styles.subtitle}>Tap to initiate contact</Text>

      {professionals.map((pro, index) => (

        <Pressable

          key={index}

          style={styles.card}

          onPress={() => console.log('Contact:', pro.name)}

        >

          <View style={styles.infoContainer}>

            <Text style={styles.name}>{pro.name}</Text>

            <Text style={styles.specialization}>{pro.specialization}</Text>

          </View>

          <View style={styles.contactOptions}>

            <Pressable 

              style={styles.contactButton}

              onPress={(e) => {

                e.stopPropagation();

                console.log('Call:', pro.name);

              }}

            >

              <Text style={styles.buttonText}>📞 Call</Text>

            </Pressable>

            <Pressable

              style={styles.contactButton}

              onPress={(e) => {

                e.stopPropagation();

                console.log('Message:', pro.name);

              }}

            >

              <Text style={styles.buttonText}>✉️ Message</Text>

            </Pressable>

          </View>

        </Pressable>

      ))}

      <Text style={styles.disclaimer}>

        Note: This is a demonstration. Actual contact features are not implemented.

      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

    padding: 20,

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 5,

  },

  subtitle: {

    fontSize: 16,

    color: '#666',

    marginBottom: 20,

  },

  card: {

    backgroundColor: '#fff',

    borderRadius: 10,

    padding: 15,

    marginBottom: 15,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 1 },

    shadowOpacity: 0.2,

    shadowRadius: 2,

    elevation: 2,

  },

  infoContainer: {

    marginBottom: 10,

  },

  name: {

    fontSize: 18,

    fontWeight: '600',

    marginBottom: 5,

  },

  specialization: {

    fontSize: 14,

    color: '#666',

  },

  contactOptions: {

    flexDirection: 'row',

    gap: 10,

    marginTop: 10,

  },

  contactButton: {

    flex: 1,

    backgroundColor: '#007AFF',

    padding: 10,

    borderRadius: 8,

    alignItems: 'center',

  },

  buttonText: {

    color: 'white',

    fontWeight: '500',

  },

  disclaimer: {

    marginTop: 20,

    color: '#999',

    fontSize: 12,

    textAlign: 'center',

  },

});
