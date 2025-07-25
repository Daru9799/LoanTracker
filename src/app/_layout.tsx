import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Pressable, TouchableOpacity, useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer'
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import QueryProvider from '../providers/QueryProvider';
import AuthProvider from '../providers/AuthProvider';
import { User, PiggyBank, Archive, Clock9, Users, Ghost, HandCoins, Landmark, ChartSpline } from 'lucide-react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
  <SafeAreaProvider>
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <QueryProvider>
            <Drawer >
              <Drawer.Screen name="(tabs)" options={{ 
                title: 'Loan Tracker', 
                drawerIcon: ({ color, size }) => (
                <PiggyBank size={size} color={color} />
              ) }}/>
              <Drawer.Screen name="timeline" options={{ 
                title: 'Timeline',       
                drawerIcon: ({ color, size }) => (
                <Clock9 size={size} color={color} />
              ) }} />
              <Drawer.Screen name="archived" options={{ 
                title: 'Archived Items',
                drawerIcon: ({ color, size }) => (
                <Archive size={size} color={color} />
              ) }} />
              <Drawer.Screen name="localContacts" options={{ 
                title: 'Local Contacts',
                drawerIcon: ({ color, size }) => (
                <Ghost size={size} color={color} />
              ) }} />
              <Drawer.Screen name="(friends)" options={{ 
                title: 'Friends', 
                drawerIcon: ({ color, size }) => (
                <Users size={size} color={color} />
              ) }} />
              <Drawer.Screen name="profile" options={{ 
                title: 'Profile', 
                drawerIcon: ({ color, size }) => (
                <User size={size} color={color} />
              ) }} />
              <Drawer.Screen name="myLoans" options={{ 
                title: 'My Loans', 
                drawerIcon: ({ color, size }) => (
                <Landmark size={size} color={color} />
              ) }} />
              <Drawer.Screen name="stats" options={{ 
                title: 'Statistics', 
                drawerIcon: ({ color, size }) => (
                <ChartSpline size={size} color={color} />
              ) }} />

              <Drawer.Screen name="(auth)" options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
            </Drawer>
          </QueryProvider>
         </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  </SafeAreaProvider>
  );
}