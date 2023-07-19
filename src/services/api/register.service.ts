import request from "@/services/base.service";
import { Register } from "@/types/Register";

export const register = async (data: Register) => await request.post('signup', data)