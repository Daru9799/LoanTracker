import { Tabs } from 'expo-router';
import React from 'react';
import { Package, Banknote } from 'lucide-react-native';
import TabIcon from '@/src/components/TabIcon';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  //Translations
  const { t } = useTranslation('navbar');
  
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
          tabBarLabel: t('items'),
        }}
      />
      <Tabs.Screen
        name="money"
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabIcon IconComponent={Banknote} color={color} />
          ),
          tabBarLabel: t('money')
        }}
      />
    </Tabs>
  );
}
