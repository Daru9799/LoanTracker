import { FlatList, StyleSheet,View } from 'react-native'
import React, { useState } from 'react'
import ThemedText from '@/src/components/ThemedText'
import CustomAddIcon from '@/src/components/CustomAddIcon'
import NewContactModal from '@/src/components/NewContactModal'
import { useDeleteRelation, useFriendsList, useSendFriendRequest } from '@/src/api/relations'
import CustomWarningDialog from '@/src/components/CustomWarningDialog'
import { useAuth } from '@/src/providers/AuthProvider'
import UserCard from '@/src/components/UserCard'
import { Colors } from '@/src/constants/Colors'
import CustomDecisionModal from '@/src/components/CustomDecisionModal'

const Friends = () => {
  const { session } = useAuth()
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [invitationError, setInvitationError] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false);

  const { mutate: createPendingRelation, error } = useSendFriendRequest()
  const { data: friends } = useFriendsList()
  const { mutate: deleteFriend } = useDeleteRelation()

  const [deleteModalvisible, setDeleteModalVisible] = useState(false);
  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  const [infoDialogVisible, setInfoDialogVisible] = useState(false);
  const showInfoDialog = () => setInfoDialogVisible(true);
  const hideInfoDialog = () => setInfoDialogVisible(false);

  const hideWarningDialog = () => setDialogVisible(false);

  const onAddFriend = () => {
    createPendingRelation(name, {
      onError: (error) => {
        if (error instanceof Error) {
          setInvitationError(error.message);
          setDialogVisible(true);
        }
      },
      onSuccess: () => {
        hideModal()
        showInfoDialog()
      }
    });
  }

  const onDeleteFriend = (relationId: string) => {
    setFriendToDelete(relationId)
    console.log("Do usuniecia zostal wybrany: " + relationId)
    showDeleteModal()
  }
  
  return (
    <View style={styles.container}>
        {(friends && friends?.length > 0) ? (
            <FlatList
                data={friends}
                renderItem={({item}) => <UserCard username={item.sender_id === session?.user.id ? item.receiver_username : item.sender_username} iconColor={Colors.light.purpleColor} onDeclineIconPress={() => onDeleteFriend(item.id)} />}
                contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 80}}
            />
        ) : (
            <ThemedText style={styles.clearListText}>You dont have any friends!</ThemedText>
        )}


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
        <CustomWarningDialog visible={dialogVisible} title={'Invitation error'} description={invitationError} onDismiss={hideWarningDialog} icon={'alert'} iconColor={'#FF2C2C'}/>      
      }

      <CustomWarningDialog visible={infoDialogVisible} title={'Success'} description="User received your invintation!" onDismiss={hideInfoDialog} icon={'check-circle'} iconColor={'#28a745'}/>


      <CustomDecisionModal 
        visible={deleteModalvisible} 
        modalText={'Are you sure you want to delete this friend? This will also delete all items linked to this user.'} //check
        actionButtonText={'Delete'} 
        onDismiss={hideDeleteModal} 
        onActionButtonPress={() => {
          if(friendToDelete !== null) {
            deleteFriend(friendToDelete)
            hideDeleteModal()
          }
        }}
      />       
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
  clearListText: {
      textAlign: 'center',
      marginTop: 5
  }
})