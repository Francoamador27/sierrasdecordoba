import axios from "axios";
import { useDispatch } from "react-redux";
import { cleanUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import '../css/unlog.css'
import Swal from "sweetalert2";
import { url } from "./utils.js/endpoint/endpoint";
export const Unlog = () => {
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

  const fetchUnlog = async () => {
    await axios.get(`${url}/auth/logout`, { withCredentials: true });
    Toast.fire({
      icon: "error",
      title: "Unlogin"
    });
    dispatch(cleanUser())
    navigate("/login")
  }
  return (

      <button title="deslogearse" className="unlogged" onClick={fetchUnlog}>
        <i className='bx bx-log-out nav_icon'></i>
      </button>

  )
}