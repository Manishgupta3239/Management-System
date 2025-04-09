import axios from "axios";
import { useState , useEffect} from "react"
import { Outlet } from "react-router-dom"

const ProtectRoute = ({Component}) => {
  const[authenthenticate , setAuthenticate]=useState(false);
  const navigate = useNavigate();
  useEffect(() => {
             
  
  })
  
  return (
    <div>
      <Component/>
    </div>
  )
}

export default ProtectRoute