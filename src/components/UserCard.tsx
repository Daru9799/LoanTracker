import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import { Trash2, User, UserRoundCheck, UserRoundX } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import ThemedView from './ThemedView'

type UserCardProps = {
    username: string;
    onDeleteIconPress?: () => void;
    iconColor?: string;
    onPress?: () => void;
    isSelected?: boolean;
    onAcceptIconPress?: () => void;
    onDeclineIconPress?: () => void;
}

const UserCard = ({username, onDeleteIconPress, onPress, isSelected, iconColor=Colors.light.buttonColor, onAcceptIconPress, onDeclineIconPress} : UserCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.itemCard, isSelected && styles.selectedCard ]}>
        <View style={styles.rowWrapper}>
              <View style={styles.label}>
                  <User color={iconColor} size={22} strokeWidth={2} />
                  <ThemedText>{username}</ThemedText>
              </View>
              {onDeleteIconPress && 
                <Pressable onPress={onDeleteIconPress} hitSlop={10}>
                    <Trash2 color='red' size={22} hitSlop={10}/>
                </Pressable>
              }
              <View style={styles.label}>
                {onAcceptIconPress && 
                    <Pressable onPress={onAcceptIconPress} hitSlop={10}>
                        <UserRoundCheck color='green' size={22} hitSlop={10}/>
                    </Pressable>
                }
                {onDeclineIconPress && 
                    <Pressable onPress={onDeclineIconPress} hitSlop={10}>
                        <UserRoundX color='red' size={22} hitSlop={10}/>
                    </Pressable>
                }
              </View>
        </View>
      </ThemedView>
    </Pressable>

  )
}

export default UserCard

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