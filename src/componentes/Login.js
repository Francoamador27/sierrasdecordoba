import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, cleanUser } from '../redux/userSlice';
import { FormLogin } from './FormLogin';
import { Unlog } from './Unlog';
import { DataSession } from './Perfil';
function Login() {
  const session = useSelector((state)=> state.user);
  const dispatch = useDispatch()
  useEffect(() => {
      const fetchSession = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/sessions/show', { withCredentials: true });
          const user = res.data.user;
          if(user){
            dispatch(addUser(user))
          }else{
            dispatch(cleanUser())
          }
        } catch (error) {
          dispatch(cleanUser())
        }
      };
      fetchSession();
  }, [dispatch]);
const userLogged  = session && session.email !== null && session.email.trim() !== '';
console.log("session",session)
  return (
    <>

        {userLogged ? (
                <>
                 <DataSession/>
                  <Unlog/>
                </>
              ) : (
                <>
                <FormLogin/>
                </>
              )}
        </>
  );
}

export default Login;