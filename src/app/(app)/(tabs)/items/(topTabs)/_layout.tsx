import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function ItemsTabLayout() {
    //Translations
    const { t } = useTranslation('items');

    return (
      <TopTabs>
        <TopTabs.Screen name="index" options={{title: t('shared.lentItems')}} />
        <TopTabs.Screen name="create" options={{title: t('shared.addNew')}} />
      </TopTabs>
    );
}