import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Relation } from "@/src/types/relation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSendFriendRequest = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (username: string) => {
        const { error } = await supabase.rpc('handle_new_friend_request', {
            new_receiver_username: username, 
            new_sender_id: id
        })

        if(error) {
            throw new Error(error.message)
        }   
        return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_pending']})
    }
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
        .eq('receiver_id', id)
        .eq('status', 'pending');

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

export const usePendingList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<Relation[]>({
    queryKey: ['user_pending'],
    queryFn: async () => {

    const { data: invitations, error } = await supabase
        .from('relations')
        .select('*, profiles:receiver_id (username)')
        .eq('sender_id', id)
        .eq('status', 'pending'); 

      if (error) {
        throw new Error(error.message);
      }
      
      console.log(`USER ${id} Pendings:`);
      console.log(invitations);
      return invitations.map(rel => ({
        ...rel, 
        receiver_username: rel.profiles?.username ?? null,
      }));
    },
  });
};

export const useFriendsList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<Relation[]>({
    queryKey: ['user_friends'],
    queryFn: async () => {

    const { data: invitations, error } = await supabase
        .from('relations')
        .select('*, sender:sender_id (username), receiver:receiver_id (username)')
        .or(`sender_id.eq.${id}, receiver_id.eq.${id}`)
        .eq('status', 'friends');

      if (error) {
        throw new Error(error.message);
      }
      
      console.log(`USER ${id} Friends:`);
      console.log(invitations);
      return invitations.map(rel => ({
        ...rel,
        sender_username: rel.sender?.username ?? null,
        receiver_username: rel.receiver?.username ?? null
      }));
    },
  });
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (relation_id: string) => {
        //Dodanie relacji pending
        const { error } = await supabase.from('relations')
          .update( {'status': "friends"} )
          .eq('id', relation_id)
          .select()
          .single()

        if(error) {
            throw new Error(error.message)
        }   
        return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_friends']})
      await queryClient.invalidateQueries({queryKey: ['user_invitations']})
    }
  })
}

export const useDeleteRelation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (relation_id: string) => {
      const { error } = await supabase.from('relations')
      .delete()
      .eq('id', relation_id)

      if(error) {
          throw new Error(error.message)
      }     
      return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_friends']})
      await queryClient.invalidateQueries({queryKey: ['user_invitations']})
    }
  })
}