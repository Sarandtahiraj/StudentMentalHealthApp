import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

type Message = {
    text: string;
    isUser: boolean;
    timestamp: string;
};

export default function PeerSupportScreen() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Scroll to the bottom of the ScrollView when new messages are added
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;

        const newMessage: Message = {
            text: message,
            isUser: true,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: 'Thanks for sharing. Remember you\'re not alone!',
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
            }]);
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <View style={styles.container}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            style={[
                                styles.messageBubble,
                                msg.isUser ? styles.userMessage : styles.peerMessage
                            ]}
                        >
                            <Text style={[
                                styles.messageText,
                                msg.isUser ? styles.userMessageText : styles.peerMessageText
                            ]}>
                                {msg.text}
                            </Text>
                            <Text style={[
                                styles.timestamp,
                                msg.isUser ? styles.userTimestamp : styles.peerTimestamp
                            ]}>
                                {msg.timestamp}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type your message..."
                        placeholderTextColor="#999"
                        multiline
                    />
                    <Pressable
                        style={styles.sendButton}
                        onPress={handleSend}
                        disabled={!message.trim()}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFDEC', // Pale Yellow
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        shadowColor: '#86A789', // Light Green for Shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    userMessage: {
        backgroundColor: '#FFE2E2', // Light Pink
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    peerMessage: {
        backgroundColor: '#FFCFCF', // Pink
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    messageText: {
        fontSize: 16,
    },
    userMessageText: {
        color: '#2A2A2A', // Dark Gray
    },
    peerMessageText: {
        color: '#2A2A2A', // White for better contrast
    },
    timestamp: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
    },
    userTimestamp: {
        color: '#5E5E5E', // Medium Gray
    },
    peerTimestamp: {
        color: '#5E5E5E', // Light Gray for peer
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#86A789', // Light Green
        backgroundColor: '#FFFDEC', // Pale Yellow
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF', // White
        borderColor: '#86A789', // Light Green
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
        color: '#2A2A2A',
    },
    sendButton: {
        backgroundColor: '#86A789', // Light Green
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#86A789', // Light Green
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    sendButtonText: {
        color: '#FFFDEC', // White
        fontWeight: '600',
    },
});
