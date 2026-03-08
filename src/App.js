import './App.css';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Student from "./components/pages/Student";
import Course from "./components/pages/Course";
import Trainer from "./components/pages/Trainer"
import Login from './components/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      {/* Default Redirect */}
      <Route path ="/" element={<Navigate to="/login"/>}/>
      
      {/* Public */}
      <Route path="/login" element={<Login />} />
      
      {/*Protected*/}
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["ADMIN","TRAINER","STUDENT"]}><Dashboard/></ProtectedRoute>}/>
      <Route path="/students" element={<ProtectedRoute allowedRoles={["ADMIN","TRAINER","STUDENT"]}><Student/></ProtectedRoute>}/>
      <Route path="/courses" element={<ProtectedRoute allowedRoles={["ADMIN","TRAINER"]}><Course/></ProtectedRoute>}/>
      <Route path="/trainers" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Trainer/></ProtectedRoute>}/>
      
    </Routes>

    </BrowserRouter>
  );
}

export default App;
