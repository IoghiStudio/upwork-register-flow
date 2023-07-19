export interface CourseApi {
  start_date: Date;
  end_date: Date;
  institution: string;
  user_id: string;
  description: string;
  updated_at?: string;
  created_at?: string;
  id?: string;
}