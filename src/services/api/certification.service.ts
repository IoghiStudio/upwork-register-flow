import request from "../base.service";
import { CertificationApi } from "@/types/CertificationApi";

export const getCertifications = async () => await request.get('education/certifications');
export const getCertificationById = async (id:  string) => await request.get(`education/certifications/one/${id}`);
export const postCertification = async (data: CertificationApi) => await request.post('education/certifications/save', data);
export const updateCertificationById = async (id: string, data: CertificationApi) => await request.put(`education/certifications/update/${id}`, data);
export const deleteCertificationById = async (id: string) => await request.delete(`education/certifications/delete/${id}`);
