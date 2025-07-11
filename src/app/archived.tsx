import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mockItems } from '@/assets/data/mockItems'
import ItemCard from '../components/ItemCard'
import ThemedView from '../components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'

const ArchivedItems = () => {

  const items = mockItems.filter((item) => item.is_returned === true)
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
    <ThemedView style={styles.container}>
        <FlatList 
            data={items}
            renderItem={({item}) => <ItemCard item={item} archived={true}></ItemCard>}
            contentContainerStyle={{gap: 10, padding: 10}}
        />
    </ThemedView>
    </SafeAreaView>

  )
}

export default ArchivedItems

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})