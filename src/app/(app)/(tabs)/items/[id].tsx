import { StyleSheet, useColorScheme, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import ThemedView from '@/src/components/ThemedView'
import { Appbar, Divider, List, Menu, SegmentedButtons, Snackbar } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/src/constants/Colors'
import ThemedText from '@/src/components/ThemedText'
import { useDeleteItem, useItemDetails, useUpdateItemStatus } from '@/src/api/items'
import RemoteImage from '@/src/components/RemoteImage'

const ItemDetails = () => {
  const { id } = useLocalSearchParams()
  const { data: item, isLoading, error } = useItemDetails(id.toString());
  const { mutate: updateItem } = useUpdateItemStatus();
  const { mutate: deleteItem, isPending } = useDeleteItem();

  const router = useRouter()

  const [menuVisible, setMenuVisible] = useState(false)
  const [status, setStatus] = useState(item?.is_returned)

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const updateIsReturnedStatus = (is_returned: boolean) => {
    updateItem({itemId: id.toString(), is_returned}, {onSuccess: router.back})
  }

  const deleteItemFromList = () => {
    deleteItem({itemId: id.toString()}, {onSuccess: () => {
      console.log("✅ onSuccess fired from deleteItem");
      router.back();
    }
  })
  }
  
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(`Status itemu ${item?.title} został zmieniony na ${status}`)
    if(status != undefined) updateIsReturnedStatus(status)
  }, [status]);

  const goBack = () => {
    router.back()
  }

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const onRemovePress = () => {
    console.log('Remove clicked!')
    closeMenu()
    deleteItemFromList()
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch data!</ThemedText>;
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
            <Menu.Item onPress={onRemovePress} title="Remove" disabled={isPending}/>
          </Menu>
        </Appbar.Header>

        {item?.image_url &&
          <RemoteImage
            path={item?.image_url}
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
            title={`${item?.borrowed_at}`}
            left={() => <List.Icon icon="calendar-arrow-right" />}
          />
          <List.Item
            title={`${item?.return_at || "TBD"}`}
            left={() => <List.Icon icon="calendar-arrow-left" />}
          />
          <List.Item
            title={`${item?.category_name}`}
            left={() => <List.Icon icon="shape-outline" />}
          />
        </List.Section>
        
        {!item.is_returned &&
        <SegmentedButtons
          value={status ? 'true' : 'false'}
          onValueChange={(value) => setStatus(value === 'true')}
          buttons={[
            {
              value: 'false',
              label: 'Not Returned',
              disabled: isPending
            },
            {
              value: 'true',
              label: 'Returned',
              disabled: isPending
            },
          ]}
        /> }
        </ScrollView>
        {isPending &&
        <Snackbar
          visible={isPending}
          onDismiss={() => {}}>
          Deleting item... Please wait!
        </Snackbar>
        }


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