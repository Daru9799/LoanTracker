import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '@/src/components/CustomInputField'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { List, Checkbox, Chip, Button, Portal, Dialog, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { Colors } from '@/src/constants/Colors';
import { useCategoriesList } from '@/src/api/categories';
import { useCreateItem } from '@/src/api/items';
import { useRouter } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { randomUUID } from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import CustomActivityIndicator from '@/src/components/CustomActivityIndicator';

const Create = () => {
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [borrowedDate, setBorrowedDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(dayjs().add(1, 'day').toDate()) //Na start zawsze ustawia dzien do przodu dla return
  const [show, setShow] = useState(false);
  const [datePickerType, setDatePickerType] = useState<'borrowed' | 'return'>('borrowed')
  const [isDateReturnSelected, setIsDateReturnSelected] = useState(true);
  const [itemQuantity, setItemQuantity] = useState('1')
  const [itemCategoryId, setItemCategoryId] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const { data: categories } = useCategoriesList()
  const { mutate: createItem } = useCreateItem()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const addItemToList = async (title: string, quantity: string, borrowed_at: Date, category_id: string, description: string | null, return_at: Date | null, image_url: string | null) => {
    let fileUrl: string | null = null
    setIsLoading(true)
    try {
      if(image_url !== null) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl === undefined) { //Jeśli zwróci undefined (czyli coś pójdzie nie tak) to wywali błąd
          setVisible(true)
          return
        }
        fileUrl = uploadedUrl; 
      }

      createItem({
        itemTitle: title,
        itemQuantity: parseInt(quantity, 10),
        itemBorrowedDate: borrowed_at,
        itemCategoryId: category_id,
        itemDescription: description,
        itemReturnDate: return_at,
        itemImageUrl: fileUrl
      }, {onSuccess: onItemAddedSuccess})
    } finally {
      setIsLoading(false);
    }
  }

  const onItemAddedSuccess = () => {
    setError("Item added to database!")
    setVisible(true)
  }

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

  const uploadImage = async () => {
    if (!itemImage?.startsWith('file://')) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(itemImage, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('item-images')
      .upload(filePath, decode(base64), { contentType });

    if(error) {
      setError("Failed to upload the image. Please try again.")
      console.log("Error:" + error.message)
      return
    }

    if (data) {
      return data.path;
    }
  };

  const submitForm = () => {
    //console.log(`Submit: ${itemName}, ${itemDescription}, ${itemQuantity},  ${borrowedDate.toLocaleDateString()}, ${returnDate.toLocaleDateString()}, ${itemCategory}, ${itemImage}`)
    if(itemName.length < 3) {
      setError("Name is too short!")
      setVisible(true)
      return
    }

    if(itemCategoryId === null) {
      setError("You need to choose category!")
      setVisible(true)
      return
    }

    addItemToList(
      itemName, 
      itemQuantity, 
      borrowedDate, 
      itemCategoryId, 
      itemDescription, 
      isDateReturnSelected ? returnDate : null, 
      isImageSelected ? itemImage : null
    )
    clearForm()
  }

  const clearForm = () => {
    setItemName('')
    setItemDescription('')
    setItemQuantity('1')
    setItemCategoryId(null)
    setItemImage(null)
    setBorrowedDate(new Date())
    setReturnDate(dayjs().add(1, 'day').toDate())
  }

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    
    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
    }
  };

  if(isLoading) {
    return <CustomActivityIndicator style={styles.activityIndicator} />
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
            {categories?.map((cat) => (
              <Chip 
                  key={cat.id}
                  selected={itemCategoryId === cat.id}
                  onPress={() => setItemCategoryId(cat.id)}
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
          <ThemedView style={styles.imageButtonContainer}>
            <Button icon="image" mode="text" style={styles.imageButton} onPress={pickImage}>
              {itemImage ? 'Change Photo' : 'Choose Photo' }
            </Button>
            <Button icon="camera" mode="text" style={styles.imageButton} onPress={openCamera}> 
              Open Camera
            </Button>
          </ThemedView>

        </List.Accordion>
          
          <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitForm}>
            <Text style={{color: 'white'}}>Add New Item</Text>
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

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'Got it!',
          onPress: () => {
            onDismissSnackBar
          },
        }}>
        {error}
      </Snackbar>
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
    width: '50%',
  },
  imageButtonContainer: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  submitButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10
  },
  activityIndicator : {
    marginTop: 10
  }
})