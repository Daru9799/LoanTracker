import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const AuthNav = () => {
  const { session } = useAuth()
  if(session) {
    return <Redirect href={'/items'} />
  }

  return (
      <Stack>
          <Stack.Screen name='login' options={{ headerShown: false }}/>
          <Stack.Screen name='register' options={{ headerShown: false }} />
      </Stack>
  )
}

export default AuthNav