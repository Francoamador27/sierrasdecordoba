import { Route, Routes } from "react-router-dom"
import Login from "../Login"
import Details from "../Details"
import Results from "../Results"
import { Myproducts } from "../MyProducts"
import ListCategory from "../ListCategory"
import { EditsPosts } from "../posts/EditsPosts"
import { CreateGallery } from "../posts/GalleryPost"
import { Register } from "../Register"
import { Home } from "../Home"
import { Users } from "../users/Users"
import { User } from "../users/User"
export const Rutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/details' element={<Details />} />
      <Route path='/results' element={<Results />} />
      <Route path='/details' element={<Details />} />
      <Route path='/myproducts' element={<Myproducts />} />
      <Route path='/propiedades' element={<ListCategory />} />
      <Route path='/tours' element={<ListCategory />} />
      <Route path='/createproducts' element={<CreateGallery />} />
      <Route path='/galeria' element={<CreateGallery />} />
      <Route path='/editpost' element={<EditsPosts />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users' element={<Users />} />
      <Route path='/user' element={<User />} />
    </Routes>
  )
}