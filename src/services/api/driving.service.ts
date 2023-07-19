import request from "../base.service";
import { DrivingPermitApi } from "@/types/DrivingPermitApi";

export const getDrivingPermits = async () => await request.get('education/permit');
export const postDrivingPermit = async (data: DrivingPermitApi) => await request.post('education/permit/save', data);
export const updateDrvingPermitById = async (id: number, data: DrivingPermitApi) => await request.put(`education/permit/update/:${id}`, data);
