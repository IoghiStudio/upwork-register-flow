import request from "../base.service";

export const getCurrencies = async () => await request.get('currencies');