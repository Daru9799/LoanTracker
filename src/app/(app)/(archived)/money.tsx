import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '@/src/components/ThemedView'
import ThemedText from '@/src/components/ThemedText'
import { useMoneyLoansList } from '@/src/api/moneyLoans'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoneyLoanCard from '@/src/components/MoneyLoanCard'

const ArchivedLoans = () => {
  const { data: loans, isLoading, error } = useMoneyLoansList({isArchived: true});

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
            data={loans}
            renderItem={({item}) => <MoneyLoanCard moneyLoan={item} archived={true}></MoneyLoanCard>}
            contentContainerStyle={{gap: 10, padding: 10}}
        />
    </ThemedView>
    </SafeAreaView>
  )
}

export default ArchivedLoans

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})