import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { mockItems } from '@/assets/data/mockItems'

const ItemDetails = () => {

  const { id } = useLocalSearchParams()
  const item = mockItems.find((item) => item.id == id)

  return (
    <View>
      <Text>Id:{ item?.id }</Text>
      <Text>Name: { item?.title }</Text>
      <Text>Note: { item?.description }</Text>
      <Text>Quantity: { item?.quantity }</Text>
    </View>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
    
})