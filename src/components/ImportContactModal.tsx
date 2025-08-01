import { FlatList, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import ThemedText from './ThemedText'
import { Colors } from '@/src/constants/Colors'
import useThemeColors from '@/src/hooks/useThemeColors'
import { useContacts } from '@/src/hooks/useContacts'
import ImportedContactCard from './ImportedContactCard'
import { useTranslation } from 'react-i18next'
import CustomActivityIndicator from './CustomActivityIndicator'

type ImportContactModalProps = {
    visible: boolean;
    hideModal: () => void;
    onImportContacts: (selectedIds: string[]) => void;
}

const ImportContactModal = ({visible, hideModal, onImportContacts} : ImportContactModalProps) => {
  //UI - Theme
  const { cardBackgroundDark } = useThemeColors();

  //Import contact state
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  //API data
  const { contacts, loadingContacts, permissionGranted } = useContacts();

  //Translations
  const { t } = useTranslation('contacts');

  const resetModal = () => {
    setSelectedContacts([])
    hideModal();
  };

  const toggleSelect = (name: string) => {
    setSelectedContacts(prev =>
      prev.includes(name) ? prev.filter(contactName => contactName !== name) : [...prev, name]
    );
  };

  if (loadingContacts) {
    return <CustomActivityIndicator />;
  } 

  if (!permissionGranted) {
    return <ThemedText>{t('permissionDenied')}</ThemedText>;
  }

  return (
    <Portal>
        <Modal visible={visible} onDismiss={resetModal} contentContainerStyle={[styles.modalStyle, {backgroundColor: cardBackgroundDark}]}>
          <ThemedText style={styles.text}>{t('chooseToImport')}</ThemedText>
          <FlatList
              data={contacts}
              renderItem={({item}) => <ImportedContactCard
                  contact={item}
                  onPress={() => item.name && toggleSelect(item.name)}
                  isSelected={item.name ? selectedContacts.includes(item.name) : false}
              />}
              contentContainerStyle={{gap: 10, padding: 10}}
          />
          <Button
              buttonColor={Colors.light.buttonColor} 
              icon="" 
              mode="contained" 
              style={styles.submitButton} 
              onPress={() => {
                onImportContacts(selectedContacts)
                resetModal()
              }}
              disabled={selectedContacts.length === 0}>
              <Text style={{color: 'white'}}>{t('accept')}</Text>
            </Button>
        </Modal>
    </Portal>
  )
}

export default ImportContactModal

const styles = StyleSheet.create({
  modalStyle : {
    padding: 20,
    alignSelf: 'center',
    width: '80%',
    maxHeight: '60%',
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
  }
})