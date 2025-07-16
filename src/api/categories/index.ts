import { supabase } from "@/src/lib/supabase"
import { Categories } from "@/src/types/categories"
import { useQuery } from "@tanstack/react-query"

export const useCategoriesList = () => {
    return useQuery<Categories[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data: categories, error } = await supabase
            .from('categories')
            .select('*')
            if (error) {
                throw new Error(error.message);
            }
            //Zwracanie z sortowanie takim aby other zawsze było na końcu
            return categories.sort((a, b) => {
                if (a.name.toLowerCase() === 'other') return 1;
                if (b.name.toLowerCase() === 'other') return -1;
                return 0;
            });
        }
    })
}