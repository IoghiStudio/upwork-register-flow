import request from "../base.service";

export const getIndustries = async () => await request.get('industries');