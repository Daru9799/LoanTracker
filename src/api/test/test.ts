import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

type Test = {
    id: number;
    created_at: Date;
    name: string;
}

export const useTestList = () => {
  return useQuery<Test[]>({
    queryKey: ['test_data'],
    queryFn: async () => {
      const { data, error } = await supabase.from('test_table').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};