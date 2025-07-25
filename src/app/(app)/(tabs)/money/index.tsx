import { useCurrenciesList } from '@/src/api/currencies';
import CurrencyPickerModal from '@/src/components/CurrencyPickerModal';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function MoneyMainScreen() {
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false)

  return (
    <ThemedView style={{flex: 1}}>
      <Button onPress={() => setCurrencyModalVisible(true)}>Choose currency</Button>

      <CurrencyPickerModal 
        visible={currencyModalVisible} 
        onDismiss={() => setCurrencyModalVisible(false)} 
        onSelect={(code) =>  console.log('selected code: ' + code)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  
});
