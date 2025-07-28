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

        setContacts(data ?? []);
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