import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUserData = JSON.stringify({
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL}/users/register`, // Ensure VITE_BASE_URL is correctly set in .env
      headers: {
        "Content-Type": "application/json",
      },
      data: newUserData,
    };
    console.log(user);
    

    try {
      const response = await axios.request(config);
      console.log("Response:", response.data);

      if (response.status === 201) {
        setUser(response.data.user);
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What`s your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-7 py-2 border text-base"
              required
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-7 py-2 border text-lg"
              required
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What`s your email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-7 py-2 border w-full text-lg"
            required
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Create Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-7 py-2 border w-full text-lg"
            required
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p className="text-lg leading-tight">
          This site is protected by Abhijeet and the{" "}
          <span className="underline text-blue-600">Google policy</span> and{" "}
          <span className="underline text-blue-600">Terms and Services apply</span>.
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
