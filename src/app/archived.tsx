import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ItemCard from '../components/ItemCard'
import ThemedView from '../components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../providers/AuthProvider'
import { Redirect } from 'expo-router'
import { useItemList } from '../api/items'
import ThemedText from '../components/ThemedText'

const ArchivedItems = () => {
  const { session } = useAuth()

  if(!session) {
    return <Redirect href={'/(auth)/login'} />
  }
  
  const { data: items, isLoading, error } = useItemList({isArchived: true});

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data!</ThemedText>;
  }
  //const items = mockItems.filter((item) => item.is_returned === true)
  
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