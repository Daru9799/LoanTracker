import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function FriendsTabLayout() {
    return (
      <TopTabs>
        <TopTabs.Screen name="index" options={{title: 'Friends'}} />
        <TopTabs.Screen name="invitations" options={{title: 'Invitations'}} />
      </TopTabs>
    );
}