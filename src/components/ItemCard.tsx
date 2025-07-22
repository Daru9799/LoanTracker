import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Item } from '../types/item'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CalendarClock, Calendar, Contact2 } from 'lucide-react-native';
import { checkIsLate } from '../functions';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import ThemedText from './ThemedText';
import { Colors } from '../constants/Colors';

dayjs.extend(relativeTime)

type ItemCardProps = {
    item: Item;
    archived?: boolean;
}

const ItemCard = ({item, archived=false} : ItemCardProps) => {
  const [isLate, setIsLate] = useState(false)
  //Konwersja dat
  const isBorrowedToday = dayjs().isSame(item.borrowed_at, 'day');
  const relativeBorrowedDate = isBorrowedToday ? 'Today' : dayjs().to(item.borrowed_at);
  const relativeReturnDate = item.return_at ? dayjs().to(item.return_at) : 'TBD';

  //Kolorki
  const colorScheme = useColorScheme();
  const cardBackground = colorScheme === 'dark' ? '#1E1E1E' : '#F7F7F7';
  const themeColors = Colors[colorScheme ?? 'light'];
  const normalTextColor = themeColors.text;

  useEffect(() => {
    setIsLate(checkIsLate(item.return_at, item.is_returned));
  }, []);

  return (
    <Link href={{ pathname: '/(tabs)/items/[id]', params: { id: String(item.id) } }}>
      <View style={[styles.itemCard, {backgroundColor: cardBackground}]}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <View style={styles.rowWrapper}>
            <View style={styles.itemRow}>
              <Calendar color={Colors.light.buttonColor} size={22} strokeWidth={2}/>
              <ThemedText style={styles.contentText}>{relativeBorrowedDate}</ThemedText>
            </View>

            {!archived ? (
              <View style={styles.itemRow}>
                <CalendarClock color={Colors.light.buttonColor} size={22} strokeWidth={2}/>
                <ThemedText style={[isLate ? {color: normalTextColor} : styles.returnDateColorLate, styles.contentText]}>{relativeReturnDate}</ThemedText>
              </View>
            ) : (
              <View style={styles.itemRow}></View>
            )}

          </View>

          <View style={styles.itemRow}>
            <Contact2 color={Colors.light.buttonColor} size={22} strokeWidth={2} />
            <ThemedText style={styles.contentText}>{ item.borrower_username ?? item.borrower_contact_name ?? 'Undefined User'
              /* W zależności od przyjętej wartości null wybiera odpowiednią osobę */ }
            </ThemedText>
          </View>
      </View>
    </Link>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  itemCard: {
    padding: 10,
    borderRadius: 10,
    width: '100%'
  },
  title: {
    marginBottom: 5,
    fontSize: 17
  },
  contentText: {
    fontSize: 15
  },
  returnDateColorLate: {
    color: '#DC143C',
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