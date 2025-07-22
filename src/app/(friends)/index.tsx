import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedText from '../../components/ThemedText'
import { FAB } from 'react-native-paper'
import CustomAddIcon from '@/src/components/CustomAddIcon'

const Friends = () => {
  return (
    <View style={styles.container}>
      <ThemedText>Friends List</ThemedText>
      <CustomAddIcon onPress={() => console.log('Add new friend')}/>
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})