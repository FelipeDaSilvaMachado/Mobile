import React, {createContext,useContext,useState} from "react";
const AppContext=createContext();
export const AppProvider=({children})=>{
  const [currentUser,setCurrentUser]=useState(null);
  const login=id=>setCurrentUser({id,nome:"User",tipo:"engenheiro"});
  const logout=()=>setCurrentUser(null);
  return <AppContext.Provider value={{currentUser,login,logout}}>{children}</AppContext.Provider>;
};
export const useApp=()=>useContext(AppContext);
