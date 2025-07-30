import { StyleSheet, Text, TextInputProps } from 'react-native'
import React from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import ThemedText from './ThemedText'
import CustomInputField from './CustomInputField'
import { Colors } from '../constants/Colors'
import useThemeColors from '../hooks/useThemeColors'

type NewContactModalProps = {
    visible: boolean;
    hideModal: () => void;
    onAddContact: () => void;
    title: string;
    buttonText: string;
} & TextInputProps;

const NewContactModal = ({visible, hideModal, onAddContact, value, onChangeText, title, buttonText} : NewContactModalProps) => {
  const { cardBackgroundDark } = useThemeColors();
      
  return (
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.modalStyle, {backgroundColor: cardBackgroundDark}]}>          
          <ThemedText style={styles.text}>{title}</ThemedText>
          <CustomInputField style={styles.field} placeholder='Name' value={value} onChangeText={onChangeText}/>
          <Button buttonColor={Colors.light.greenColor} icon="" mode="contained" style={styles.submitButton} onPress={onAddContact}>
            <Text style={{color: 'white'}}>{buttonText}</Text>
          </Button>
          <Button buttonColor={Colors.light.warningButtonColor} icon="" mode="contained" style={styles.submitButton} onPress={hideModal}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </Button>
        </Modal>
      </Portal>
  )
}

export default NewContactModal

const styles = StyleSheet.create({
  modalStyle : {
    padding: 15,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20
  },
  submitButton: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10
  },
  text: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
  field: {
    marginBottom: 20
  }
})