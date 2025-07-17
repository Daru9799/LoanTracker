import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ItemCard from '@/src/components/ItemCard';
import ThemedView from '@/src/components/ThemedView';
import { useItemList } from '@/src/api/items';
import ThemedText from '@/src/components/ThemedText';
import CustomActivityIndicator from '@/src/components/CustomActivityIndicator';

export default function ItemsMainScreen() {

  const { data: items, isLoading, error } = useItemList({isArchived: false});

  if (isLoading) {
    return <CustomActivityIndicator style={styles.activityIndicator} />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data!</ThemedText>;
  }

  //const items = mockItems.filter((item) => item.is_returned === false) //Przypisanie przykladowych itemów (w ramach testów)

  return (
      <ThemedView style={styles.container}>
        <FlatList 
          data={items}
          renderItem={({item}) => <ItemCard item={item}></ItemCard>}
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
