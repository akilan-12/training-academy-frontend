import axios from "axios";

export const getAllStudents=()=>axios.get("students");

export const addStudent=(student)=>axios.post("/api/students",student);

export const updateStudent=(id,student)=>axios.put(`students/${id}`,student);

export const deleteStudent=(id)=>axios.delete(`/students/delete/${id}`);
