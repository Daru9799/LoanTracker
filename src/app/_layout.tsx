import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer'
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
  <SafeAreaProvider>
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer>
          <Drawer.Screen name="(tabs)" options={{ title: 'Loan Tracker' }} />
          <Drawer.Screen name="timeline" options={{ title: 'Timeline' }} />
          <Drawer.Screen name="archived" options={{ title: 'Archived Items' }} />
        </Drawer>
      </ThemeProvider>
    </PaperProvider>
  </SafeAreaProvider>
  );
}