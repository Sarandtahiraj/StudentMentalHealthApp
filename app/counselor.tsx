import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const professionals = [
  { name: 'Dr. Sarah Johnson', specialization: 'Anxiety & Stress' },
  { name: 'Michael Chen, LCSW', specialization: 'College Counseling' },
  { name: 'Dr. Maria Gonzalez', specialization: 'Trauma & PTSD' },
  { name: 'James Wilson, PhD', specialization: 'Cognitive Behavioral Therapy' },
];

const LightGreen = '#86A788';

export default function CounselorScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient colors={['#FFFDEC', '#FFE2E2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Available Professionals</Text>
          <Text style={styles.subtitle}>Tap to initiate contact</Text>
        </Animated.View>
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
                <Feather name="phone" size={16} color="#FFFDEC" style={{ marginRight: 5 }} />
                <Text style={styles.buttonText}>Call</Text>
              </Pressable>
              <Pressable
                style={styles.contactButton}
                onPress={(e) => {
                  e.stopPropagation();
                  console.log('Message:', pro.name);
                }}
              >
                <MaterialIcons name="message" size={16} color="#FFFDEC" style={{ marginRight: 5 }} />
                <Text style={styles.buttonText}>Message</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
        <Text style={styles.disclaimer}>
          Note: This is a demonstration. Actual contact features are not implemented.
        </Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#86A788',
    letterSpacing: 0.75,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5E5E5E',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFE2E2',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#86A788',
    shadowColor: '#86A788',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    width: width * 0.9,
  },
  infoContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    color: '#2A2A2A',
  },
  specialization: {
    fontSize: 14,
    color: '#5E5E5E',
    fontStyle: 'italic',
  },
  contactOptions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-around',
  },
  contactButton: {
    backgroundColor: LightGreen,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CDE990',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#FFFDEC',
    fontWeight: '600',
    fontSize: 14,
  },
  disclaimer: {
    marginTop: 20,
    color: '#5E5E5E',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

