import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/Authcontext/AuthProvider.jsx";
import TaskProvider from "./context/TaskContext/TaskProvider.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/UserContext/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <TaskProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={800}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </TaskProvider>
    </UserProvider>
  </AuthProvider>
);
