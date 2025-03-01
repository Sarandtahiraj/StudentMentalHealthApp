import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { MaterialIcons } from '@expo/vector-icons';

const SleepTracker: React.FC = () => {
  const [sleepHours, setSleepHours] = useState<number>(0);
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const addSleepHour = () => {
    if (sleepHours < 8) {
      setSleepHours(prev => prev + 0.5);
    }
  };

  const resetSleepTracker = () => {
    setSleepHours(0);
  };

  const interpolatePulse = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1]
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Koha e Gjumit</Text>
      
      <View style={styles.progressContainer}>
        <CircularProgress
          size={200}
          width={20}
          fill={(sleepHours / 8) * 100}
          tintColor="#86A789"
          backgroundColor="#FFE2E2"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.centerContent}>
              <Animated.Text style={[styles.progressText, {
                transform: [{ scale: sleepHours >= 8 ? interpolatePulse : 1 }]
              }]}>
                {sleepHours}h
              </Animated.Text>
              <MaterialIcons 
                name={sleepHours >= 8 ? "mood" : "bedtime"} 
                size={40} 
                color={sleepHours >= 8 ? "#FFCFCF" : "#86A789"} 
                style={styles.icon}
              />
            </View>
          )}
        </CircularProgress>

        <View style={styles.hourMarkers}>
          {[...Array(8)].map((_, i) => (
            <View 
              key={i}
              style={[
                styles.marker,
                sleepHours >= i + 1 && styles.filledMarker,
                { transform: [{ rotate: `${i * 45}deg` }] }
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.addButton,
            pressed && styles.buttonPressed
          ]}
          onPress={addSleepHour}
        >
          <MaterialIcons name="add" size={24} color="#FFFDEC" />
          <Text style={styles.buttonText}>30 Minuta</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.resetButton,
            pressed && styles.buttonPressed
          ]}
          onPress={resetSleepTracker}
        >
          <MaterialIcons name="replay" size={24} color="#FFFDEC" />
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.tip}>
        {sleepHours >= 8 
          ? '🎉 Urime! Ke arritur objektivin.' 
          : '💤 Përpiqu të flesh 8 orë çdo natë.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFDEC',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#86A789',
    letterSpacing: 0.5,
  },
  progressContainer: {
    position: 'relative',
    marginVertical: 20,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2A2A2A',
    marginBottom: 10,
  },
  icon: {
    marginTop: 5,
  },
  hourMarkers: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    position: 'absolute',
    width: 4,
    height: 15,
    backgroundColor: '#FFCFCF',
    borderRadius: 2,
    top: -7,
  },
  filledMarker: {
    backgroundColor: '#86A789',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#86A789',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#86A789',
  },
  resetButton: {
    backgroundColor: '#FFCFCF',
  },
  buttonText: {
    color: '#FFFDEC',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  tip: {
    marginTop: 25,
    fontSize: 16,
    color: '#5E5E5E',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 30,
  },
});

export default SleepTracker;
