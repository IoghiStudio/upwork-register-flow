export interface ExperienceApi {
  from_date: Date
  to_date?: Date | null;
  still_working: boolean;
  company: string;
  industry: string;
  department: string;
  position: string;
  job_description: string;
  net_salary: number;
  currency: string;
  abilities: string[];
  user_id: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
}
