import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Contact } from "@/src/types/contact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useContactList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<Contact[]>({
    queryKey: ['user_contacts'],
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

export const useContactDetails = (contactId: string | null) => {
  return useQuery<Contact>({
    queryKey: ['user_contacts', contactId],
    queryFn: async () => {

    const { data: contact, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', contactId)
        .single()

      if (error) {
        throw new Error(error.message);
      }
      
      console.log(`Contact info: `);
      console.log(contact);
      return contact
    },
  });
};

export const useCreateContact = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (contactName: string) => {
      const { error } = await supabase.from('contacts')
        .insert({
          'name': contactName,
          'owner_id' : id
        })

      if(error) {
        throw new Error(error.message)
      }   
      return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_contacts']})
    }
  })
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (contactId: string) => {
      const { error } = await supabase.from('contacts')
      .delete()
      .eq('id', contactId)

      if(error) {
          throw new Error(error.message)
      }     
      return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_contacts']})
      await queryClient.invalidateQueries({queryKey: ['user_items']})
    }
  })
};