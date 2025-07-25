import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ThemedView from '@/src/components/ThemedView'
import ThemedText from '@/src/components/ThemedText'
import { Button } from 'react-native-paper'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'

const Profile = () => {    
  const { session } = useAuth()
  const user = session?.user
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText>User Profile: </ThemedText>
      <ThemedText>Username: { user?.user_metadata.username }</ThemedText>
      <ThemedText>Created at: { user?.created_at }</ThemedText>

      <Button icon={'logout'} style={styles.button} mode="contained" onPress={() => supabase.auth.signOut()}>
        <Text>Sign out</Text>
      </Button>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    button: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    }
})