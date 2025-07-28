import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Contact } from 'expo-contacts';
import ThemedText from './ThemedText'
import { CircleUserRound } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import ThemedView from './ThemedView'

type ImportedContactCardProps = {
    contact: Contact;
    onPress?: () => void;
    isSelected?: boolean;
}

const ImportedContactCard = ({contact, onPress, isSelected} : ImportedContactCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.itemCard, isSelected && styles.selectedCard ]}>
        <View style={styles.rowWrapper}>
              <View style={styles.label}>
                  <CircleUserRound color={Colors.light.buttonColor} size={22} strokeWidth={2} />
                  <ThemedText>{contact.name}</ThemedText>
              </View>
        </View>
      </ThemedView>
    </Pressable>
  )
}

export default ImportedContactCard

const styles = StyleSheet.create({
  itemCard: {
    padding: 10,
    borderRadius: 10,
    width: '100%'
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    flexDirection: 'row',
    gap: 10,
  },
  selectedCard : {
    borderColor: Colors.light.buttonColor,
    borderWidth: 2,
  }
})