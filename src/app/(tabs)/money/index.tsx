import { useItemList } from '@/src/api/items';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function MoneyMainScreen() {

  const { data, isLoading, error } = useItemList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data!</ThemedText>;
  }

  return (
    <ThemedView>
      <ThemedText>Test data:</ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView>
            <ThemedText>Title: {item.title} Date: {item.borrowed_at ? new Date(item.borrowed_at).toLocaleDateString() : 'Brak daty'} Borrower: {item.borrower_user_id} Description: {item.description}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  
});
