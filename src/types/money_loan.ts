export interface MoneyLoan {
    id: string;
    title: string;
    description?: string;
    amount: number;
    currency: string;
    interest_rate: number;
    borrowed_at: Date;
    return_at?: Date;
    is_returned: boolean;
    owner_id: string;
    borrower_user_id?: string;
    borrower_contact_id?: string;   
    //Dodatkowe pola
    borrower_username?: string;
    borrower_contact_name? : string;    
}





