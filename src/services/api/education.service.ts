import request from "../base.service";
import { EducationApi } from "@/types/EducationApi";

export const getEducations = async () => await request.get('education/diplomas');
export const getEducationById = async (id: string) => await request.get(`education/diplomas/one/${id}`);
export const postEducation = async (data: EducationApi) => await request.post('education/diplomas/save', data);
export const updateEducationById = async (id: string, data: EducationApi) => await request.put(`education/diplomas/update/${id}`, data);
export const deleteEducationById = async (id: string) => await request.delete(`education/diplomas/delete/${id}`);