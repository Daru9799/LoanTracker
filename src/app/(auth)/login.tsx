import { Alert, Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/src/components/ThemedView'
import ThemedText from '@/src/components/ThemedText'
import CustomInputField from '@/src/components/CustomInputField'
import { Button } from 'react-native-paper'
import { Colors } from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { useRouter } from 'expo-router'
import { PiggyBank } from 'lucide-react-native'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  
  const submitLogin = async() => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email, 
      password: password
    })
    if (error) Alert.alert(error.message)
    console.log(`Your credentials for register are, email: ${email} password: ${password}`)
    setLoading(false)
  }

  const clearForm = () => {
    setEmail('')
    setPassword('')
  }

  const goToRegisterForm = () => {
    router.navigate('/(auth)/register')
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeText}>
        <PiggyBank color={Colors.light.buttonColor} size={250} strokeWidth={1.5}/>
        Welcome back
      </ThemedText>
      <ThemedView style={styles.form}>
        <ThemedView style={styles.formRow}>
          <ThemedText>Email:</ThemedText>
          <CustomInputField placeholder='Email' value={email} onChangeText={setEmail} />
        </ThemedView>

        <ThemedView style={styles.formRow}>
          <ThemedText>Password:</ThemedText>
          <CustomInputField placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} />
        </ThemedView>
      
        <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitLogin} disabled={loading}>
          <Text style={{color: 'white'}}>Login</Text>
        </Button>
      </ThemedView>

      <Pressable onPress={goToRegisterForm} style={styles.registerContainer}>
        <ThemedText style={styles.registerText}>
            You don't have an account? Sign Up
        </ThemedText>
      </Pressable>
    </ThemedView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 15,
    },
    submitButton: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: 10
    },
    registerText: {
      alignSelf: 'center',
      textDecorationLine: 'underline',
      fontWeight: '600',
    },
    registerContainer: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: 30,
    },
    welcomeText: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 50
    },
    formRow: {
      marginBottom: 15
    }
})