import { StyleSheet, FlatList } from 'react-native';
import { mockItems } from '../../../../../assets/data/mockItems'
import ItemCard from '@/src/components/ItemCard';
import ThemedView from '@/src/components/ThemedView';

export default function ItemsMainScreen() {

  const items = mockItems.filter((item) => item.is_returned === false) //Przypisanie przykladowych itemów (w ramach testów)

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
  }
});
