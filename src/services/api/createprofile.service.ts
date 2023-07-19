import request from "../base.service";
import { UserInfo } from "@/types/UserInfo";

export const getProfile = async () => await request.get('user/info');
export const postProfile = async (data: UserInfo) => await request.post('user/info', data);
export const updateProfile = async (id: string, data: UserInfo) => await request.put(`user/info/${id}`, data);