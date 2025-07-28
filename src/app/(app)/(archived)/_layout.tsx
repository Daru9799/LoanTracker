import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function ArchivedTabLayout() {
    return (
      <TopTabs>
        <TopTabs.Screen name="index" options={{title: 'Archived Items'}} />
        <TopTabs.Screen name="money" options={{title: 'Archived Loans'}} />
      </TopTabs>
    );
}