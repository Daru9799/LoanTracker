import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Contact } from "@/src/types/contact";
import { useQuery } from "@tanstack/react-query";

export const useContactList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<Contact[]>({
    queryKey: ['user_contact'],
    queryFn: async () => {

    const { data: contacts, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('owner_id', id);

      if (error) {
        throw new Error(error.message);
      }
      
      console.log(`USER ${id} CONTACTS:`);
      console.log(contacts);
      return contacts
    },
  });
};