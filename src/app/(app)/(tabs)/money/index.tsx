import { useItemDetails } from '@/src/api/items';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function MoneyMainScreen() {

  const { data: item, isLoading, error } = useItemDetails('d633f2a8-957f-424f-8acd-11faff974f8b');

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data!</ThemedText>;
  }

  return (
    <ThemedView>
      <ThemedText>Test data:</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  
});
