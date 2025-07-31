import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ThemedView from '@/src/components/ThemedView'
import { Button, Card, Divider, List } from 'react-native-paper'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import LanguageSelector from '@/src/components/LanguageSelector'
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next'

const Profile = () => {    
  //Session
  const { session } = useAuth()
  const user = session?.user
  //Translations
  const { t } = useTranslation('profile');

  return (
    <ThemedView style={styles.container}>
      <Card style={styles.card}>
        {/* <Card.Title title="User Profile" /> */}
        <Card.Content>
          <List.Item
            title={user?.user_metadata.username || ''}
            description={t('username')}
            left={props => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title={dayjs(user?.created_at).format('DD-MM-YYYY') || ''}
            description={t('createdAt')}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <Divider />
          <LanguageSelector mode='button' style={styles.button} buttonText={t('changeLanguage')} />
          <Divider />
          <Button icon={'logout'} style={styles.button} mode="contained" onPress={() => supabase.auth.signOut()}>
            <Text>{t('signOut')}</Text>
          </Button>
        </Card.Content>
      </Card>




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
        marginVertical: 15,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
      borderRadius: 8,
  },
})