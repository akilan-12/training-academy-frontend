import React, { useEffect, useState } from "react";
import "./Course.css";
import axiosInstance from "../../services/axiosConfig";

const Course = () => {

  /* ---------- STATE ---------- */
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    loadCourses();
    loadTrainers();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses")
      setCourses(res.data);
    } catch (err) {
      console.log("Failed to load courses", err);
      alert("Failed to load courses")
    }
  };

  const loadTrainers = async () => {
    try {
      const res= await axiosInstance.get("/trainers")
      setTrainers(res.data);
    } catch (err) {
      console.log("Failed to load trainers", err);
      alert("Failed to load trainers")
    }
  };

  /* ---------- RESET FORM ---------- */
  const resetForm = () => {
    setCourseName("");
    setDuration("");
    setTrainerId("");
    setEditId(null);
  };

  /* ---------- CREATE / UPDATE ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !duration) {
      alert("Course name and duration are required");
      return;
    }

    const payload = { courseName, duration, trainerId:trainerId?Number(trainerId):null };

    try{
       if(editId){
      await axiosInstance.put(`/courses/${editId}`,payload);
      alert("Course updated successfully");
    }else{
      await axiosInstance.post("/courses",payload);
      alert("Course added successfully");
    }
    loadCourses();
    resetForm();   
  } catch(err){
    alert("Operation failed")
    console.log(err);
  }
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (course) => {
    setEditId(course.courseId);
    setCourseName(course.courseName);
    setDuration(course.duration);
    setTrainerId(course.trainerId||"");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await axiosInstance.delete(`/courses/deleteById/${id}`, {
        method: "DELETE",
      });
      alert("Course deleted");
      loadCourses();
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4 text-white">Course Management</h2>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} className="mb-4">

        <input
          type="text"
          placeholder="Course Name"
          className="form-control mb-2"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (hrs)"
          className="form-control mb-2"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={trainerId}
          onChange={(e) => setTrainerId(e.target.value)}
        >
          <option value="">Select Trainer</option>
          {trainers.map((t) => (
            <option key={t.trainerId} value={t.trainerId}>
              {t.trainerName}
            </option>
          ))}
        </select>

        <button className="btn btn-primary">
          {editId ? "Update Course" : "Add Course"}
        </button>

        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ===== TABLE ===== */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Duration</th>
            <th>Trainer</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.duration}</td>
                <td>{course.trainerName||"Not Assigned"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(course.courseId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Courses Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Course;
