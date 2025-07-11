import { StyleSheet, Image, useColorScheme } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { mockItems } from '@/assets/data/mockItems'
import ThemedView from '@/src/components/ThemedView'
import { Appbar, Divider, List, Menu, SegmentedButtons } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/src/constants/Colors'
import ThemedText from '@/src/components/ThemedText'

const ItemDetails = () => {
  const { id } = useLocalSearchParams()
  const item = mockItems.find((item) => item.id == id)
  const [menuVisible, setMenuVisible] = useState(false)
  const [status, setStatus] = useState(item?.is_returned)

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  
  const router = useRouter()

  //TO jeszcze przetestowac (rozwiazanie tymczasowe)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(`Status itemu ${item?.title} został zmieniony na ${status}`)
  }, [status]);

  const goBack = () => {
    router.back()
  }

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const onEditPress = () => {
    console.log('Edit clicked!')
    closeMenu()
  }

  const onRemovePress = () => {
    console.log('Remove clicked!')
    closeMenu()
  }

  if(!item) {
    return (
      <ThemedView style={styles.container}>
        <Appbar.Header statusBarHeight={0} mode='center-aligned' style={{backgroundColor: themeColors.background}}>
          <Appbar.BackAction onPress={goBack} size={25} />
          <Appbar.Content title="Item not found" titleStyle={styles.titleText}/>
        </Appbar.Header>  
        <Link href={'/items'} style={styles.backToMenu}><ThemedText>Go back to main site</ThemedText></Link>
      </ThemedView>
    )
  }


  return (
    <ThemedView style={styles.container}>
      <ScrollView> 
        <Appbar.Header statusBarHeight={0} mode='center-aligned' style={{backgroundColor: themeColors.background}}>
          <Appbar.BackAction onPress={goBack} size={25} />
          <Appbar.Content title={`${item?.title}`} titleStyle={styles.titleText}/>
          <Menu
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
            <Menu.Item onPress={onEditPress} title="Edit" />
            <Divider />
            <Menu.Item onPress={onRemovePress} title="Remove" />
          </Menu>
        </Appbar.Header>

        {item?.image_url &&
          <Image
            source={{uri: `${item?.image_url}`}}
            style={styles.image}
          />
        }

        <List.Section style={styles.infoContainer}>
          {item?.description &&
            <List.Item 
              title={`${item?.description}`}
                titleStyle={{ flexWrap: 'wrap' }}
                titleNumberOfLines={6}
                titleEllipsizeMode="tail"
              left={() => <List.Icon icon="text-box-outline" />} 
            />
          }
          <List.Item
            title={`${item?.quantity}`}
            left={() => <List.Icon icon="cube-outline" />}
          />
          <List.Item
            title={`${item?.borrowed_at.toLocaleDateString()}`}
            left={() => <List.Icon icon="calendar-arrow-right" />}
          />
          <List.Item
            title={`${item?.return_at?.toLocaleDateString()}`}
            left={() => <List.Icon icon="calendar-arrow-left" />}
          />
          <List.Item
            title={`${item?.category_id}`}
            left={() => <List.Icon icon="shape-outline" />}
          />
        </List.Section>
        
        <SegmentedButtons
          value={status ? 'true' : 'false'}
          onValueChange={(value) => setStatus(value === 'true')}
          buttons={[
            {
              value: 'false',
              label: 'Not Returned',
            },
            {
              value: 'true',
              label: 'Returned',
            },
          ]}
        />
        </ScrollView>
    </ThemedView>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 16 / 9,
      resizeMode: 'contain',
    },
    infoContainer : {
      marginHorizontal: 10
    },
    titleText: {
      fontSize: 20,
    },
    backToMenu: {
      alignSelf: 'center',
      fontSize: 18,
      textDecorationLine: 'underline'
    }
})