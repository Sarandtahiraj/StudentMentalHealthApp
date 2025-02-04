
import { useState } from 'react';

import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';

type Message = {

  text: string;

  isUser: boolean;

  timestamp: string;

};

export default function PeerSupportScreen() {

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {

    if (!message.trim()) return;

    

    const newMessage: Message = {

      text: message,

      isUser: true,

      timestamp: new Date().toLocaleTimeString(),

    };

    

    setMessages(prev => [...prev, newMessage]);

    setMessage('');

    

    // Simulate response (advanced logic placeholder)

    setTimeout(() => {

      setMessages(prev => [...prev, {

        text: 'Thanks for sharing. Remember you\'re not alone!',

        isUser: false,

        timestamp: new Date().toLocaleTimeString(),

      }]);

    }, 1000);

  };

  return (

    <View style={styles.container}>

      <ScrollView 

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

            <Text style={styles.messageText}>{msg.text}</Text>

            <Text style={styles.timestamp}>{msg.timestamp}</Text>

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

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 10,

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

  },

  userMessage: {

    backgroundColor: '#DCF8C6',

    alignSelf: 'flex-end',

    marginRight: 10,

  },

  peerMessage: {

    backgroundColor: '#EAEAEA',

    alignSelf: 'flex-start',

    marginLeft: 10,

  },

  messageText: {

    fontSize: 16,

  },

  timestamp: {

    fontSize: 12,

    color: '#666',

    marginTop: 5,

    textAlign: 'right',

  },

  inputContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    padding: 10,

    borderTopWidth: 1,

    borderTopColor: '#ddd',

    backgroundColor: '#fff',

  },

  input: {

    flex: 1,

    borderColor: '#ddd',

    borderWidth: 1,

    borderRadius: 25,

    paddingHorizontal: 15,

    paddingVertical: 10,

    marginRight: 10,

    maxHeight: 100,

  },

  sendButton: {

    backgroundColor: '#007AFF',

    paddingVertical: 10,

    paddingHorizontal: 20,

    borderRadius: 20,

  },

  sendButtonText: {

    color: 'white',

    fontWeight: '600',

  },

});

