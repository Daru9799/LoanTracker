import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null);
  const [loadingContacts, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        //Odfiltrowanie kontaktów z taką samą nazwą (usunięcie duplikatów)
        const uniqueContacts = (data ?? []).filter(
          (contact, index, self) =>
            contact.name && self.findIndex(c => c.name === contact.name) === index
        );

        setContacts(uniqueContacts);
      } else {
        setPermissionGranted(false);
        setContacts([]);
      }

      setLoading(false);
    };

    loadContacts();
  }, []);

  return {
    contacts,
    loadingContacts,
    permissionGranted,
  };
};