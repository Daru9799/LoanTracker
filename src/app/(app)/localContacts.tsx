import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ThemedText from '@/src/components/ThemedText'
import { useContactList, useCreateContact, useDeleteContact, useImportMultipleContacts } from '@/src/api/contacts'
import CustomActivityIndicator from '@/src/components/CustomActivityIndicator'
import { FlatList } from 'react-native-gesture-handler'
import ContactCard from '@/src/components/ContactCard'
import CustomDecisionModal from '@/src/components/CustomDecisionModal'
import NewContactModal from '@/src/components/NewContactModal'
import { FAB } from 'react-native-paper'
import ImportContactModal from '@/src/components/ImportContactModal'
import { BlurView } from 'expo-blur';

const LocalContacts = () => {
  const { data: contacts, isLoading, error } = useContactList();
  const [open, setOpen] = useState(false);

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

  const [visibleImportModal, setVisibleImportModal] = useState(false);
  const showImportModal = () => setVisibleImportModal(true);
  const hideImportModal = () => setVisibleImportModal(false);

  const { mutate: importContacts} = useImportMultipleContacts()

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

  const onImportContacts = (selectedContacts: string[]) => {
    importContacts(selectedContacts)
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
        contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 130}}
      />

      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        onStateChange={({ open }) => setOpen(open)}
        actions={[
          {
            icon: 'phone-plus',
            label: 'Import Contacts',
            onPress: showImportModal,
          },
          {
            icon: 'account-plus',
            label: 'Add Contact',
            onPress: showModal,
          },
        ]}
      />

      <ImportContactModal 
        visible={visibleImportModal} 
        hideModal={hideImportModal} 
        onImportContacts={(selectedContacts) => {
            onImportContacts(selectedContacts)
          }
        }
      />

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
    flex: 1
  }
})