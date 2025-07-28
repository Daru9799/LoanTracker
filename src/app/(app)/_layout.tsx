import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer'
import { User, PiggyBank, Archive, Clock9, Users, Ghost, Landmark, ChartSpline, FlaskConical } from 'lucide-react-native';
import AuthGuard from '@/src/components/AuthGuard';

export default function AppLayout() {

  return (
    <AuthGuard>
      <Drawer >
        <Drawer.Screen name="(tabs)" options={{ 
          title: 'Loan Tracker', 
          drawerIcon: ({ color, size }) => (
          <PiggyBank size={size} color={color} />
        ) }}/>
        <Drawer.Screen name="timeline" options={{ 
          title: 'Timeline',       
          drawerIcon: ({ color, size }) => (
          <Clock9 size={size} color={color} />
        ) }} />
        <Drawer.Screen name="(archived)" options={{ 
          title: 'Archived Items/Loans',
          drawerIcon: ({ color, size }) => (
          <Archive size={size} color={color} />
        ) }} />
        <Drawer.Screen name="localContacts" options={{ 
          title: 'Local Contacts',
          drawerIcon: ({ color, size }) => (
          <Ghost size={size} color={color} />
        ) }} />
        <Drawer.Screen name="(friends)" options={{ 
          title: 'Friends', 
          drawerIcon: ({ color, size }) => (
          <Users size={size} color={color} />
        ) }} />
        <Drawer.Screen name="profile" options={{ 
          title: 'Profile', 
          drawerIcon: ({ color, size }) => (
          <User size={size} color={color} />
        ) }} />
        <Drawer.Screen name="myLoans" options={{ 
          title: 'My Loans', 
          drawerIcon: ({ color, size }) => (
          <Landmark size={size} color={color} />
        ) }} />
        <Drawer.Screen name="stats" options={{ 
          title: 'Statistics', 
          drawerIcon: ({ color, size }) => (
          <ChartSpline size={size} color={color} />
        ) }} />
      </Drawer>
    </AuthGuard>

  );
}