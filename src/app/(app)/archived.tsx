import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ItemCard from '@/src/components/ItemCard'
import ThemedView from '@/src/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useItemList } from '@/src/api/items'
import ThemedText from '@/src/components/ThemedText'

const ArchivedItems = () => {  
  const { data: items, isLoading, error } = useItemList({isArchived: true});

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data!</ThemedText>;
  }
  
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