import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedText from '@/src/components/ThemedText'
import { Divider } from 'react-native-paper'
import UserCard from '@/src/components/UserCard'
import { Colors } from '@/src/constants/Colors'
import CustomAddIcon from '@/src/components/CustomAddIcon'
import { useAcceptFriendRequest, useDeleteRelation, useFriendInvitationsList, usePendingList } from '@/src/api/relations'
import { Redirect } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'

const Invitations = () => {
  const { session } = useAuth()
  if(!session) {
    return <Redirect href={'/(auth)/login'} />
  }
  const { data: invitations } = useFriendInvitationsList()
  const { data: pending } = usePendingList()
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest()
  const { mutate: deleteFriendRequest } = useDeleteRelation()

  const onAcceptInvitation = (relation_id: string) => {
    console.log('User z relacji ' + relation_id + ' dodany')
    acceptFriendRequest(relation_id)
  }

  const onDeclineInvitation = (relation_id: string) => {
    console.log('Usunieto relacje ' + relation_id)
    deleteFriendRequest(relation_id)
  }

  return (
    <View style={styles.container}>
        <View>
            <ThemedText style={styles.title}>Invitations</ThemedText>
            {(invitations && invitations.length > 0 ) ? (
                <FlatList 
                    style={styles.list}
                    data={invitations}
                    renderItem={({item}) => <UserCard username={item.sender_username} iconColor={Colors.light.purpleColor} onAcceptIconPress={() => onAcceptInvitation(item.id)} onDeclineIconPress={() => onDeclineInvitation(item.id)}/>}
                    contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
                />
            ) : (
                <ThemedText style={styles.clearListText}>You dont have any invitations!</ThemedText>
            )}
        </View>

        <View>
            <ThemedText style={styles.title}>Pendings</ThemedText>
            { (pending && pending.length > 0 ) ? (
                <FlatList 
                    style={styles.list}
                    data={pending}
                    renderItem={({item}) => <UserCard username={item.receiver_username} iconColor={Colors.light.purpleColor}/>}
                    contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
                />
            ) : (
                <ThemedText style={styles.clearListText}>You dont have any pendings!</ThemedText>
            )}
        </View>

        <CustomAddIcon onPress={() => console.log('Add new friend')}/>
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