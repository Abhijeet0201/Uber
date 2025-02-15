import { useState, useEffect} from "react"
import { Link } from "react-router-dom"

function CaptainSigup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) =>{
      e.preventDefault();
  
      const newUserData = {
        fullName:{
          firstName:firstName,
          LastName:lastName
        },
        email:email,
        password:password
      };
      console.log(newUserData);
      setUserData(newUserData);
      
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
  
    };
    useEffect(() => {
      console.log(userData);
    }, [userData]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between" >
    <div>
    <img className="w-16 mb-10" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />

    <form onSubmit = {(e)=> {
      submitHandler(e)
      }}>
     <h3 className="text-lg w-full font-medium mb-2">What`s your Name</h3>
     <div className="flex gap-4 mb-6">
     <input className="bg-[#eeeeee]  w-1/2 rounded px-7 py-2 border  text-base placeholder:text"
        required 
        
        type="text" 
        name="firstname" 
        id="firstname" 
        placeholder="First Name"
        value={firstName}
        onChange={(e) =>{
          setFirstName((e.target.value))
        }}
      />
      <input className="bg-[#eeeeee]  w-1/2  rounded px-7 py-2 border  text-lg placeholder:text"
        required 
        
        type="text" 
        name="lastname" 
        id="lastname" 
        placeholder="Last Name"
        value={lastName}
        onChange={(e) =>{
          setLastName((e.target.value))
        }}
      />
     </div>
     <h3 className="text-lg font-medium mb-2">What`s your Captain email</h3>
      <input className="bg-[#eeeeee] mb-6 rounded px-7 py-2 border w-full text-lg placeholder:text"
        required 
        
        type="email" 
        name="email" 
        id="email" 
        placeholder="email@example.com" 
        value={email}
        onChange={(e) =>{
          setEmail((e.target.value))
        }}
      />
      <h3 className="text-lg font-medium mb-2"> Create Password </h3>
      <input className='bg-[#eeeeee] mb-6 rounded px-7 py-2 border w-full text-lg placeholder:text'
        required
        
        type="password" 
        name="password"  
        id="password" 
        placeholder=" Enter password"
        value={password}
        onChange={(e) =>{
          setPassword((e.target.value))
        }}
      />
      <button className="bg-[#111]  text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
        SignUp
      </button>
      <p className="text-center ">Already have a Account?<Link to='/captains-login' className="text-blue-600">Login Here</Link></p>
      
    </form>
    </div>
    <div className="text-lg">
      <p className="leading-tight">This site is protected by Abhijeet and the <span className="underline text-blue-600">Google policy</span> and <span className=" underline text-blue-600">Term and Service apply</span></p>
    </div>
  </div>
  )
}

export default CaptainSigup