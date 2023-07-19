import request from "../base.service";
import { CourseApi } from "@/types/CourseApi";

export const getCourses = async () => await request.get('education/courses');
export const getCourseById = async (id: string) => await request.get(`education/courses/one/${id}`);
export const postCourse = async (data: CourseApi) => await request.post('education/courses/save', data);
export const updateCourseById = async (id: string, data: CourseApi) => await request.put(`education/courses/update/${id}`, data);
export const deleteCourseById = async (id: string) => await request.delete(`education/courses/delete/${id}`)