import request from "../base.service";
import { ExperienceApi } from "@/types/ExperienceApi";

export const getExperiences = async () => await request.get('professional/experience');
export const getExperienceById = async (id: string) => await request.get(`professional/experience/one/${id}`);
export const postExperience = async (data: ExperienceApi) => await request.post('professional/experience/save', data);
export const updateExperienceById = async (id: string, data: ExperienceApi) => await request.put(`professional/experience/update/${id}`, data);
export const deleteExperienceById = async (id: string) => await request.delete(`professional/experience/delete/${id}`);