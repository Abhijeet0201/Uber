import {Link } from 'react-router-dom'
const Start =() =>{
  return (
    <div>
      <div className="bg-coverbg-center bg-[url(https://img.freepik.com/free-photo/vertical-shot-traffic-light-with-number-13-stopwatch_181624-11218.jpg?t=st=1738333117~exp=1738336717~hmac=8a73bc4da08e39af4228e13ba95b58d1feb7ef7875d73fef45eea3688bcdbbe7&w=360)] h-screen pt-8 flex justify-between flex-col  w-full bg-red-400">
        <img className="w-16 ml-8" src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
        <div className="bg-white py-4 pb-7 px-4">
          <h2 className="text-3xl font-bold">Get Started Uber</h2>
          <Link to= "/login" className=" flex iteam-center justify-center w-full  bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start