import request from "../base.service";

export const getInstitutionsType = async () => await request.get('education/institutions');