import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper';
import { useContactList } from '../api/contacts';
import ContactCard from './ContactCard';
import ThemedText from './ThemedText';
import { useFriendsList } from '../api/relations';
import UserCard from './UserCard';
import { useAuth } from '../providers/AuthProvider';

type UserType = 'friend' | 'contact';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (id: string, type: UserType) => void;
};

const UserPickerModal = ({ visible, onDismiss, onSelect }: Props) => {
  const { session } = useAuth()
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //API data
  const { data: contacts, isLoading, error } = useContactList();

  const { data: friends } = useFriendsList();

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

  //Odznaczenie usera przy zmianie typu lub po prostu wyjsciu z listy
  useEffect(() => {
    setSelectedId(null)
  }, [step]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={resetModal}>
        <Dialog.Title>
          {step === 1 ? 'Choose user type' : 'Choose user'}
        </Dialog.Title>
        <Dialog.Content>
          {step === 1 ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button mode="contained" onPress={() => { setUserType('friend'); setStep(2); }}>
                Friend
              </Button>
              <Button mode="contained" onPress={() => { setUserType('contact'); setStep(2); }}>
                Local Contact
              </Button>
            </View>
          ) : (
            <View>
                {userType === 'contact' &&
                    <FlatList 
                        data={contacts}
                        renderItem={({item}) => <ContactCard
                            contact={item}       
                            onPress={() => setSelectedId(item.id)}
                            isSelected={item.id === selectedId}
                        />}
                        contentContainerStyle={{gap: 10, padding: 10}}
                        style={styles.contactList}
                    />
                }
                {userType === 'friend' &&
                    <FlatList 
                        data={friends}
                        renderItem={({item}) => <UserCard
                            username={item.sender_id === session?.user.id ? item.receiver_username : item.sender_username}       
                            onPress={() => setSelectedId(item.sender_id === session?.user.id ? item.receiver_id : item.sender_id)}
                            isSelected={(item.sender_id === session?.user.id ? item.receiver_id : item.sender_id) === selectedId}
                        />}
                        contentContainerStyle={{gap: 10, padding: 10}}
                        style={styles.contactList}
                    />
                }                
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          {step === 2 && <Button onPress={() => setStep(1)}>Go Back</Button>}
          {step === 2 && (
            <Button disabled={!selectedId} onPress={handleConfirm}>
              Accept
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