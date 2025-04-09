import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/Authcontext/AuthContext";
import SignUp from "./pages/signup/SignUp";

function App() {
  const { authenticate, user, setUser } = useContext(AuthContext);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/employee"
            element={
              loading ? (
                <div className="h-screen flex items-center justify-center bg-gray-100">
                  <ClipLoader color="#3498db" size={50} />{" "}
                </div>
              ) : authenticate ? (
                <EmployeeDashboard />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/admin"
            element={
              authenticate ? (
                user == "manish" ? (
                  <AdminDashboard />
                ) : (
                  <Login />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/"
            element={
              authenticate ? (
                user == "manish" ? (
                  <AdminDashboard />
                ) : (
                  <EmployeeDashboard />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
