import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, IconButton, Modal, Portal } from 'react-native-paper'
import ThemedText from './ThemedText'
import { Colors } from '../constants/Colors'
import useThemeColors from '../hooks/useThemeColors'
import { useContacts } from '../hooks/useContacts'
import ImportedContactCard from './ImportedContactCard'
import CloseIcon from './CloseIcon'

type ImportContactModalProps = {
    visible: boolean;
    hideModal: () => void;
    onImportContacts: (selectedIds: string[]) => void;
}

const ImportContactModal = ({visible, hideModal, onImportContacts} : ImportContactModalProps) => {
  const { cardBackgroundDark } = useThemeColors();
  const { contacts, loadingContacts, permissionGranted } = useContacts();

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

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
    return <Text>Loading...</Text>;
  } 

  if (!permissionGranted) {
    return <Text>No permission to access contacts</Text>;
  }

  return (
    <Portal>
        <Modal visible={visible} onDismiss={resetModal} contentContainerStyle={[styles.modalStyle, {backgroundColor: cardBackgroundDark}]}>

          <CloseIcon hideModal={hideModal} />

          <ThemedText style={styles.text}>Choose contacts to import.</ThemedText>
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
              <Text style={{color: 'white'}}>Accept</Text>
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