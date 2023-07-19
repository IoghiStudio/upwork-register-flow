import request from "../base.service";

export const getCountry = async () => await request.get('countries');