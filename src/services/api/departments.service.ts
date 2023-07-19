import request from "../base.service";

export const getDepartments = async () => await request.get('departments');