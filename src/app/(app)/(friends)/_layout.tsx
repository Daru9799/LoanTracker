import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function FriendsTabLayout() {
    //Translations
    const { t } = useTranslation(['friends', 'common']);

    return (
      <TopTabs>
        <TopTabs.Screen name="index" options={{title: t('friends')}} />
        <TopTabs.Screen name="invitations" options={{title: t('invitations')}} />
      </TopTabs>
    );
}