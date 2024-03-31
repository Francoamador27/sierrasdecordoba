import axios from "axios";
import { useDispatch } from "react-redux";
import { cleanUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import '../css/unlog.css'
import Swal from "sweetalert2";
export const Unlog = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    
    const fetchUnlog = async ()=>{
        await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
        Toast.fire({
            icon: "error",
            title: "Unlogin"
          });
        dispatch(cleanUser())
        navigate("/login")
      }
    return (
        <button className="unlog" onClick={fetchUnlog}>Unlog</button>

    )
}