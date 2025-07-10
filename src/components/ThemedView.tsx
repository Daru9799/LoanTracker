import React from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const ThemedView = ({ style, ...props }: ViewProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
};

export default ThemedView;