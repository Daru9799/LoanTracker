import { Alert, Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/src/components/ThemedView'
import ThemedText from '@/src/components/ThemedText'
import CustomInputField from '@/src/components/CustomInputField'
import { Button } from 'react-native-paper'
import { Colors } from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { UserPlus } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import CustomWarningDialog from '@/src/components/CustomWarningDialog'

const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('')

  const router = useRouter();

  const hideDialog = () => setVisible(false);

  const submitRegister = async() => {
    setLoading(true);

    const { data: userWithSameUsername, error: usernameCheckError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username);

    if (usernameCheckError) {
      setError("Unexpected error checking username.");
      setVisible(true);
      setLoading(false);
      return
    }

    if (userWithSameUsername.length > 0) {
      setError("Username is already taken.");
      setVisible(true);
      setLoading(false);
      return
    }

    const { error } = await supabase.auth.signUp({
      email: email, 
      password: password, 
      options: {
        data: {
          username: username, //Nowe dane są uwzględniane w funkcji handle_new_user w bazie (należy tam dodać nowe pola)
        }
    }})

    if (error) {
      if (error.code === 'anonymous_provider_disabled') {
        error.message = "Missing fields!";
      } else if (error.code === 'weak_password') {
        error.message = "Password must be at least 8 characters long and include a number and an uppercase letter!";
      }
      setError(error.message);
      setVisible(true);
      setLoading(false);
      return;
    }
    clearForm();
    setLoading(false);
  }

  const clearForm = () => {
    setEmail('')
    setPassword('')
    setUsername('')
  }

  const goToLoginForm = () => {
    router.navigate('/(auth)/login')
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeText}>
        <UserPlus color={Colors.light.buttonColor} size={250} strokeWidth={1.5} />
        {"\n"}Create account
      </ThemedText>
      <ThemedView style={styles.form}>
        <ThemedView style={styles.formRow}>
          <ThemedText>Email:</ThemedText>
          <CustomInputField placeholder='Email' value={email} onChangeText={setEmail} />
        </ThemedView>

        <ThemedView style={styles.formRow}>
          <ThemedText>Username:</ThemedText>
          <CustomInputField placeholder='Username' value={username} onChangeText={setUsername} />
        </ThemedView>

        <ThemedView style={styles.formRow}>
          <ThemedText>Password:</ThemedText>
          <CustomInputField placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} />
        </ThemedView>

        <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitRegister} disabled={loading}>
          <Text style={{color: 'white'}}>Register</Text>
        </Button>
      </ThemedView>

      <Pressable onPress={goToLoginForm} style={styles.registerContainer}>
        <ThemedText style={styles.registerText}>
            You have an account? Sign In
        </ThemedText>
      </Pressable>      

      <CustomWarningDialog visible={visible} title={'Register error'} description={error} onDismiss={hideDialog} icon={'alert'} iconColor={'#FF2C2C'}/>

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
    },
    submitButton: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: 10
    },
    welcomeText: {
      fontSize: 40,
      alignSelf: 'center',
      marginTop: 50
    },
    formRow: {
      marginBottom: 15
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
})