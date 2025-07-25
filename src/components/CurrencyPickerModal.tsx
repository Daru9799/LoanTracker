import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper';
import ThemedText from './ThemedText';
import { useCurrenciesList } from '../api/currencies';
import CurrencyCard from './CurrencyCard';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (code: string) => void;
};

const CurrencyPickerModal = ({ visible, onDismiss, onSelect }: Props) => {
  const { data: currencies } = useCurrenciesList()
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null); //code

  const handleConfirm = () => {
    if (selectedCurrency) {
        onSelect(selectedCurrency)
        setSelectedCurrency(null)
        onDismiss()
    }
  }
  
  return (
    <View>
        <Portal>
          <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Choose Currency</Dialog.Title>
            <Dialog.Content>
                {currencies && 
                <FlatList
                    data={currencies}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <ThemedText>
                            <CurrencyCard 
                                name={item.name} 
                                symbol={item.symbol} 
                                onPress={() => setSelectedCurrency(item.code)} 
                                isSelected={item.code === selectedCurrency}
                            />
                        </ThemedText>
                    )}
                    style={styles.currencyList}
                />
                }
            </Dialog.Content>
            <Dialog.Actions>
              <Button disabled={!selectedCurrency} onPress={handleConfirm}>Accept</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  )
}

export default CurrencyPickerModal

const styles = StyleSheet.create({
    currencyList: {
        maxHeight: 300
    }
})