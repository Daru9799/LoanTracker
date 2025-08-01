import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from '@/src/components/ThemedText'
import UserCard from '@/src/components/UserCard'
import { Colors } from '@/src/constants/Colors'
import { useAcceptFriendRequest, useDeleteRelation, useFriendInvitationsList, usePendingList } from '@/src/api/relations'
import { useTranslation } from 'react-i18next'

const Invitations = () => {
  //API data
  const { data: invitations } = useFriendInvitationsList()
  const { data: pending } = usePendingList()
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest()
  const { mutate: deleteFriendRequest } = useDeleteRelation()

  //Translations
  const { t } = useTranslation('friends');

  return (
    <View style={styles.container}>
        <View>
            <ThemedText style={styles.title}>{t('invitations')}</ThemedText>
            {(invitations && invitations.length > 0 ) ? (
                <FlatList 
                    style={styles.list}
                    data={invitations}
                    renderItem={({item}) => <UserCard username={item.sender_username} iconColor={Colors.light.purpleColor} onAcceptIconPress={() => acceptFriendRequest(item.id)} onDeclineIconPress={() => deleteFriendRequest(item.id)}/>}
                    contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
                />
            ) : (
                <ThemedText style={styles.clearListText}>{t('noInvitations')}</ThemedText>
            )}
        </View>

        <View>
            <ThemedText style={styles.title}>{t('pendings')}</ThemedText>
            { (pending && pending.length > 0 ) ? (
                <FlatList 
                    style={styles.list}
                    data={pending}
                    renderItem={({item}) => <UserCard username={item.receiver_username} iconColor={Colors.light.purpleColor}/>}
                    contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
                />
            ) : (
                <ThemedText style={styles.clearListText}>{t('noPendings')}</ThemedText>
            )}
        </View>
    </View>
  )
}

export default Invitations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },
    list : {
        maxHeight: 260,
    },
    clearListText: {
        textAlign: 'center',
        marginTop: 5
    }
})