import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Item } from '@/src/types/item';
import { useAuth } from '@/src/providers/AuthProvider';

export const useItemList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery<Item[]>({
    queryKey: ['user_items'],
    queryFn: async () => {
      const { data, error } = await supabase.from('items').select('*').eq('owner_id', id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};