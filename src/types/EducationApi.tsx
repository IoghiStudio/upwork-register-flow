export interface EducationApi {
  from_date: Date;
  to_date?: Date | null;
  in_progress: boolean;
  institution_type: string;
  institution_name: string;
  profile: string;
  city: string;
  user_id: string;
  country: string;
  observations: string;
  updated_at?: string;
  created_at?: string;
  id?: string;
}