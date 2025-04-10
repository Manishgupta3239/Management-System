import React, { useContext, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading , setLoading] = useState(false);
  const { setAuthenticate, setUser, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!form.username.trim() || !form.password.trim()) {
      toast.error("Invalid credentials");
      return;
    }

    try {
      const response = await axios.post(
        "https://management-system-wgrv.onrender.com/api/auth/login",
        form,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAuthenticate(true);
        auth();
        setUser(response.data.data.username);

        if (response.data.data.username === "manish") {
          toast.success("Welcome manish");
          setTimeout(() => navigate("/admin"), 1800);
        } else {
          toast.success(`Welcome ${response.data.data.username}`);
          setTimeout(() => navigate("/employee"), 1800);
        }
      }
    } catch (error) {
      toast.error("Invalid Credentials!");
      console.log(error);
    } finally {
      setForm({ username: "", password: "" });
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center">
      <form
        onSubmit={handleSubmit} // ✅ attached to form
        className="h-80 w-96 bg-transparent rounded-lg border-green-950 border-2 space-y-3 text-center pt-7"
      >
        <input
          placeholder="Enter Username"
          className="rounded-2xl h-12 bg-transparent border-2 border-green-900 px-2 text-[20px] font-medium text-white"
          onChange={handleChange}
          name="username"
          value={form.username}
        />

        <input
          placeholder="Enter Password"
          type="password"
          className="rounded-2xl h-12 bg-transparent border-2 border-green-900 px-2 text-[20px] font-medium text-white"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit" // ✅ Only submit type needed
          className="bg-green-900 rounded-xl h-12 w-[68%] text-[20px] font-medium text-white hover:bg-green-800"
          disabled={loading }
        >
          {loading ? "Logging in...":"Login"}
        </button>

        <p className="text-white text-[25px] font-semibold">or</p>
        <p className="text-white">
          Don't have an account{" "}
          <NavLink
            to={"/signup"}
            className="text-blue-500 font-semibold hover:underline"
          >
            SignUp
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
