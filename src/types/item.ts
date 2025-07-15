export interface Item {
  id: string;
  owner_id: string;
  borrower_user_id?: string;
  borrower_contact_id?: string;
  title: string;
  image_url?: string;
  quantity: number;
  category_id: string;
  description?: string; 
  borrowed_at: Date;
  return_at?: Date;
  is_returned: boolean;
}