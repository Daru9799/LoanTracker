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
import { useTranslation } from 'react-i18next'

const Friends = () => {
  //Modals states
  const [newFriendModalVisible, setNewFriendModalVisible] = useState(false);
  const [warningDialogVisible, setWarningDialogVisible] = useState(false);
  const [deleteModalvisible, setDeleteModalVisible] = useState(false);
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);

  //Friends states
  const [name, setName] = useState('');
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);
  const [invitationError, setInvitationError] = useState('');

  //Session
  const { session } = useAuth();

  //Api data
  const { mutate: createPendingRelation, error } = useSendFriendRequest();
  const { data: friends } = useFriendsList();
  const { mutate: deleteFriend } = useDeleteRelation();

  //Translations
  const { t } = useTranslation(['friends', 'common']);

  const onAddFriend = () => {
    createPendingRelation(name, {
      onError: (error) => {
        if (error instanceof Error) {
          setInvitationError(error.message);
          setWarningDialogVisible(true);
        }
      },
      onSuccess: () => {
        setNewFriendModalVisible(false)
        setInfoDialogVisible(true)
      }
    });
  }

  const onDeleteFriend = (relationId: string) => {
    setFriendToDelete(relationId)
    setDeleteModalVisible(true)
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
            <ThemedText style={styles.clearListText}>{t('noFriends')}</ThemedText>
        )}


      <CustomAddIcon onPress={() => setNewFriendModalVisible(true)}/>

      <NewContactModal 
        visible={newFriendModalVisible}
        hideModal={() => setNewFriendModalVisible(false)}
        value={name}
        onChangeText={setName}
        onAddContact={onAddFriend}
        title={t('invitationInfo')}
        buttonText={t('sendInvitation')}
        buttonCancelText={t('common:cancel')}
        placeholderName={t('placeholderName')}
      />
      {error && 
        <CustomWarningDialog visible={warningDialogVisible} title={'Invitation error'} description={invitationError} onDismiss={() => setWarningDialogVisible(false)} icon={'alert'} iconColor={'#FF2C2C'}/>      
      }

      <CustomWarningDialog visible={infoDialogVisible} title={'Success'} description="User received your invintation!" onDismiss={() => setInfoDialogVisible(false)} icon={'check-circle'} iconColor={'#28a745'}/>

      <CustomDecisionModal
        visible={deleteModalvisible}
        modalText={t('deleteInfo')} //check
        actionButtonText={t('delete')}
        cancelButtonText={t('common:cancel')}
        onDismiss={() => setDeleteModalVisible(false)} 
        onActionButtonPress={() => {
          if(friendToDelete !== null) {
            deleteFriend(friendToDelete)
            setDeleteModalVisible(false)
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
      marginTop: 7
  }
})