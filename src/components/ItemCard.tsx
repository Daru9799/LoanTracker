import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Item } from '../types/item'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CalendarClock, Calendar, Contact2 } from 'lucide-react-native';

type ItemCardProps = {
    item: Item;
}

const ItemCard = ({item} : ItemCardProps) => {
  const [isLate, setIsLate] = useState(false)
  //Konwersja dat
  dayjs.extend(relativeTime);
  const returnDate = dayjs(item.return_at);
  const relativeBorrowedDate = dayjs().to(item.borrowed_at);
  const relativeReturnDate = dayjs().to(item.return_at);
  const now = dayjs();

  useEffect(() => {
    checkIsLate();
  }, []);

  const checkIsLate = () => {
    //Sprawdzenie czy jest opóźnienie
    if (returnDate.isAfter(now) && !item.is_returned) {
      setIsLate(true);
    } else {
      setIsLate(false);
    }
  }

  return (
    <View style={styles.itemCard}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.rowWrapper}>
          <View style={styles.itemRow}>
            <Calendar color={'purple'} size={22} strokeWidth={2}/>
            <Text style={styles.contentText}>{relativeBorrowedDate}</Text>
          </View>

          <View style={styles.itemRow}>
            <CalendarClock color={'purple'} size={22} strokeWidth={2}/>
            <Text style={[isLate ? styles.returnDateColorNormal : styles.returnDateColorLate, styles.contentText]}>{relativeReturnDate}</Text>
          </View>
        </View>

        <View style={styles.itemRow}>
          <Contact2 color={'purple'} size={22} strokeWidth={2} />
          <Text style={styles.contentText}>{ item.borrower_user_id ?? item.borrower_contact_id ?? 'Undefined User'
            /* W zależności od przyjętej wartości null wybiera odpowiednią osobę (rozwiązanie tymczasowe) */ }
          </Text>
        </View>
    </View>
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