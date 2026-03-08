import axios from "axios";

export const getAllCourses=()=>axios.get("courses");

export const addCourse=(course)=>axios.post("courses",course);

export const updateCourse=(id,course)=>axios.put(`courses/${id}`,course);

export const deleteCourse=(id)=>axios.delete(`/courses/delete/${id}`);
