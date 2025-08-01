import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function ArchivedTabLayout() {
    //Translations
    const { t } = useTranslation('common');
    
    return (
      <TopTabs>
        <TopTabs.Screen name="index" options={{title: t('archivedItems')}} />
        <TopTabs.Screen name="money" options={{title: t('archivedLoans')}} />
      </TopTabs>
    );
}