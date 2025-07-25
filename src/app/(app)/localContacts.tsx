import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ThemedText from '@/src/components/ThemedText'
import { useContactList, useCreateContact, useDeleteContact } from '@/src/api/contacts'
import CustomActivityIndicator from '@/src/components/CustomActivityIndicator'
import { FlatList } from 'react-native-gesture-handler'
import ContactCard from '@/src/components/ContactCard'
import CustomDecisionModal from '@/src/components/CustomDecisionModal'
import CustomAddIcon from '@/src/components/CustomAddIcon'
import NewContactModal from '@/src/components/NewContactModal'

const LocalContacts = () => {
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
        contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
      />
      <CustomAddIcon onPress={showModal}/>

      <NewContactModal 
        visible={visible} 
        hideModal={hideModal} 
        value={name}
        onChangeText={setName}
        onAddContact={onAddContact}
        title='Name the new contact.' 
        buttonText='Add New Contact'
      />

      <CustomDecisionModal 
        visible={deleteModalvisible} 
        modalText={'Are you sure you want to delete this contact? This will also delete all items linked to this contact.'} 
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
  }
})