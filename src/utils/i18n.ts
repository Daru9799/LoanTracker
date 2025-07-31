import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
//Translation json files
import authenticationEN from './locales/en/authenticationEN.json'
import authenticationPL from './locales/pl/authenticationPL.json'
import navbarEN from './locales/en/navbarEN.json'
import navbarPL from './locales/pl/navbarPL.json'
import profileEN from './locales/en/profileEN.json'
import profilePL from './locales/pl/profilePL.json'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    authentication: authenticationEN,
    navbar: navbarEN,
    profile: profileEN
  },
  pl: {
    authentication: authenticationPL,
    navbar: navbarPL,
    profile: profilePL
  }
};

//Odczytywanie języka z cache
const LANGUAGE_KEY = 'user-language';

async function getInitialLanguage() {
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (savedLang) return savedLang;
  return 'en';
}

(async () => {
    const lng = await getInitialLanguage();

    await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      lng,
      interpolation: {
        escapeValue: false
      },
    });
})();

export const changeLanguage = async (lang: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);
};

export default i18n;