import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer'

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer>
        <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
        <Drawer.Screen name="timeline" options={{ title: 'Timeline' }} />
      </Drawer>
    </ThemeProvider>
  );
}