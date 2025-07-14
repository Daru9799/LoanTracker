import { Alert, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/src/components/ThemedView'
import ThemedText from '@/src/components/ThemedText'
import CustomInputField from '@/src/components/CustomInputField'
import { Button } from 'react-native-paper'
import { Colors } from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { UserPlus } from 'lucide-react-native'

const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const submitRegister = async() => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email, 
      password: password, 
      options: {
        data: {
          username: username, //Nowe dane są uwzględniane w funkcji handle_new_user w bazie (należy tam dodać nowe pola)
        }
    }})
    if (error) Alert.alert(error.message)
    console.log(`Your credentials for register are, email: ${email} password: ${password}`)
    setLoading(false)
  }

  const clearForm = () => {
    setEmail('')
    setPassword('')
    setUsername('')
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeText}>
        <UserPlus color={Colors.light.buttonColor} size={250} strokeWidth={1.5}/>
        Create account
      </ThemedText>
      <ThemedView>
        <ThemedText>Email:</ThemedText>
        <CustomInputField placeholder='Email' value={email} onChangeText={setEmail} />
        <ThemedText>Username:</ThemedText>
        <CustomInputField placeholder='Username' value={username} onChangeText={setUsername} />
        <ThemedText>Password:</ThemedText>
        <CustomInputField placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} />
        <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitRegister} disabled={loading}>
          <Text style={{color: 'white'}}>Register</Text>
        </Button>
      </ThemedView>
    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 10,
      marginTop: 50
    },
    submitButton: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: 10
    },
    welcomeText: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 50
    },
})