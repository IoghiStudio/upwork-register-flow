import { LevelType } from "@/components/mainPages/RegisterFlowCandidates/Languages";

export interface LanguageApi {
  language: string;
  user_id: string;
  level: LevelType;
  updated_at?: string;
  created_at?: string;
  id?: string;
}