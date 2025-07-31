import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Dialog, Portal } from 'react-native-paper'
import ThemedText from './ThemedText'
import { changeLanguage as i18nChangeLanguage } from '../utils/i18n';

type LanguageSelectorProps = {
    mode?: 'flag' | 'button';
    buttonText?: string;
    style?: StyleProp<ViewStyle>;
}

const LanguageSelector = ({ mode = 'flag', style, buttonText="Change Language"} : LanguageSelectorProps) => {
    const languages = [ //TODO: Przerzucić do const
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'pl', label: 'Polski', flag: '🇵🇱' }
    ]     

    const { i18n } = useTranslation()
    const [langDialogVisible, setLangDialogVisible] = useState(false)

    const changeLanguage = async (code: string) => {
        await i18nChangeLanguage(code);
        setLangDialogVisible(false)
    }

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0]


  return (
    <View style={style}>
        {mode === "flag" ? (
            <Pressable onPress={() => setLangDialogVisible(true)} style={styles.flagButton}>
                <Text style={styles.flagEmoji}>{currentLang.flag}</Text>
            </Pressable>
        ) : (
            <Button icon="translate" mode="contained" onPress={() => setLangDialogVisible(true)}>
                {buttonText}
            </Button>
        )}

        <Portal>
            <Dialog visible={langDialogVisible} onDismiss={() => setLangDialogVisible(false)}>
                {/* <Dialog.Title>{t("authentication:mutual.selectLanguage")}</Dialog.Title> */}
                <Dialog.Title>Wybierz język:</Dialog.Title>
                <Dialog.Content>
                {languages.map(({ code, label, flag }) => (
                    <Pressable key={code} onPress={() => changeLanguage(code)} style={styles.langOption}>
                    <ThemedText style={styles.langText}>{flag}  {label}</ThemedText>
                    </Pressable>
                ))}
                </Dialog.Content>
            </Dialog>
        </Portal>

    </View>

  )
}

export default LanguageSelector

const styles = StyleSheet.create({
    flagButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        padding: 8,
        borderRadius: 20,
        zIndex: 999,
    },
    flagEmoji: {
        fontSize: 26,
    },
    langOption: {
        paddingVertical: 10,
    },
    langText: {
        fontSize: 18,
    }
})