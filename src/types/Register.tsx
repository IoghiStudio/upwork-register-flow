export interface Register {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  password_confirmation: string;
  name?: string;
  country: string;
  phone_number: string;
  vat?: string;
}