import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthContext } from "./context/auth-context";
import { useCallback } from "react";
const defaultAuthenticationContext = {
  isLoggedIn: false,
  token: null,
  type: null,
  id: null,
  username: null,
  email: null,
  roles: null,
  setNewContext: () => {},
  logout: ()=>{}
}

function App() {
  const [context,setContext] = useState(defaultAuthenticationContext);

  const setNewContext = useCallback((newContext)=>{
    setContext((oldContext)=>{
      return {...oldContext,...newContext};
    })
  },[])

  useEffect(()=>{
    (async function(){
      if(localStorage.getItem("userData")){
        const data = localStorage.getItem("userData");
        const parsedData = await JSON.parse(data);
        setContext(parsedData);
      }
    }())
  },[])

  const logout = useCallback(()=>{
    localStorage.removeItem("userData");
    setContext(defaultAuthenticationContext);
  },[])


  let paths;
  if(!context.isLoggedIn){
    paths = 
    <Routes>
       <Route path="/signin" element={<SignIn></SignIn>} />
       <Route path="/*" element={<SignIn></SignIn>} />
       <Route path="/signup" element={<SignUp></SignUp>} />
    </Routes>
  } else {
    paths = 
    <Routes>
       <Route path="/*" element={<button onClick={logout}>{context.username}</button>} />
    </Routes>
  }
  return (
    <AuthContext.Provider value={{...context,setNewContext:setNewContext,logout:logout}}>
      <BrowserRouter>
        {paths}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
