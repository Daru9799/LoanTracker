import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

type ThemedTextProps = TextProps

const ThemedText = ({ style, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const textColor = theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;