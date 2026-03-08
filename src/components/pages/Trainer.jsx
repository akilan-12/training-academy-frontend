import React,{useEffect,useState} from "react";
import "./Trainer.css";
import axiosInstance from "../../services/axiosConfig";

const Trainer=()=>{

  const [trainers,setTrainers]=useState([]);
  const [trainerName,setTrainerName]=useState("");
  const [yearOfExperience,setYearOfExperience]=useState("");
  const [editId,setEditId]=useState(null);
  const [showModal,setShowModal]=useState(false);
  const [selectedTrainer,setSelectedTrainer]=useState(null);
  const [students,setStudents]=useState([]);

  useEffect(()=>{
    loadTrainers();
  },[]);

  const loadTrainers=async()=>{
    try{
      const res=await axiosInstance.get("/trainers");
      setTrainers(res.data);
    }catch(err){
      console.log("Failed to load trainers",err);
    }
  };

  const resetForm=()=>{
    setTrainerName("");
    setYearOfExperience("");
    setEditId(null);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const payload={
      trainerName,yearOfExperience:yearOfExperience?Number(yearOfExperience):null
    };
try{
  if(editId){
    await axiosInstance.put(`/trainers/${editId}`,payload);
    alert("Trainer updated successfully");
  }else{
    await axiosInstance.post("/trainers",payload)
    alert("Trainer added successfully");
  }

  loadTrainers();
  resetForm();
}catch(err){
  alert("Operation failed");
  console.log(err);
}
}

  const handleEdit=(trainer)=>{
    setEditId(trainer.trainerId);
    setTrainerName(trainer.trainerName);
    setYearOfExperience(trainer.yearOfExperience);
  };

  const handleDelete=async(id)=>{
    if(!window.confirm("Delete trainer?")) return;

    try{
      await axiosInstance.delete(`/trainers/deleteById/${id}`)
      alert("Trainer deleted");
      loadTrainers();
    }catch(err){
      alert("Delete failed");
    }
  };

  const loadStudentsByTrainer=async(trainer)=>{
    try{
      const res=await axiosInstance.get(
        `/students/trainer/${trainer.trainerId}`
      );

      setStudents(res.data);
      setSelectedTrainer(trainer);
      setShowModal(true);
    }catch(err){
      console.log("Failed to load students",err);
    }
  }

  return(
    <div className="container mt-4">

      <h2 className="text-center mb-4 text-white">Trainer Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" 
        placeholder="Trainer Name" 
        className="form-control mb-2"
        value={trainerName} 
        onChange={(e)=>setTrainerName(e.target.value)}/>

        <input type="number" 
        placeholder="Experience(Years)"
        className="form-control mb-2"
        value={yearOfExperience} 
        onChange={(e)=>setYearOfExperience(e.target.value)}/>

        <button className="btn btn-primary">{editId?"Update Trainer":"Add Trainer"}</button>
        {
          editId&&(
            <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel</button>
          )
        }
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {trainers.length>0?(
            trainers.map((t)=>(
            <tr key={t.trainerId}>
              <td>{t.trainerId}</td>
              <td>{t.trainerName}</td>
              <td>{t.yearOfExperience}</td>
              <td>
                <button 
                className="btn btn-sm btn-warning me-2"
                onClick={()=>handleEdit(t)}>Edit</button>
                <button 
                className="btn btn-sm btn-danger"
                onClick={()=>handleDelete(t.trainerId)}>Delete</button>
                <button 
                className="btn btn-sm btn-info ms-2 me-2"
                onClick={()=>loadStudentsByTrainer(t)}>
                  View Students
                </button>
              </td>
            </tr>
          ))
        ):(
            <tr>
              <td colSpan="4" className="text-center">
                No Trainers Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Students Modal */}
{showModal && (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Students of {selectedTrainer?.trainerName}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">
          {students.length > 0 ? (
            <table className="table table-bordered">
              <thead className="table-secondary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.studentId}>
                    <td>{s.studentId}</td>
                    <td>{s.studentName}</td>
                    <td>{s.qualification}</td>
                    <td>{s.courseName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No students found</p>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
)}
  </div>
  )
}

export default Trainer;