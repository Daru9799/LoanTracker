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
  const { cardBackground } = useThemeColors();
      
  return (
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.modalStyle, {backgroundColor: cardBackground}]}>
          <ThemedText style={styles.text}>{title}</ThemedText>
          <CustomInputField placeholder='Name' value={value} onChangeText={onChangeText}/>
          <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={onAddContact}>
            <Text style={{color: 'white'}}>{buttonText}</Text>
          </Button>
        </Modal>
      </Portal>
  )
}

export default NewContactModal

const styles = StyleSheet.create({
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
  }
})