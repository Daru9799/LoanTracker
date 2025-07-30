import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Divider, List } from 'react-native-paper'
import ThemedText from './ThemedText'
import { Banknote } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import { ExchangeRate } from '../types/exchange_rate'

type ExchangeRateModuleProps = {
    accordionTitle: string;
    exchangeRates: ExchangeRate;
    amount: number;
    interestRate?: number;
}

const ExchangeRateModule = ({accordionTitle, exchangeRates, amount, interestRate=0} : ExchangeRateModuleProps) => {
  return (
    <List.Accordion title={accordionTitle}>
        <View>
        <View style={styles.headerRow}>
            <ThemedText style={styles.baseText}>Base: {exchangeRates?.base}</ThemedText>
            <ThemedText style={styles.dateText}>Date: {exchangeRates?.date}</ThemedText>
        </View>
        <Divider style={styles.divider} />

        <ScrollView contentContainerStyle={[styles.exchangeRow]}>
            {exchangeRates && Object.entries(exchangeRates.rates).map(([currency, rate], index, array) => (
            <Card key={currency} style={[styles.currencyCard, index === array.length - 1 && array.length % 2 !== 0 && styles.lastCard]}>
                <Card.Content>
                <View style={styles.banknoteContainer}>
                    <Banknote color={Colors.light.greenColor}/>
                    <ThemedText style={styles.currencyText}>{currency}</ThemedText>
                </View>
                <ThemedText style={styles.currencyValue}>
                    {(rate * (amount*interestRate + amount)).toFixed(2)}
                </ThemedText>
                </Card.Content>
            </Card>
            ))}
        </ScrollView>
        </View>
    </List.Accordion> 
  )
}

export default ExchangeRateModule

const styles = StyleSheet.create({
    baseText: {
      fontWeight: 'bold'
    },
    dateText: {
      color: 'gray'
    },
    divider : {
      marginHorizontal: 8,
      marginBottom: 10
    },
    exchangeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginBottom: 8
    },
    currencyCard: {
      width: '48%',
      marginBottom: 6,
    },
    currencyText: {
      fontWeight: '300'
    },
    currencyValue: {
      color: '#555'
    },
    lastCard: {
      marginRight: 'auto',
    },
    banknoteContainer: {
      flexDirection: 'row', 
      gap: 5,
      alignItems: 'center'
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      marginBottom: 10,
      marginHorizontal: 10
    }
})