import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'

type CustomAddIconProps = {
  onPress: () => void;
  bottom?: number;
  icon?: string;
  label?: string;
};

const CustomAddIcon = ({ onPress, bottom = 0, icon = "account-plus" } : CustomAddIconProps) => {
  return (
      <FAB
        icon={icon}
        style={[styles.fab, {bottom}]}
        onPress={onPress}
      />
  )
}

export default CustomAddIcon

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
  },
})