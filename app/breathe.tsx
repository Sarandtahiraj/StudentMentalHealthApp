import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Pressable } from 'react-native';

interface BreathingMeditationProps {
    initialTimer?: number;
}

const colors = ['#FFB6C1', '#E6A8D7', '#D8A0C1', '#F4C2C2']; // Soft Pink and Purple Palette

const BreathingMeditation: React.FC<BreathingMeditationProps> = ({ initialTimer = 15 * 60 }) => {
    const [breatheText, setBreatheText] = useState("Merr Frymë");
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(initialTimer);

    const circleScale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0.4)).current;
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const textIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const breatheDuration = 3000;
    const textDisplayDuration = 3000; // Duration to display each text

    // Color change logic
    const colorIndex = useRef(0);
    const [currentColor, setCurrentColor] = useState(colors[colorIndex.current]);

    // useEffect for color changes
    useEffect(() => {
        const changeColor = () => {
            colorIndex.current = (colorIndex.current + 1) % colors.length;
            setCurrentColor(colors[colorIndex.current]);
        };

        const colorIntervalId = setInterval(changeColor, 5000);

        return () => clearInterval(colorIntervalId);
    }, []);

    // Timer effect
    useEffect(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        if (isRunning && timer > 0) {
            intervalIdRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsRunning(false);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isRunning, timer]);

    // Breathing animation effect
    useEffect(() => {
        const breatheAnimation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(circleScale, {
                        toValue: 1.6,
                        duration: breatheDuration,
                        easing: Easing.ease,
                        useNativeDriver: false,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.8,
                        duration: breatheDuration,
                        easing: Easing.ease,
                        useNativeDriver: false,
                    }),

                ]),
                Animated.parallel([
                    Animated.timing(circleScale, {
                        toValue: 1,
                        duration: breatheDuration,
                        easing: Easing.ease,
                        useNativeDriver: false,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.4,
                        duration: breatheDuration,
                        easing: Easing.sin,
                        useNativeDriver: false,
                    }),

                ]),
            ])
        );

        if (isRunning) {
            breatheAnimation.start();
        } else {
            breatheAnimation.stop();
        }

        return () => {
            breatheAnimation.stop();
        };
    }, [isRunning, circleScale, opacity, breatheDuration]);

    // Text toggle effect
    useEffect(() => {
        // Clear the previous interval if it exists
        if (textIntervalRef.current) {
            clearInterval(textIntervalRef.current);
        }

        if (isRunning) {
            textIntervalRef.current = setInterval(() => {
                setBreatheText((prevText) => (prevText === "Merr Frymë" ? "Liro Frymë" : "Merr Frymë"));
            }, textDisplayDuration);
        }

        return () => {
            if (textIntervalRef.current) {
                clearInterval(textIntervalRef.current);
            }
        };
    }, [isRunning, textDisplayDuration]);


    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const toggleMeditation = () => {
        setIsRunning((prev) => !prev);
    };

    return (
        <View style={[styles.container, { backgroundColor: currentColor }]}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ scale: circleScale }],
                        opacity: opacity,
                    },
                ]}
            >
                <Text style={styles.text}>
                    {breatheText}
                </Text>
            </Animated.View>

            <Text style={styles.timerText}>{formatTime(timer)}</Text>

            <Pressable
                style={styles.startButton}
                onPress={toggleMeditation}
            >
                <Text style={styles.startButtonText}>
                    {isRunning ? 'Pauzë' : 'Fillo'}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
    },
    timerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 20,
    },
    startButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    startButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default BreathingMeditation;


