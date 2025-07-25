import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Item } from '@/src/types/item';
import { useAuth } from '@/src/providers/AuthProvider';

type useItemListProps = {
  isArchived?: boolean
  sortAscending?: boolean
}

export const useItemList = ({isArchived, sortAscending = false}: useItemListProps = {} ) => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<Item[]>({
    queryKey: ['user_items', isArchived],
    queryFn: async () => {

      let query = supabase.from('items')
        .select('*, profiles:borrower_user_id (username), contacts: borrower_contact_id (name)')
        .eq('owner_id', id);

      if (isArchived !== undefined) {
        query = query.eq('is_returned', isArchived);
      }

      if(sortAscending !== undefined) {
        query = query.order('return_at', {ascending: sortAscending} )
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }
      console.log(`USER ${id} ITEMS:`);
      console.log(data);
      return data.map(item => ({
        ...item, 
        borrower_username: item.profiles?.username ?? null,
        borrower_contact_name: item.contacts?.name ?? null,
      }));
    },
  });
};

export const useItemDetails = (itemId: string) => {
  return useQuery<Item>({
    queryKey: ['user_items', itemId],
    queryFn: async () => {
      const { data, error } = await supabase.from('items').select('*, profiles:borrower_user_id (username), categories:category_id (name)').eq('id', itemId).single();
      if (error) {
        throw new Error(error.message);
      }
      console.log("ITEM DETAILS:");
      console.log(data);
      return {
        ...data,
        borrower_username: data.profiles?.username ?? null,
        category_name: data.categories?.name ?? null,
      };
    },
  });
};

type useUpdateItemStatusProps = {
  itemId: string;
  is_returned: boolean;
}

export const useUpdateItemStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({itemId, is_returned} : useUpdateItemStatusProps) => {
      const { data: updatedItem, error } = await supabase.from('items').update(
        {'is_returned': is_returned}
      )
      .eq('id', itemId)
      .select()
      .single()
      if(error) {
          throw new Error(error.message)
      }
      return updatedItem     
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_items']})
    }
  })
}

type DeleteItemProps = {
  itemId: string;
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({itemId} : DeleteItemProps) => {
      const { error } = await supabase.from('items')
      .delete()
      .eq('id', itemId)

      if(error) {
          throw new Error(error.message)
      }     
      return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_items']})
    }
  })
}

type useCreateItemProps = {
  itemTitle: string;
  itemQuantity: number;
  itemBorrowedDate: Date;
  itemCategoryId: string;
  itemDescription : string | null;
  itemReturnDate: Date | null;
  itemImageUrl: string | null;
  borrowerContactId: string | null;
  borrowerUserId: string | null;
}

export const useCreateItem = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({itemTitle, itemQuantity, itemBorrowedDate, itemCategoryId, itemDescription, itemReturnDate, itemImageUrl, borrowerContactId, borrowerUserId} : useCreateItemProps) => {
      const { error } = await supabase.from('items')
      .insert({
        'title': itemTitle,
        'quantity': itemQuantity,
        'borrowed_at': itemBorrowedDate,
        'category_id': itemCategoryId,
        'owner_id': id,
        'description' : itemDescription,
        'return_at': itemReturnDate,
        'image_url': itemImageUrl,
        'borrower_contact_id' : borrowerContactId,
        'borrower_user_id' : borrowerUserId
      })

      if(error) {
          throw new Error(error.message)
      }   
      return { success: true };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_items']})
    }
  })
}