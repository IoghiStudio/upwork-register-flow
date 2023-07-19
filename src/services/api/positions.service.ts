import request from "../base.service";

export const getPositions = async () => await request.get('job_titles');