import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Redirect } from 'expo-router'

type Props = {
  children: React.ReactNode
}

const AuthGuard = ({ children }: Props) => {
  const { session } = useAuth()

  if (!session) {
    return <Redirect href="/(auth)/login" />
  }

  return <>{children}</>
}

export default AuthGuard