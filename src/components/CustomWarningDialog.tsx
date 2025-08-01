import { StyleSheet } from 'react-native'
import React from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

type CustomWarningDialogProps = {
    visible: boolean;
    title: string;
    description: string;
    onDismiss: () => void;
    icon?: IconSource;
    iconColor?: string;
}

const CustomWarningDialog = ({visible, title, description, icon, iconColor, onDismiss} : CustomWarningDialogProps) => {
  return (
      <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={onDismiss}>
          {icon && <Dialog.Icon icon={icon} color={iconColor || 'white'}/>}
          <Dialog.Title style={{textAlign: 'center'}}>{title}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.text} variant="bodyMedium">{description}</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions} >
            <Button onPress={onDismiss}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  )
}

export default CustomWarningDialog

const styles = StyleSheet.create({
    dialog: {
        width: '75%',
        alignSelf: 'center'
    },
    text: {
        textAlign: 'center',
    },
    dialogActions: {
        alignSelf: 'center'
    }
})