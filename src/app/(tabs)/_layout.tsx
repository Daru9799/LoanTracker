import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Package, Banknote } from 'lucide-react-native';
import TabIcon from '@/src/components/TabIcon';
import { useAuth } from '@/src/providers/AuthProvider';

export default function TabLayout() {
  const { session } = useAuth()

  if(!session) {
    return <Redirect href={'/(auth)/login'} />
  }


  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14},
        tabBarIconStyle: { width: 30, height: 30 },
      }}>
      <Tabs.Screen
        name="items"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={Package} color={color} />
          ),
          tabBarLabel: 'Items',
        }}
      />
      <Tabs.Screen
        name="money"
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabIcon IconComponent={Banknote} color={color} />
          ),
          tabBarLabel: 'Money'
        }}
      />
    </Tabs>
  );
}
