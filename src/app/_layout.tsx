import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AuthProvider from '../providers/AuthProvider';
import QueryProvider from '../providers/QueryProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <QueryProvider>
                <Slot />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}