import request from "@/services/base.service";
import { Login } from "@/types/Login";

/**
 *
 * @param data
 */
// TODO:: add routes in constants
export const login = async (data: Login) => await request.post('signin', data);
