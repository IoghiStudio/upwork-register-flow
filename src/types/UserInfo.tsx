export type UserProfileType = "BASIC" | "CANDIDATE";
export type JobType = "ALL_TYPES" | "FULL_TIME" | "PART_TIME" | "INTERSHIP_VOLUNTEERING" | "PROJECT_SEASONAL";

export interface UserInfo {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    nationality?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    email?: string;
    job_type?: JobType;
    relocation?: string;
    departments?: string;
    industry?: string;
    salary?: number;
    currency?: string;
    user_id: string;
    profile_type?: UserProfileType;
}