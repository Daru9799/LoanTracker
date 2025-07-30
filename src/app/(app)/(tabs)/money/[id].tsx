import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import ThemedText from '@/src/components/ThemedText'
import { useMoneyLoanDetails, useUpdateMoneyLoanStatus } from '@/src/api/moneyLoans'
import ThemedView from '@/src/components/ThemedView'
import { Appbar, Card, Divider, List, Menu } from 'react-native-paper'
import useThemeColors from '@/src/hooks/useThemeColors'
import { ScrollView } from 'react-native-gesture-handler'
import { Banknote } from 'lucide-react-native'
import { Colors } from '@/src/constants/Colors'
import { useExchangeRateList } from '@/src/api/currencies'
import ExchangeRateModule from '@/src/components/ExchangeRateModule'
import StatusToggleButtons from '@/src/components/StatusToggleButtons'

const MoneyLoanDetails = () => {
  const { id } = useLocalSearchParams()
  const { data: moneyLoan, isLoading, error } = useMoneyLoanDetails(id.toString())
  const { mutate: updateMoneyLoan } = useUpdateMoneyLoanStatus()
  const { data: exchangeRates } = useExchangeRateList(moneyLoan?.currency ?? 'EUR') //CHECK: Czy mozna by to lepiej rozwiązać

  const updateIsReturnedStatus = (is_returned: boolean) => {
    updateMoneyLoan({moneyLoanId: id.toString(), is_returned}, {onSuccess: router.back})
  }

  const { themeColors } = useThemeColors();
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ThemedText>Failed to fetch data!</ThemedText>;
  }

  if(!moneyLoan) {
    return (
      <ThemedView style={styles.container}>
        <Appbar.Header statusBarHeight={0} mode='center-aligned' style={{backgroundColor: themeColors.background}}>
          <Appbar.BackAction onPress={goBack} size={25} />
          <Appbar.Content title="Money Loan not found" titleStyle={styles.titleText}/>
        </Appbar.Header>  
        <Link href={'/money'} style={styles.backToMenu}><ThemedText>Go back to main site</ThemedText></Link>
      </ThemedView>
    )
  }  

  return (
    <ThemedView style={styles.container}> 
      <ScrollView>

        <Appbar.Header statusBarHeight={0} mode='center-aligned' style={{backgroundColor: themeColors.background}}>
          <Appbar.BackAction onPress={goBack} size={25} />
          <Appbar.Content title={`${moneyLoan?.title}`} titleStyle={styles.titleText}/>
          {/* <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                size={24}
                onPress={openMenu}
              />
            }
            anchorPosition="bottom"
          >
            <Menu.Item onPress={onRemovePress} title="Remove" disabled={isPending}/>
          </Menu> */}
        </Appbar.Header>




        <View style={{ alignItems: 'center', marginVertical: 6 }}>
          <Banknote size={100} color={Colors.light.greenColor}/>
        </View>
        <List.Section style={styles.infoContainer}>
          {moneyLoan?.description &&
            <List.Item 
              title={`${moneyLoan?.description}`}
                titleStyle={{ flexWrap: 'wrap' }}
                titleNumberOfLines={6}
                titleEllipsizeMode="tail"
              left={() => <List.Icon icon="text-box-outline" />} 
            />
          }
          <List.Item
            title={`${moneyLoan.borrower_username ?? moneyLoan.borrower_contact_name ?? 'Undefined User'}`}
            left={() => <List.Icon icon="account-outline" />}
          />
          <List.Item
            title={`${moneyLoan?.amount} (${moneyLoan?.currency})`}
            left={() => <List.Icon icon="cash-multiple" />}
          />
          <List.Item
            title={`${(moneyLoan.interest_rate * 100).toFixed(2)}%`}
            left={() => <List.Icon icon="percent" />}
          />
          <List.Item
            title={`${moneyLoan?.borrowed_at}`}
            left={() => <List.Icon icon="calendar-arrow-right" />}
          />
          <List.Item
            title={`${moneyLoan?.return_at || "TBD"}`}
            left={() => <List.Icon icon="calendar-arrow-left" />}
          />
        </List.Section>

        {!moneyLoan.is_returned && <StatusToggleButtons 
          initialStatus={moneyLoan?.is_returned ?? false} 
          onStatusChange={(newStatus) => {
            updateIsReturnedStatus(newStatus)
          }} 
          disabled={false} //TODO: Przy usuwaniu ustawić disabled gdy isPending
          /> }

        {exchangeRates && <ExchangeRateModule 
            accordionTitle='Exchange Rate (without interest rate)' 
            exchangeRates={exchangeRates} 
            amount={moneyLoan.amount} 
          />}
          
        {exchangeRates && moneyLoan.interest_rate !== 0 && <ExchangeRateModule 
            accordionTitle={`Exchange Rate (with interest rate = ${(moneyLoan.interest_rate * 100).toFixed(2)}%`}
            exchangeRates={exchangeRates}
            amount={moneyLoan.amount}
            interestRate={moneyLoan.interest_rate}
          />}
      </ScrollView>
    </ThemedView>
  )
}

export default MoneyLoanDetails

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    titleText: {
      fontSize: 20,
    },
    backToMenu: {
      alignSelf: 'center',
      fontSize: 18,
      textDecorationLine: 'underline'
    },
    infoContainer : {
      marginHorizontal: 10
    },
})