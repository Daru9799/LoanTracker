import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ThemedText from '../../components/ThemedText'
import CustomAddIcon from '@/src/components/CustomAddIcon'
import NewContactModal from '@/src/components/NewContactModal'
import { useSendFriendRequest } from '@/src/api/relations'
import CustomWarningDialog from '@/src/components/CustomWarningDialog'

const Friends = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('')
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [invitationError, setInvitationError] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false);

  const { mutate: createPendingRelation, error } = useSendFriendRequest()

  const hideDialog = () => setDialogVisible(false);

  const onAddFriend = () => {
    createPendingRelation(name, {
      onError: (error) => {
        if (error instanceof Error) {
          setInvitationError(error.message);
          setDialogVisible(true);
        }
      }
    });
  }
  
  return (
    <View style={styles.container}>
      <ThemedText>Friends List</ThemedText>
      <CustomAddIcon onPress={showModal}/>

      <NewContactModal 
        visible={visible} 
        hideModal={hideModal} 
        value={name}
        onChangeText={setName}
        onAddContact={onAddFriend}
        title='Provide username of a person that you want to invite.' 
        buttonText='Send invitation'
      />
      {error && 
        <CustomWarningDialog visible={dialogVisible} title={'Invitation error'} description={invitationError} onDismiss={hideDialog} icon={'alert'} iconColor={'#FF2C2C'}/>      
      }

      
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})