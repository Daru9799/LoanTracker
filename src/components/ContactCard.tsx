import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Contact } from '../types/contact'
import ThemedText from './ThemedText'
import { Trash2, User } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import ThemedView from './ThemedView'

type ContactCardProps = {
    contact: Contact;
    onDeleteIconPress: () => void;
}

const ContactCard = ({contact, onDeleteIconPress} : ContactCardProps) => {
  return (
    <ThemedView style={styles.itemCard}>
      <View style={styles.rowWrapper}>
            <View style={styles.label}>
                <User color={Colors.light.buttonColor} size={22} strokeWidth={2} />
                <ThemedText>{contact.name}</ThemedText>
            </View>
            <Pressable onPress={onDeleteIconPress} hitSlop={10}>
                <Trash2 color='red' size={22} hitSlop={10}/>
            </Pressable>
      </View>
    </ThemedView>
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
})