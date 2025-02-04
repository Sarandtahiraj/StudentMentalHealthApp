// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // This matches the index.tsx file
        options={{
          href: null, // Hide this screen from the tab bar
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color }) => (
            <Ionicons name="happy-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditation',
          tabBarIcon: ({ color }) => (
            <Ionicons name="headset-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="peer-support"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counselor"
        options={{
          title: 'Counselor',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}