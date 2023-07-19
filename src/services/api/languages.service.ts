import request from "../base.service";
import { LanguageApi } from "@/types/LanguageApi";

export const getLanguages = async () => await request.get('education/languages');
export const postLanguage = async (data: LanguageApi) => await request.post('education/languages/save', data);
export const updateLanguageById = async (id: number, data: LanguageApi) => await request.put(`education/languages/update/${id}`, data);
