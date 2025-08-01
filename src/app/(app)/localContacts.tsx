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
import { useTranslation } from 'react-i18next'
import CustomSnackbar from '@/src/components/CustomSnackBar'

const LocalContacts = () => {
  //Modals states
  const [newContactModalVisible, setNewContactModalVisible] = useState(false);
  const [deleteModalvisible, setDeleteModalVisible] = useState(false);
  const [visibleImportModal, setVisibleImportModal] = useState(false);

  //Contact states
  const [name, setName] = useState('')
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [error, setError] = useState('');

  //FAB states
  const [openFAB, setOpenFAB] = useState(false);

  //SnackBar State
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  //API data
  const { data: contacts, isLoading, error: contactListError } = useContactList();
  const { mutate: createContact } = useCreateContact()
  const { mutate: deleteContact } = useDeleteContact()
  const { mutate: importContacts} = useImportMultipleContacts()

  //Translations
  const { t } = useTranslation(['contacts', 'common']);

  const onAddContact = async () => {
    if (name.length < 3) {
      setError(t('tooShortNameError'))
      setSnackBarVisible(true)
      return
    } 
    createContact(name)
    setNewContactModalVisible(false)
  }

  const onDeleteContact = (contactId: string) => {
    setContactToDelete(contactId)
    setDeleteModalVisible(true)
  }

  const onImportContacts = (selectedContacts: string[]) => {
    importContacts(selectedContacts)
  }

  if (isLoading) {
    return <CustomActivityIndicator />;
  }
  if (contactListError) {
    return <ThemedText>{t('common:failedFetchingData')}</ThemedText>;
  }
  
  return (
    <View style={styles.container}>

      <FlatList 
        data={contacts}
        renderItem={({item}) => <ContactCard contact={item} onDeleteIconPress={() => onDeleteContact(item.id)} />}
        contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 130}}
      />

      <FAB.Group
        open={openFAB}
        visible
        icon={openFAB ? 'close' : 'plus'}
        onStateChange={({ open }) => setOpenFAB(open)}
        actions={[
          {
            icon: 'phone-plus',
            label: t('importContacts'),
            onPress: () => setVisibleImportModal(true),
          },
          {
            icon: 'account-plus',
            label: t('addContact'),
            onPress: () => setNewContactModalVisible(true),
          },
        ]}
      />

      <ImportContactModal 
        visible={visibleImportModal} 
        hideModal={() => setVisibleImportModal(false)} 
        onImportContacts={(selectedContacts) => {
            onImportContacts(selectedContacts)
          }
        }
      />

      <NewContactModal 
        visible={newContactModalVisible} 
        hideModal={() => setNewContactModalVisible(false)} 
        value={name}
        onChangeText={setName}
        onAddContact={onAddContact}
        title={t('nameNewContact')}
        buttonText={t('addNewContact')}
        buttonCancelText={t('common:cancel')}
        placeholderName={t('placeholderNameText')}
      />

      <CustomDecisionModal 
        visible={deleteModalvisible} 
        modalText={t('deleteConfirmationInfoText')} 
        actionButtonText={t('delete')}
        cancelButtonText={t('common:cancel')}
        onDismiss={() => setDeleteModalVisible(false)} 
        onActionButtonPress={() => {
          if(contactToDelete !== null) {
            deleteContact(contactToDelete)
            setDeleteModalVisible(false)
          }
        }} 
      />      

      <CustomSnackbar visible={snackBarVisible} message={error} onDismiss={() => setSnackBarVisible(false)} />
    </View>
  )
}

export default LocalContacts

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})