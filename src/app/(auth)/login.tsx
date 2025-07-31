import { Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/src/components/ThemedView'
import ThemedText from '@/src/components/ThemedText'
import CustomInputField from '@/src/components/CustomInputField'
import { Button, Text } from 'react-native-paper'
import { Colors } from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { useRouter } from 'expo-router'
import { PiggyBank } from 'lucide-react-native'
import CustomWarningDialog from '@/src/components/CustomWarningDialog'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/src/components/LanguageSelector'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('')

  const router = useRouter();

  const hideDialog = () => setVisible(false);

  //Translations
  const { t } = useTranslation('authentication');
  
  const submitLogin = async() => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email, 
      password: password
    })
    if (error) {
      setError(error.message)
      setVisible(true)
    }

    clearForm()
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

      <LanguageSelector />

      <ThemedView style={styles.headerContainer}>
        <PiggyBank color={Colors.light.buttonColor} size={250} strokeWidth={1.5} />
        <ThemedText style={styles.welcomeText}>{t("login.welcomeMessage")}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.form}>
        <ThemedView style={styles.formRow}>
          <ThemedText>{t("shared.email")}:</ThemedText>
          <CustomInputField placeholder={t("shared.email")} value={email} onChangeText={setEmail} />
        </ThemedView>
        
        <ThemedView style={styles.formRow}>
          <ThemedText>{t("shared.password")}:</ThemedText>
          <CustomInputField placeholder={t("shared.password")} secureTextEntry={true} value={password} onChangeText={setPassword} />
        </ThemedView>
      
        <Button buttonColor={Colors.light.buttonColor} icon="" mode="contained" style={styles.submitButton} onPress={submitLogin} disabled={loading}>
          <Text style={{color: 'white'}}>{t("login.login")}</Text>
        </Button>
      </ThemedView>

      <Pressable onPress={goToRegisterForm} style={styles.loginContainer}>
        <ThemedText style={styles.loginText}>
            {t("login.redirectText")}
        </ThemedText>
      </Pressable>

      <CustomWarningDialog visible={visible} title={'Login error'} description={error} onDismiss={hideDialog} icon={'alert'} iconColor={'#FF2C2C'}/>

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
    loginText: {
      alignSelf: 'center',
      textDecorationLine: 'underline',
      fontWeight: '600',
    },
    loginContainer: {
      alignSelf: 'center',
      marginBottom: 60
    },
    welcomeText: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 10
    },
    formRow: {
      marginBottom: 15
    },
    headerContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
})