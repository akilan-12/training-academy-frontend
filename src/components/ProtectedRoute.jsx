import { Navigate} from "react-router-dom";
import {isAuthenticated} from "../utils/authFetch";

const ProtectedRoute=({children,allowedRoles})=>{
   const role=localStorage.getItem("role");
   console.log("Authenticated:", isAuthenticated());
   console.log("Role:", role);
   console.log("AllowedRoles:", allowedRoles);


   if(!isAuthenticated()) {
      return <Navigate to="/login" replace />
   }
      
   if(allowedRoles&& role && !allowedRoles.includes(role)){
      return <Navigate to="/dashboard" replace />
   }

   return children;
}

export default ProtectedRoute;