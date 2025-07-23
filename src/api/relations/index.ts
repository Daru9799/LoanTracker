import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Relation } from "@/src/types/relation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSendFriendRequest = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  //const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (username: string) => {
        //Dodanie relacji pending
        const { error } = await supabase.rpc('handle_new_friend_request', {
            new_receiver_username: username, 
            new_sender_id: id
        })

        if(error) {
            throw new Error(error.message)
        }   
        return { success: true };
    },
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({queryKey: ['user_contacts']})
    // }
  })
}

export const useFriendInvitationsList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<Relation[]>({
    queryKey: ['user_invitations'],
    queryFn: async () => {

    const { data: invitations, error } = await supabase
        .from('relations')
        .select('*, profiles:sender_id (username)')
        .eq('receiver_id', id);

      if (error) {
        throw new Error(error.message);
      }
      
      console.log(`USER ${id} Invitations:`);
      console.log(invitations);
      return invitations.map(rel => ({
        ...rel, 
        sender_username: rel.profiles?.username ?? null,
      }));
    },
  });
};