import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer'
import { User, PiggyBank, Archive, Clock9, Users, Ghost, Landmark, ChartSpline, FlaskConical } from 'lucide-react-native';
import AuthGuard from '@/src/components/AuthGuard';
import { useTranslation } from 'react-i18next';

export default function AppLayout() {
  //Translations
  const { t } = useTranslation('navbar');

  return (
    <AuthGuard>
      <Drawer >
        <Drawer.Screen name="(tabs)" options={{ 
          title: t('loanTrackerMenu'),
          drawerIcon: ({ color, size }) => (
          <PiggyBank size={size} color={color} />
        ) }}/>
        <Drawer.Screen name="timeline" options={{ 
          title: t('timeline'),    
          drawerIcon: ({ color, size }) => (
          <Clock9 size={size} color={color} />
        ) }} />
        <Drawer.Screen name="(archived)" options={{ 
          title: t('archivedMenu'),
          drawerIcon: ({ color, size }) => (
          <Archive size={size} color={color} />
        ) }} />
        <Drawer.Screen name="localContacts" options={{ 
          title: t('localContactsMenu'),
          drawerIcon: ({ color, size }) => (
          <Ghost size={size} color={color} />
        ) }} />
        <Drawer.Screen name="(friends)" options={{ 
          title: t('friendsMenu'),
          drawerIcon: ({ color, size }) => (
          <Users size={size} color={color} />
        ) }} />
        <Drawer.Screen name="profile" options={{ 
          title: t('profileMenu'),
          drawerIcon: ({ color, size }) => (
          <User size={size} color={color} />
        ) }} />
        <Drawer.Screen name="myLoans" options={{ 
          title: t('myLoansMenu'),
          drawerIcon: ({ color, size }) => (
          <Landmark size={size} color={color} />
        ) }} />
        <Drawer.Screen name="stats" options={{ 
          title: t('statsMenu'),
          drawerIcon: ({ color, size }) => (
          <ChartSpline size={size} color={color} />
        ) }} />
      </Drawer>
    </AuthGuard>

  );
}