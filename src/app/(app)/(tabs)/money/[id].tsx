import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ThemedText from '@/src/components/ThemedText'

const MoneyLoanDetails = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <ThemedText>MoneyLoanDetails: {id}</ThemedText>
    </View>
  )
}

export default MoneyLoanDetails

const styles = StyleSheet.create({})