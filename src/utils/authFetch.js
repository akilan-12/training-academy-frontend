export const saveAuth =(username,password)=>{
  const token= btoa(username + ":" + password);
  localStorage.setItem("authToken",token);
  localStorage.setItem("loginTime",Date.now().toString());
}

export const logout=()=>{
  localStorage.removeItem("authToken");
  localStorage.removeItem("loginTime");
  localStorage.removeItem("role");
  window.location.href="/login";
}

export const isAuthenticated=()=>{
  const token=localStorage.getItem("authToken");
  const loginTime=localStorage.getItem("loginTime");

  if(!token || !loginTime) return false;

  const SESSION_LIMIT=30*60*1000;

  if(Date.now()-Number(loginTime)>SESSION_LIMIT){
    logout();
    return false;
  }

  return true;
}