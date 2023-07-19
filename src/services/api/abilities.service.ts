import request from "../base.service";

export const getAbilities = async () => await request.get('abilities');