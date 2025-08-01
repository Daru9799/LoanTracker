import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper';
import { useContactList } from '../api/contacts';
import ContactCard from './ContactCard';
import { useFriendsList } from '../api/relations';
import UserCard from './UserCard';
import { useAuth } from '../providers/AuthProvider';
import { useTranslation } from 'react-i18next';
import ThemedText from './ThemedText';

type UserType = 'friend' | 'contact';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (id: string, type: UserType) => void;
};

const UserPickerModal = ({ visible, onDismiss, onSelect }: Props) => {
  //UI state – step & selection
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //Session
  const { session } = useAuth()

  //API data
  const { data: contacts, isLoading, error } = useContactList();
  const { data: friends } = useFriendsList();

  //Translations
  const { t } = useTranslation('items');

  const resetModal = () => {
    setStep(1);
    setUserType(null);
    onDismiss();
  };

  const handleConfirm = () => {
    if(userType !== null && selectedId !== null) {
        onSelect(selectedId, userType)
        resetModal();
    }
  };

  //Reset selected user when returning to type selection
  useEffect(() => {
    setSelectedId(null)
  }, [step]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>Failed to fetch test data! {error.message}</ThemedText>;
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={resetModal}>
        <Dialog.Title>
          {step === 1 ? t('friendsForm.chooseUserType') : t('friendsForm.chooseUser')}
        </Dialog.Title>
        <Dialog.Content>
          {step === 1 ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button mode="contained" onPress={() => { setUserType('friend'); setStep(2); }}>
                {t('friendsForm.friend')}
              </Button>
              <Button mode="contained" onPress={() => { setUserType('contact'); setStep(2); }}>
                {t('friendsForm.localContact')}
              </Button>
            </View>
          ) : (
            <View>
              {/* Contacts */}
              {userType === 'contact' && (
                contacts && contacts.length > 0 ? (
                  <FlatList 
                    data={contacts}
                    renderItem={({ item }) => (
                      <ContactCard
                        contact={item}
                        onPress={() => setSelectedId(item.id)}
                        isSelected={item.id === selectedId}
                      />
                    )}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                    style={styles.contactList}
                  />
                ) : (
                  <ThemedText>{t('friendsForm.noContacts')}</ThemedText>
                )
              )}

              {/* Friends */}
              {userType === 'friend' && (
                friends && friends.length > 0 ? (
                  <FlatList 
                    data={friends}
                    renderItem={({ item }) => (
                      <UserCard
                        username={item.sender_id === session?.user.id
                          ? item.receiver_username
                          : item.sender_username}
                        onPress={() =>
                          setSelectedId(
                            item.sender_id === session?.user.id
                              ? item.receiver_id
                              : item.sender_id
                          )
                        }
                        isSelected={
                          (item.sender_id === session?.user.id
                            ? item.receiver_id
                            : item.sender_id) === selectedId
                        }
                      />
                    )}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                    style={styles.contactList}
                  />
                ) : (
                  <ThemedText>{t('friendsForm.noFriends')}</ThemedText>
                )
              )}
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          {step === 2 && <Button onPress={() => setStep(1)}>{t('friendsForm.goBack')}</Button>}
          {step === 2 && (
            <Button disabled={!selectedId} onPress={handleConfirm}>
              {t('friendsForm.accept')}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default UserPickerModal

const styles = StyleSheet.create({
    contactList: {
        maxHeight: 500
    }
})