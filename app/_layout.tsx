import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, useWindowDimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Layout() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [isSleepOptionsVisible] = useState(false);

  // Konfigurim responsiv
  const isMobile = width < 768;
  const headerHeight = isMobile ? 90 : 120;
  const iconSize = isMobile ? 26 : 30;

  // Header personalizuar
  const CustomHeader = () => (
    <View style={[styles.header, { height: headerHeight }]}>
      <View style={styles.headerContent}>
        <Ionicons 
          name="brain" 
          size={iconSize} 
          color="#FFF" 
          style={styles.brainIcon} 
        />
        <Text style={[styles.title, isMobile ? styles.mobileTitle : styles.desktopTitle]}>
          Mental Health App
          {!isMobile && (
            <Text style={styles.subtitle}>  - Your Wellness Partner</Text>
          )}
        </Text>
      </View>
    </View>
  );

  // Stilet dinamike për tab bar
  const dynamicTabBarStyles = {
    height: isMobile ? 60 : 75,
    paddingBottom: isMobile ? 8 : 12,
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;
          const icons = {
            mood: focused ? 'happy' : 'happy-outline',
            breathe: focused ? 'heart' : 'heart-outline',
            meditation: 'headset-outline',
            'peer-support': 'people-outline',
            SleepTracker: 'moon-outline',
            counselor: 'person-outline',
          };

          return (
            <Ionicons
              name={icons[route.name as keyof typeof icons] || 'help-outline'}
              size={isMobile ? 24 : 28}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: [styles.tabBar, dynamicTabBarStyles],
        tabBarLabelStyle: [styles.tabLabel, { fontSize: isMobile ? 10 : 12 }],
        ...(Platform.OS === 'web' && {
          tabBarItemStyle: { maxWidth: 600, marginHorizontal: 'auto' }
        }),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />

      {/* Pjesa e skreneve */}
      <Tabs.Screen name="mood" options={{ title: 'Mood' }} />
      <Tabs.Screen name="breathe" options={{ title: 'Breath' }} />
      <Tabs.Screen name="meditation" options={{ title: 'Meditation' }} />
      <Tabs.Screen name="peer-support" options={{ title: 'Support' }} />
      <Tabs.Screen name="SleepTracker" options={{ title: 'Sleep' }} />
      <Tabs.Screen name="counselor" options={{ title: 'Counselor' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6366f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      marginHorizontal: 'auto',
      width: '100%',
    }),
  },
  brainIcon: {
    marginRight: 12,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    color: '#FFF',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  mobileTitle: {
    fontSize: 20,
  },
  desktopTitle: {
    fontSize: 26,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontWeight: '300',
    fontSize: 18,
    letterSpacing: 0.6,
  },
  tabBar: {
    backgroundColor: '#FFF',
    borderTopWidth: 0,
    elevation: 10,
    ...(Platform.OS === 'web' && {
      maxWidth: 800,
      marginHorizontal: 'auto',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }),
  },
  tabLabel: {
    marginBottom: 4,
    fontWeight: '500',
  },
});