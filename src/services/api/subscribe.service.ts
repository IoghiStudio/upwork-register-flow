import request from "@/services/base.service";

export const subscribe = async (data: any) => await request.post('sendingblue/contacts/create', data)