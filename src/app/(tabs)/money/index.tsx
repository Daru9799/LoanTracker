import { useTestList } from '@/src/api/test/test';
import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function MoneyMainScreen() {

  const { data, isLoading, error } = useTestList();

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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ThemedView>
            <ThemedText>Id: {item.id} Name: {item.name}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  
});
