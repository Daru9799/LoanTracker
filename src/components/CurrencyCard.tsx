import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from './ThemedView'
import ThemedText from './ThemedText'
import { Banknote } from 'lucide-react-native'
import { Colors } from '../constants/Colors'

type CurrencyCardProps = {
    name: string;
    symbol: string;
    onPress: () => void
    isSelected?: boolean;
}

const CurrencyCard = ({name, symbol, onPress, isSelected} : CurrencyCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <ThemedView style={[styles.itemCard, isSelected && styles.selectedCard ]}>
        <View style={styles.label}>
            <Banknote color={'#00A693'} size={22} strokeWidth={2} />
            <ThemedText>{name} ({symbol})</ThemedText>
        </View>
      </ThemedView>
    </Pressable>

  )
}

export default CurrencyCard

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    itemCard: {
        padding: 10,
        borderRadius: 10,
        width: 285,
        marginBottom: 10
    },
    label: {
        flexDirection: 'row',
        gap: 10,
    },
    selectedCard : {
        borderColor: Colors.light.buttonColor,
        borderWidth: 2,
    }
})