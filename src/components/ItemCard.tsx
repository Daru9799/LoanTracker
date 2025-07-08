import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Item } from '../types/item'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CalendarClock, Calendar, Contact2 } from 'lucide-react-native';
import { checkIsLate } from '../functions';
import { Link } from 'expo-router';

dayjs.extend(relativeTime)

type ItemCardProps = {
    item: Item;
    archived?: boolean;
}

const ItemCard = ({item, archived=false} : ItemCardProps) => {
  const [isLate, setIsLate] = useState(false)
  //Konwersja dat
  const relativeBorrowedDate = dayjs().to(item.borrowed_at);
  const relativeReturnDate = item.return_at ? dayjs().to(item.return_at) : 'TBD';

  useEffect(() => {
    setIsLate(checkIsLate(item.return_at, item.is_returned));
  }, []);

  return (
    <Link href={{ pathname: '/(tabs)/items/[id]', params: { id: String(item.id) } }}>
      <View style={styles.itemCard}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.rowWrapper}>
            <View style={styles.itemRow}>
              <Calendar color={'purple'} size={22} strokeWidth={2}/>
              <Text style={styles.contentText}>{relativeBorrowedDate}</Text>
            </View>

            {!archived ? (
              <View style={styles.itemRow}>
                <CalendarClock color={'purple'} size={22} strokeWidth={2}/>
                <Text style={[isLate ? styles.returnDateColorNormal : styles.returnDateColorLate, styles.contentText]}>{relativeReturnDate}</Text>
              </View>
            ) : (
              <View style={styles.itemRow}></View>
            )}

          </View>

          <View style={styles.itemRow}>
            <Contact2 color={'purple'} size={22} strokeWidth={2} />
            <Text style={styles.contentText}>{ item.borrower_user_id ?? item.borrower_contact_id ?? 'Undefined User'
              /* W zależności od przyjętej wartości null wybiera odpowiednią osobę (rozwiązanie tymczasowe) */ }
            </Text>
          </View>
      </View>
    </Link>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  itemCard: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    marginBottom: 5,
    fontSize: 17
  },
  contentText: {
    fontSize: 15
  },
  returnDateColorNormal: {
    color: 'black',
  },
  returnDateColorLate: {
    color: 'red',
  },
  itemRow: {
    flexDirection: 'row',
    gap: 5,
    width: '50%',
    alignItems: 'center'
  },
  rowWrapper: {
    flexDirection: 'row'
  }
})