import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { Colors } from '../constants/Colors'

type CloseIconProps = {
    hideModal: () => void;
}

const CloseIcon = ({hideModal} : CloseIconProps) => {
  return (
    <Pressable 
        onPress={hideModal}
        hitSlop={20}
        style={styles.closeButton}
    >
        <Icon source="close" size={24} color={Colors.light.warningButtonColor} />
    </Pressable>
  )
}

export default CloseIcon

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    }
})