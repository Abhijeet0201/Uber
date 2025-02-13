import { useState,createContext } from "react";

export const UserDataContext = createContext();

const UserContext = ({children}) =>{
   const [user, setUser] = useState({
    email:'',
    fullName:{
        firstName:'',
        lastName:''
    }
   });
  return (
    <div>
        <UserDataContex.Provider value ={[user, setUser]}>
            {children}
        </UserDataContex.Provider>
    </div>
  )
}

export default UserContext