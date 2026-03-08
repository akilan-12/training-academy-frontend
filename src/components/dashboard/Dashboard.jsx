import { useNavigate } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const role=localStorage.getItem("role")

  const handleLogout=()=>{
    localStorage.clear();
    navigate("/login")
  }

  return (
    <>
    <div className="topbar">
        <h4>Training Academy</h4>
        <div className="topbar-right">
        <span className="role-badge">{role}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>

      <div className="dashboard-container">
        <div className="dashboard-inner">
          <h2 className="welcome-text">
            Welcome,{role}
          </h2>

        <div className="cards-wrapper">
          <div className="dashboard-card" onClick={()=>navigate("/courses")}>
          <h5>Courses</h5>
          <p>Manage course details</p>
        </div>

        <div className="dashboard-card" onClick={()=>navigate("/trainers")}>
          <h5>Trainers</h5>
          <p>Manage trainer details</p>
        </div>

        <div className="dashboard-card" onClick={()=>navigate("/students")}>
          <h5>Students</h5>
          <p>Manage student details</p>
        </div>

        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
