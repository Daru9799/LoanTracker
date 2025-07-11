import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '@/src/components/CustomInputField'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { List, Checkbox, Chip, Button, Portal, Dialog } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { mockCategories } from '@/assets/data/mockCategories';
import { CheckCircle } from 'lucide-react-native';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { Colors } from '@/src/constants/Colors';

const Create = () => {
  const categories = mockCategories

  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [borrowedDate, setBorrowedDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(dayjs().add(1, 'day').toDate()) //Na start zawsze ustawia dzien do przodu dla return
  const [show, setShow] = useState(false);
  const [datePickerType, setDatePickerType] = useState<'borrowed' | 'return'>('borrowed')
  const [isDateReturnSelected, setIsDateReturnSelected] = useState(true);
  const [itemQuantity, setItemQuantity] = useState('1')
  const [itemCategory, setItemCategory] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [itemImage, setItemImage] = useState<string | null>(null)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if(!selectedDate) return;
    const currentDate = selectedDate;
    setShow(false);
    datePickerType === 'borrowed' ? setBorrowedDate(currentDate) : setReturnDate(currentDate);
  };

  const showDatepicker = (type: string) => {
    if(type === 'borrowed') {
      setDatePickerType('borrowed')
    } else {
      setDatePickerType('return')
    }
    setShow(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
      console.log(itemImage)
    }
  };

  const submitForm = () => {
    console.log(`Submit: ${itemName}, ${itemDescription}, ${itemQuantity},  ${borrowedDate.toLocaleDateString()}, ${returnDate.toLocaleDateString()}, ${itemCategory}, ${itemImage}`)
    clearForm()
  }

  const clearForm = () => {
    setItemName('')
    setItemDescription('')
    setItemQuantity('1')
    setItemCategory(null)
    setItemImage(null)
    setBorrowedDate(new Date())
    setReturnDate(dayjs().add(1, 'day').toDate())
  }


  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText style={styles.text}>Name: </ThemedText>
        <View style={styles.field}>
          <CustomInputField placeholder='Name' value={itemName} onChangeText={setItemName}/>
        </View>

        <ThemedText style={styles.text}>Note: </ThemedText>
        <View style={styles.field}>
          <CustomInputField placeholder='Note (max 150)' style={{height: 80, textAlignVertical: 'top'}} value={itemDescription} onChangeText={setItemDescription} multiline={true} numberOfLines={3} maxLength={150}/>
        </View>

        <ThemedText style={styles.text}>Quantity: </ThemedText>
        <View style={styles.field}>
          <CustomInputField placeholder='Quantity' value={itemQuantity} onChangeText={setItemQuantity} inputMode='numeric'/>
        </View>

        <ThemedText style={styles.text}>Borrowed Date: </ThemedText>
        <View style={styles.field}>
            <Pressable onPress={() => showDatepicker('borrowed')}>
              <CustomInputField placeholder='Borrowed Date' value={borrowedDate.toLocaleDateString()} readOnly={true} />
            </Pressable>
        </View>

        <List.Accordion title={
          <View>
              <Checkbox.Item 
                label="Return Date:"
                position='leading'
                color={Colors.light.buttonColor}
                status={isDateReturnSelected ? 'checked' : 'unchecked'}
                onPress={() => setIsDateReturnSelected(!isDateReturnSelected)}
                style={styles.checkbox}
              />
          </View>
          }
          expanded={isDateReturnSelected} 
          right={() => null}
          onPress={() => setIsDateReturnSelected(!isDateReturnSelected)}
          >
          <View style={styles.field}>
            <Pressable onPress={() => showDatepicker('return')}>
              <CustomInputField placeholder='Return Date' value={returnDate.toLocaleDateString()} readOnly={true} />
            </Pressable>
          </View>
        </List.Accordion>

        <List.Accordion title={'Category'}>
          <View style={styles.categoriesContainer}>
            {categories.map((cat) => (
              <Chip 
                  key={cat.id}
                  selected={itemCategory === cat.id}
                  onPress={() => setItemCategory(cat.id)}
                >
                {cat.name}
              </Chip>
            ))}
          </View>
        </List.Accordion>

        <List.Accordion title={
          <View>
              <Checkbox.Item 
                label="Image:"
                position='leading'
                color='#2196F3'
                status={isImageSelected ? 'checked' : 'unchecked'}
                onPress={() => setIsImageSelected(!isImageSelected)}
                style={styles.checkbox}
              />
          </View>
          }
          expanded={isImageSelected} 
          right={() => null}
          onPress={() => setIsImageSelected(!isImageSelected)}
        >
          {itemImage && <Image source={{ uri: itemImage }} style={styles.image} />}
          <Button icon="camera" mode="text" style={styles.imageButton} onPress={pickImage}>
            {itemImage ? 'Change Photo' : 'Choose Photo' }
          </Button>
        </List.Accordion>
          
          <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitForm}>
            <Text style={{color: 'white'}}>Add New Loan</Text>
          </Button>
      </ScrollView>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={ datePickerType === 'borrowed' ? borrowedDate : returnDate }
          onChange={onChange}
          maximumDate={datePickerType === 'borrowed' ? dayjs(returnDate).subtract(1, 'day').toDate() : undefined}
          minimumDate={datePickerType === 'return' ? dayjs(borrowedDate).add(1, 'day').toDate() : undefined}
        />
      )}
    </ThemedView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  text: {
    fontSize: 15,
    marginLeft: 13,
    marginTop: 12,
  },
  field: {
    padding: 5,
  },
  returnDateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    paddingLeft: 0, 
    marginLeft: -8 
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    padding: 10
  },
  image : {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imageButton: {
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },
  submitButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10
  }
})