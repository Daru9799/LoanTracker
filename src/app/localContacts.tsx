import { StyleSheet, useColorScheme, View, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedText from '../components/ThemedText'
import { useContactList, useCreateContact, useDeleteContact } from '../api/contacts'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { FlatList } from 'react-native-gesture-handler'
import { useAuth } from '../providers/AuthProvider'
import { Redirect } from 'expo-router'
import ContactCard from '../components/ContactCard'
import { Button, FAB, Modal, Portal } from 'react-native-paper'
import CustomInputField from '../components/CustomInputField'
import { Colors } from '../constants/Colors'
import CustomDecisionModal from '../components/CustomDecisionModal'

const LocalContacts = () => {
  const { session } = useAuth()
  if(!session) {
    return <Redirect href={'/(auth)/login'} />
  }

  const { data: contacts, isLoading, error } = useContactList();

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('')
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { mutate: createContact } = useCreateContact()

  const [deleteModalvisible, setDeleteModalVisible] = useState(false);
  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);
  const { mutate: deleteContact } = useDeleteContact()
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const cardBackground = colorScheme === 'dark' ? '#2a3238ff' : '#F7F7F7';

  const onAddContact = async () => {
    if (name.length < 3) {
      console.log('Name is too short!')
      return
    } 
    createContact(name)
    console.log(`Contact ${name} was added to database!`)
    hideModal()
  }

  const onDeleteContact = (contactId: string) => {
    setContactToDelete(contactId)
    console.log("Do usuniecia zostal wybrany: " + contactToDelete)
    showDeleteModal()
  }

  if (isLoading) {
    return <CustomActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data!</ThemedText>;
  }
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        renderItem={({item}) => <ContactCard contact={item} onDeleteIconPress={() => onDeleteContact(item.id)} />}
        contentContainerStyle={{gap: 10, padding: 10}}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showModal}
      />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.modalStyle, {backgroundColor: cardBackground}]}>
          <ThemedText style={styles.text}>Name the new contact.</ThemedText>
          <CustomInputField placeholder='Name' value={name} onChangeText={setName}/>
          <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={onAddContact}>
            <Text style={{color: 'white'}}>Add New Contact</Text>
          </Button>
        </Modal>
      </Portal>

      <CustomDecisionModal 
        visible={deleteModalvisible} 
        modalText={'Are you sure you want to delete this contact?'} 
        actionButtonText={'Delete'} 
        onDismiss={hideDeleteModal} 
        onActionButtonPress={() => {
          if(contactToDelete !== null) {
            deleteContact(contactToDelete)
            hideDeleteModal()
          }
        }} 
      />
      
    </View>
  )
}

export default LocalContacts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalStyle : {
    padding: 20,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20
  },
  submitButton: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20
  },
  text: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
})