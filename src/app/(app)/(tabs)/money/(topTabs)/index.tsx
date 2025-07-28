import MoneyLoanCard from '@/src/components/MoneyLoanCard';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { MoneyLoan } from '@/src/types/money_loan';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const mockLoansList: MoneyLoan[] = [
  {
    id: '1',
    title: 'Pożyczka dla Jana',
    description: 'Pożyczka krótkoterminowa',
    amount: 1500,
    currency: 'PLN',
    interest_rate: 5.5,
    borrowed_at: new Date('2025-05-01'),
    return_at: new Date('2025-08-01'),
    is_returned: false,
    owner_id: 'user_001',
    borrower_user_id: 'user_002',
    borrower_username: 'jan_kowalski',
  },
  {
    id: '2',
    title: 'Pomoc dla Ani',
    amount: 3000,
    currency: 'EUR',
    interest_rate: 3.0,
    borrowed_at: new Date('2025-06-10'),
    is_returned: false,
    owner_id: 'user_001',
    borrower_contact_id: 'contact_001',
    borrower_contact_name: 'Anna Nowak',
  },
  {
    id: '3',
    title: 'Pożyczka na auto',
    description: 'Zwrócona w terminie',
    amount: 10000,
    currency: 'PLN',
    interest_rate: 7.2,
    borrowed_at: new Date('2024-12-15'),
    return_at: new Date('2025-04-15'),
    is_returned: true,
    owner_id: 'user_003',
    borrower_user_id: 'user_004',
    borrower_username: 'piotr_zielinski',
  },
  {
    id: '4',
    title: 'Na remont mieszkania',
    amount: 8000,
    currency: 'USD',
    interest_rate: 4.8,
    borrowed_at: new Date('2025-01-20'),
    return_at: new Date('2025-07-20'),
    is_returned: false,
    owner_id: 'user_002',
    borrower_contact_id: 'contact_005',
    borrower_contact_name: 'Karol Malinowski',
  },
  {
    id: '5',
    title: 'Pożyczka dla brata',
    amount: 2500,
    currency: 'PLN',
    interest_rate: 0,
    borrowed_at: new Date('2025-07-01'),
    is_returned: false,
    owner_id: 'user_005',
    borrower_user_id: 'user_006',
    borrower_username: 'marek_brat',
  },
];

export default function MoneyMainScreen() {
  return (
    <ThemedView style={{flex: 1}}>
      <FlatList
      data={mockLoansList}
      renderItem= {
        ({item}) => <MoneyLoanCard moneyLoan={item}></MoneyLoanCard>
      }
      />
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  
});
