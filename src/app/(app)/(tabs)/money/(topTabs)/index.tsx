import { useMoneyLoansList } from '@/src/api/moneyLoans';
import CustomActivityIndicator from '@/src/components/CustomActivityIndicator';
import MoneyLoanCard from '@/src/components/MoneyLoanCard';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { MoneyLoan } from '@/src/types/money_loan';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function MoneyMainScreen() {
  const { data: loans, isLoading, error } = useMoneyLoansList({isArchived: false, sortAscending: true});

  if (isLoading) {
    return <CustomActivityIndicator style={styles.activityIndicator} />;
  }

  if (error) {
    return <ThemedText>Failed to fetch data!</ThemedText>;
  }
  
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={loans}
        renderItem= {
          ({item}) => <MoneyLoanCard moneyLoan={item}></MoneyLoanCard>
        }
        contentContainerStyle={{gap: 10, padding: 10}}
      />
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator : {
    marginTop: 10
  }
});
