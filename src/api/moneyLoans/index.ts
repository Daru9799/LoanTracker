import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { MoneyLoan } from "@/src/types/money_loan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type useMoneyLoansListProps = {
  isArchived?: boolean
  sortAscending?: boolean
}

export const useMoneyLoansList = ({isArchived, sortAscending = false}: useMoneyLoansListProps = {} ) => {
  const { session } = useAuth();
  const id = session?.user.id;
  
  return useQuery<MoneyLoan[]>({
    queryKey: ['user_loans', isArchived],
    queryFn: async () => {

      let query = supabase.from('money_loans')
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
      console.log(`USER ${id} LOANS:`);
      console.log(data);
      return data.map(item => ({
        ...item,
        borrower_username: item.profiles?.username ?? null,
        borrower_contact_name: item.contacts?.name ?? null,
      }));
    },
  });
};

export const useMoneyLoanDetails = (loanId: string) => {
  return useQuery<MoneyLoan>({
    queryKey: ['user_loans', loanId],
    queryFn: async () => {
      const { data, error } = await supabase.from('money_loans').select('*, profiles:borrower_user_id (username), contacts: borrower_contact_id (name)').eq('id', loanId).single();
      if (error) {
        throw new Error(error.message);
      }
      console.log("MONEY LOAN DETAILS:");
      console.log(data);
      return {
        ...data,
        borrower_username: data.profiles?.username ?? null,
        borrower_contact_name: data.contacts?.name ?? null,
        category_name: data.categories?.name ?? null,
      };
    },
  });
};

type useUpdateMoneyLoanStatusProps = {
  moneyLoanId: string;
  is_returned: boolean;
}

export const useUpdateMoneyLoanStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({moneyLoanId, is_returned} : useUpdateMoneyLoanStatusProps) => {
      const { data: updatedItem, error } = await supabase.from('money_loans').update(
        {'is_returned': is_returned}
      )
      .eq('id', moneyLoanId)
      .select()
      .single()
      if(error) {
          throw new Error(error.message)
      }
      return updatedItem     
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user_loans']})
    }
  })
}