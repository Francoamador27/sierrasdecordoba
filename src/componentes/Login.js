import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, cleanUser } from '../redux/userSlice';
import { FormLogin } from './FormLogin';
import { Unlog } from './Unlog';
import { DataSession } from './Perfil';
import { MenuAdmin } from './admin/MenuAdmin';
import { url } from './utils.js/endpoint/endpoint';
function Login() {
  const session = useSelector((state)=> state.user);
  const dispatch = useDispatch()
  useEffect(() => {
      const fetchSession = async () => {
        try {
          const res = await axios.get(`/api/sessions/show`, { withCredentials: true });
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
  return (
    <section className='logged'>

        {userLogged ? (
                <>
                <MenuAdmin />
                 <DataSession/>
                  <Unlog/>
                </>
              ) : (
                <>
                <FormLogin/>
                </>
              )}
        </section>
  );
}

export default Login;