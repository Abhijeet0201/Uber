import { useState } from "react"
import { Link } from "react-router-dom"


function CaptainLogin () {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[captainData, setCaptainData]= useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(email,password);
    setCaptainData({
      email:email,
      password:password
    })
    console.log(captainData);
    setEmail('')
    setPassword('')
    
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between" >
      <div>
      <img className="w-16 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Logo" />

      <form onSubmit = {(e)=> {
        submitHandler(e)
        }}>
       <h3 className="text-lg font-medium mb-2">What`s your email</h3>
        <input className="bg-[#eeeeee] mb-7 rounded px-7 py-2 border w-full text-lg placeholder:text"
          required 
          value={email}
          onChange={(e) =>{
            setEmail((e.target.value))
          }}
          type="email" 
          name=" " 
          id="" 
          placeholder="email@example.com" 
        />
        <h3 className="text-lg font-medium mb-2">Enter Password </h3>
        <input className='bg-[#eeeeee] mb-7 rounded px-7 py-2 border w-full text-lg placeholder:text'
          required
          value={password}
          onChange={(e) =>{
            setPassword((e.target.value))
          }}
          type="password" 
          name=""  
          id="" 
          placeholder=" Enter password"
        />
        <button className="bg-[#111]  text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
          Login
        </button>
        <p className="text-center ">Join a fleet?<Link to='/captains-signup' className="text-blue-600">Register as a Captain</Link></p>
        
      </form>
      </div>
      <div>
        <Link to='/login' className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
  )
}


export default CaptainLogin