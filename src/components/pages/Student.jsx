import React,{useEffect,useState} from "react";
import "./Student.css"
import axiosInstance from "../../services/axiosConfig";

const Student =()=>{

  const[students,setStudents]=useState([]);
  const[trainers,setTrainers]=useState([]);
  const[courses,setCourses]=useState([]);

  const[studentName,setStudentName]=useState("");
  const[qualification,setQualification]=useState("");
  const[trainerId,setTrainerId]=useState("");
  const[courseId,setCourseId]=useState("");

  const[editId,setEditId]=useState(null);

  useEffect(()=>{
    loadStudents();
    loadTrainers();
    loadCourses();
  },[]);

  const loadStudents=async()=>{
    try{
      const res=await axiosInstance.get("/students");
      setStudents(res.data);
    }catch(err){
      console.log("Failed to load students",err);
    }
  };

  const loadTrainers=async()=>{
    try{
      const res=await axiosInstance.get("/trainers");
      setTrainers(res.data);
    }catch(err){
      console.log("Failed to load trainers",err);
    }
  };

  const loadCourses=async()=>{
    try{
      const res=await axiosInstance.get("/courses");
      setCourses(res.data);
    }catch(err){
      console.log("Failed to load courses",err);
    }
  };


  const resetForm=()=>{
    setStudentName("");
    setQualification("");
    setTrainerId("");
    setCourseId("");
    setEditId(null);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const payload={
      studentName,qualification,
      trainerId:trainerId?Number(trainerId):null,
      courseId:courseId?Number(courseId):null,
    };

    try{
      if(editId){
      await axiosInstance.put(`/students/${editId}`,payload)
      alert("Student updated successfully")
    }else{
      await axiosInstance.post("/students",payload)
      alert("Student added successfully");
    }
    loadStudents()
    resetForm()
    }catch(err){
      alert("Operation failed")
      console.log(err);
    }
  };
  

  const handleEdit=(student)=>{
    setEditId(student.studentId);
    setStudentName(student.studentName);
    setQualification(student.qualification);
    setTrainerId(student.trainerId || "");
    setCourseId(student.courseId || "");
  }

  const handleDelete=async(id)=>{
    if(!window.confirm("Delete this student?")) return;

    try{
      await axiosInstance.delete(`/students/${id}`)
      alert("Student deleted successfully");
      loadStudents();
    }catch(err){
      alert("Delete failed");
    }
  };

  return(
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Student Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">

        <input type="text"
        placeholder="Student Name"
        className="form-control mb-2"
        value={studentName} 
        onChange={(e)=>setStudentName(e.target.value)}/>

        <input type="text" 
        placeholder="Qualification"
        className="form-control mb-2"
        value={qualification}
        onChange={(e)=>setQualification(e.target.value)}/>

        <select className="form-control mb-2" value={trainerId} onChange={(e)=>setTrainerId(e.target.value)}>
          <option value="">Select Trainer</option>
          {trainers.map((t)=>(
          <option key={t.trainerId} value={t.trainerId}>
            {t.trainerName}
          </option>
        ))}
        </select>

        <select className="form-control mb-2" value={courseId} onChange={(e)=>setCourseId(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((c)=>(
          <option key={c.courseId} value={c.courseId}>
            {c.courseName}
          </option>
        ))}
        </select>

        <button className="btn btn-primary">{editId?"Update Student":"Add Student"}</button>
        {editId&&(
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel</button>
        )}
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qualification</th>
            <th>Trainer</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length>0?(
            students.map((s)=>(
              <tr key={s.studentId}>
                <td>{s.studentId}</td>
                <td>{s.studentName}</td>
                <td>{s.qualification}</td>
                <td>{s.trainerName||"Not Assigned"}</td>
                <td>{s.courseName||"Not Assigned"}</td>
                <td><button className="btn btn-sm btn-warning me-2" onClick={()=>handleEdit(s)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(s.studentId)}>Delete</button>
                </td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan="6" className="text-center">No Students Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Student;