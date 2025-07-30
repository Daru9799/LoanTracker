import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Contact } from '../types/contact'
import ThemedText from './ThemedText'
import { Trash2, User } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import ThemedView from './ThemedView'

type ContactCardProps = {
    contact: Contact;
    onDeleteIconPress?: () => void;
    onPress?: () => void;
    isSelected?: boolean;
}

const ContactCard = ({contact, onDeleteIconPress, onPress, isSelected} : ContactCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.itemCard, isSelected && styles.selectedCard ]}>
        <View style={styles.rowWrapper}>
              <View style={styles.label}>
                  <User color={Colors.light.buttonColor} size={22} strokeWidth={2} />
                  <ThemedText>{contact.name}</ThemedText>
              </View>
              {onDeleteIconPress && 
                <Pressable onPress={onDeleteIconPress} hitSlop={10}>
                    <Trash2 color='red' size={22} hitSlop={10}/>
                </Pressable>
              }
        </View>
      </ThemedView>
    </Pressable>

  )
}

export default ContactCard

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