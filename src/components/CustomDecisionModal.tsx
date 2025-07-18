import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Button, Modal, Portal } from 'react-native-paper';
import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';
import { Trash } from 'lucide-react-native';

type CustomModalProps = {
    visible: boolean;
    modalText: string;
    actionButtonText: string;
    onDismiss: () => void;
    onActionButtonPress: () => void
}

const CustomDecisionModal = ({visible, modalText, actionButtonText, onDismiss, onActionButtonPress} : CustomModalProps) => {
  const colorScheme = useColorScheme();
  const cardBackground = colorScheme === 'dark' ? '#2a3238ff' : '#F7F7F7';
  
  return (
    <View>
        <Portal>
            <Modal style={styles.modalPosition} visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modalStyle, {backgroundColor: cardBackground}]}>
                <ThemedText style={styles.modalText}>{modalText}</ThemedText>

                <View style={styles.rowWrapper}>
                    <Button buttonColor={Colors.light.buttonColor} mode="contained" style={styles.button} onPress={onDismiss}>
                        <Text style={{color: 'white'}}>Cancel</Text>
                    </Button>
                    
                    <Button buttonColor={Colors.light.warningButtonColor} icon={({ size }) => <Trash size={size} color="white" />} mode="contained" style={styles.button} onPress={onActionButtonPress}>
                        <Text style={{color: 'white'}}>{actionButtonText}</Text>
                    </Button>
                </View>
            </Modal>
        </Portal>
    </View>
  )
}

export default CustomDecisionModal

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white', 
        padding: 20,
        width: '80%',
        borderRadius: 20
    },
    modalPosition: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalText: {
        textAlign: 'center'
    },
    button: {
        width: '50%',
        alignSelf: 'center',
        marginTop: 20
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
})