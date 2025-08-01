import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '@/src/components/CustomInputField'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { List, Checkbox, Chip, Button, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { Colors } from '@/src/constants/Colors';
import { useCategoriesList } from '@/src/api/categories';
import { useCreateItem } from '@/src/api/items';
import { supabase } from '@/src/lib/supabase';
import { randomUUID } from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import CustomActivityIndicator from '@/src/components/CustomActivityIndicator';
import UserPickerModal from '@/src/components/UserPickerModal';
import ContactCard from '@/src/components/ContactCard';
import { useContactDetails } from '@/src/api/contacts';
import UserCard from '@/src/components/UserCard';
import { useFriendDetails } from '@/src/api/profiles';
import { useTranslation } from 'react-i18next';
import CustomSnackbar from '@/src/components/CustomSnackBar';

const Create = () => {
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [borrowedDate, setBorrowedDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(dayjs().add(1, 'day').toDate()) //Na start zawsze ustawia dzien do przodu dla return
  const [datePickerType, setDatePickerType] = useState<'borrowed' | 'return'>('borrowed')
  const [isDateReturnSelected, setIsDateReturnSelected] = useState(true);
  const [itemQuantity, setItemQuantity] = useState('1')
  const [itemCategoryId, setItemCategoryId] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  //UserPickerModal
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [selectedBorrowerUserId, setSelectedBorrowerUserId] = useState<string | null>(null);
  const [selectedBorrowerContactId, setSelectedBorrowerContactId] = useState<string | null>(null);

  //API data
  const { data: categories } = useCategoriesList()
  const { data: contact } = useContactDetails(selectedBorrowerContactId)
  const { data: friend } = useFriendDetails(selectedBorrowerUserId)
  const { mutate: createItem } = useCreateItem()

  //DatePicker State
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  //SnackBar State
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  //Translations
  const { t } = useTranslation('items');

  const addItemToList = async () => {
    if (itemCategoryId === null) return
    let fileUrl: string | null = null

    setIsLoading(true)
    try {
      if(itemImage !== null) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl === undefined) { //If it returns undefined, it will throw an error
          setSnackBarVisible(true)
          return
        }
        fileUrl = uploadedUrl; 
      }

      createItem({
        itemTitle: itemName,
        itemQuantity: parseInt(itemQuantity, 10),
        itemBorrowedDate: borrowedDate,
        itemCategoryId: itemCategoryId,
        itemDescription: itemDescription,
        itemReturnDate: isDateReturnSelected ? returnDate : null,
        itemImageUrl: isImageSelected ? fileUrl : null,
        borrowerContactId: selectedBorrowerContactId,
        borrowerUserId: selectedBorrowerUserId
      }, {
        onSuccess: onItemAddedSuccess
      })
    } finally {
      setIsLoading(false);
    }
  }

  const onItemAddedSuccess = () => {
    setError(t('form.addedToDatabase'))
    setSnackBarVisible(true)
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if(!selectedDate) return;
    const currentDate = selectedDate;
    setDatePickerVisible(false);
    datePickerType === 'borrowed' ? setBorrowedDate(currentDate) : setReturnDate(currentDate);
  };

  const showDatepicker = (type: string) => {
    if(type === 'borrowed') {
      setDatePickerType('borrowed')
    } else {
      setDatePickerType('return')
    }
    setDatePickerVisible(true);
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
      setError(t('form.imageError'))
      return
    }

    if (data) {
      return data.path;
    }
  };

  const submitForm = () => {
    if(itemName.length < 3) {
      setError(t('form.nameTooShortError'))
      setSnackBarVisible(true)
      return
    }

    if(itemCategoryId === null) {
      setError(t('form.categoryError'))
      setSnackBarVisible(true)
      return
    }

    if(selectedBorrowerUserId === null && selectedBorrowerContactId === null) {
      setError(t('form.borrowerError'))
      setSnackBarVisible(true)
      return
    }

    addItemToList()
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
      alert(t('form.cameraPermission'));
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
        <ThemedText style={styles.text}>{t('form.name')}: </ThemedText>
        <View style={styles.field}>
          <CustomInputField placeholder={t('form.name')} value={itemName} onChangeText={setItemName}/>
        </View>

        <ThemedText style={styles.text}>{t('form.note')}: </ThemedText>
        <View style={styles.field}>
          <CustomInputField placeholder={t('form.notePlaceholder')} style={{height: 80, textAlignVertical: 'top'}} value={itemDescription} onChangeText={setItemDescription} multiline={true} numberOfLines={3} maxLength={150}/>
        </View>

        <ThemedText style={styles.text}>{t('form.quantity')}: </ThemedText>
        <View style={styles.field}>
          <CustomInputField placeholder={t('form.quantity')} value={itemQuantity} onChangeText={setItemQuantity} inputMode='numeric'/>
        </View>

        <ThemedText style={styles.text}>{t('form.borrowedDate')}: </ThemedText>
        <View style={styles.field}>
            <Pressable onPress={() => showDatepicker('borrowed')}>
              <CustomInputField placeholder={t('form.borrowedDate')} value={borrowedDate.toLocaleDateString()} readOnly={true} />
            </Pressable>
        </View>

        <List.Accordion title={
          <View>
              <Checkbox.Item 
                label={t('form.returnDate')}
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
              <CustomInputField placeholder={t('form.returnDate')} value={returnDate.toLocaleDateString()} readOnly={true} />
            </Pressable>
          </View>
        </List.Accordion>

        <List.Accordion title={t('form.category')}>
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
                label={t('form.image')}
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
              {itemImage ? t('form.changePhoto') : t('form.choosePhoto') }
            </Button>
            <Button icon="camera" mode="text" style={styles.imageButton} onPress={openCamera}> 
              {t('form.openCamera')}
            </Button>
          </ThemedView>
        </List.Accordion>

        <ThemedView style={styles.borrowerCard}>
            <ThemedText style={styles.sectionTitle}>{t('form.borrowerUser')}</ThemedText>
            {selectedBorrowerContactId && contact &&
              <ContactCard contact={contact} />
            }
            {selectedBorrowerUserId && friend &&
              <UserCard username={friend.username} />
            }
            {!selectedBorrowerContactId && !selectedBorrowerUserId &&
              <Button onPress={() => setPickerModalVisible(true)}>
                <Text>{t('form.chooseButtonText')}</Text>
              </Button>
              }
        </ThemedView>

        {(selectedBorrowerContactId || selectedBorrowerUserId) && 
            <Button onPress={() => setPickerModalVisible(true)}>
              <Text>{t('form.changeButtonText')}</Text>
            </Button>
        }   

        <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitForm}>
          <Text style={{color: 'white'}}>{t('form.addNewItem')}</Text>
        </Button>
      </ScrollView>

      {datePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={ datePickerType === 'borrowed' ? borrowedDate : returnDate }
          onChange={onChange}
          maximumDate={datePickerType === 'borrowed' ? dayjs(returnDate).subtract(1, 'day').toDate() : undefined}
          minimumDate={datePickerType === 'return' ? dayjs(borrowedDate).add(1, 'day').toDate() : undefined}
        />
      )}

      <UserPickerModal 
        visible={pickerModalVisible}
        onDismiss={() => setPickerModalVisible(false)} 
        onSelect={(id, type) => {
          if(type === 'contact') {
            setSelectedBorrowerUserId(null)
            setSelectedBorrowerContactId(id)
          }
          if(type === 'friend') {
            setSelectedBorrowerContactId(null)
            setSelectedBorrowerUserId(id)
          }
        }
      }/>

      <CustomSnackbar visible={snackBarVisible} message={error} onDismiss={() => setSnackBarVisible(false)} />
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
    marginVertical: 20
  },
  activityIndicator : {
    marginTop: 10
  },
  borrowerCard: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#0a7ea4',
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 8,
  }
})