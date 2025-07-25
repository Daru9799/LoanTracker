import { supabase } from "@/src/lib/supabase";
import { Profiles } from "@/src/types/profiles";
import { useQuery } from "@tanstack/react-query";

export const useFriendDetails = (friendId: string | null) => {
  return useQuery<Profiles>({
    queryKey: ['user_details', friendId],
    queryFn: async () => {

    const { data: friend, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', friendId)
        .single()

      if (error) {
        throw new Error(error.message);
      }
      
      console.log(`Friend info: `);
      console.log(friend);
      return friend
    },
  });
};