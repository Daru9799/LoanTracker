

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function MoneyTabLayout() {
    return (
        <TopTabs>
            <TopTabs.Screen name="index" options={{ title: 'Owed Money' }} />
            <TopTabs.Screen name="create" options={{ title: 'Add Debt' }} />
        </TopTabs>
    );
}