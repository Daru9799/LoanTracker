import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedText from '@/src/components/ThemedText'
import { Divider } from 'react-native-paper'
import UserCard from '@/src/components/UserCard'
import { Colors } from '@/src/constants/Colors'
import CustomAddIcon from '@/src/components/CustomAddIcon'
import { useFriendInvitationsList } from '@/src/api/relations'
import { Redirect } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'

type DummyUser = {
    username: string
}

const users: DummyUser[] = [
    { username: "alice" },
    { username: "bob" },
    { username: "charlie" },
    { username: "alice" },
    { username: "bob" },
    { username: "charlie" }
];

const Invitations = () => {
  const { session } = useAuth()
  if(!session) {
    return <Redirect href={'/(auth)/login'} />
  }
  const { data: invitations } = useFriendInvitationsList()

  return (
    <View style={styles.container}>
        <View>
            <ThemedText style={styles.title}>Invitations</ThemedText>
            { invitations ? (
                <FlatList 
                    style={styles.list}
                    data={invitations}
                    renderItem={({item}) => <UserCard username={item.sender_username} iconColor={Colors.light.purpleColor} onAcceptIconPress={() => console.log('Accepted')} onDeclineIconPress={() => console.log('Declined')}/>}
                    contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
                />
            ) : (
                <ThemedText>You dont have any invitations!</ThemedText>
            )}

        </View>

        <View>
            <ThemedText style={styles.title}>Pending</ThemedText>
            <FlatList 
                style={styles.list}
                data={users}
                renderItem={({item}) => <UserCard username={item.username} iconColor={Colors.light.yellowColor}/>}
                contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 60}}
            />
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
    }
})