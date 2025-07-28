import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export default function useThemeColors() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  
  const cardBackground = theme === 'dark' ? '#1E1E1E' : '#F7F7F7';
  const themeColors = Colors[theme];
  const normalTextColor = themeColors.text;
  const cardBackgroundDark = colorScheme === 'dark' ? '#2a3238ff' : '#F7F7F7';

  return {
    theme,
    cardBackground,
    themeColors,
    normalTextColor,
    cardBackgroundDark
  };
}