import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { MoneyLoan } from '../types/money_loan'
import ThemedText from './ThemedText';
import { Link } from 'expo-router';
import { Banknote, Calendar, CalendarClock, Contact2 } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import useThemeColors from '../hooks/useThemeColors';
import dayjs from 'dayjs';

type MoneyLoanCardProps = {
    moneyLoan: MoneyLoan;
    archived?: boolean;
}

const MoneyLoanCard = ({moneyLoan, archived=false} : MoneyLoanCardProps) => {
  const [isLate, setIsLate] = useState(false)
  //Konwersja dat
  const isBorrowedToday = dayjs().isSame(moneyLoan.borrowed_at, 'day');
  const relativeBorrowedDate = isBorrowedToday ? 'Today' : dayjs().to(moneyLoan.borrowed_at);
  const relativeReturnDate = moneyLoan.return_at ? dayjs().to(moneyLoan.return_at) : 'TBD';


  const { cardBackground, normalTextColor } = useThemeColors();

  return (
    <Link href={{ pathname: '/money/[id]', params: { id: String(moneyLoan.id) } }}>
        <View style={[styles.itemCard, {backgroundColor: cardBackground}]}>
            <ThemedText style={styles.title}>{moneyLoan.title}</ThemedText>
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

            <View style={styles.rowWrapper}>
                <View style={styles.itemRow}>
                    <Banknote color={Colors.light.greenColor} size={22} strokeWidth={2} />
                    <ThemedText style={styles.contentText}>
                        {moneyLoan.amount.toFixed(2)} {moneyLoan.currency}
                    </ThemedText>
                </View>
                <View style={styles.itemRow}>
                    <Contact2 color={Colors.light.buttonColor} size={22} strokeWidth={2} />
                    <ThemedText style={styles.contentText}>{ moneyLoan.borrower_username ?? moneyLoan.borrower_contact_name ?? 'Undefined User'
                    /* W zależności od przyjętej wartości null wybiera odpowiednią osobę */ }
                    </ThemedText>
                </View>
            </View>
        </View>
    </Link>
  )
}

export default MoneyLoanCard

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