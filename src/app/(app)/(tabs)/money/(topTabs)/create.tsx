import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import CurrencyPickerModal from '@/src/components/CurrencyPickerModal'

const Create = () => {
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false)
  
  return (
    <View>
      <Button onPress={() => setCurrencyModalVisible(true)}>Choose currency</Button>

      <CurrencyPickerModal
        visible={currencyModalVisible} 
        onDismiss={() => setCurrencyModalVisible(false)} 
        onSelect={(code) =>  console.log('selected code: ' + code)}
      />
    </View>
  )
}

export default Create

const styles = StyleSheet.create({})