import { StyleSheet, FlatList, View } from 'react-native';
import { mockItems } from '../../../../../assets/data/mockItems'
import ItemCard from '@/src/components/ItemCard';

export default function ItemsMainScreen() {

  const items = mockItems.filter((item) => item.is_returned === false) //Przypisanie przykladowych itemów (w ramach testów)

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        renderItem={({item}) => <ItemCard item={item}></ItemCard>}
        contentContainerStyle={{gap: 10, padding: 10}}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
