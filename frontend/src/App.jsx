import Header from './components/Header'
import {Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage'
import Auth from './components/Auth'
import Movies from './components/Movies'
import Admin from './components/Admin'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { adminActions, userActions } from './store'
import Bookings from './components/Bookings'
import UserProfile from './components/UserProfile'
import AddMovie from './components/AddMovie'
import AdminProfile from './components/AdminProfile'


function App() {
   const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
   const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  console.log("is admin logged in",isAdminLoggedIn);
  console.log("is user logged in ",isUserLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login())
    }
  },[])
  return (
    <>
     <Header/>
    <section>
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        {
          !isAdminLoggedIn && !isUserLoggedIn && 
          <>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/auth' element={<Auth/>}></Route>
          </> 
        }
        {
          isUserLoggedIn && !isAdminLoggedIn &&
          <>
          <Route path='/user' element={<UserProfile/>}></Route>
          <Route path='/booking/:id' element={<Bookings/>}></Route>
          </>
        }
        {
          isAdminLoggedIn && !isUserLoggedIn &&
          <>
          <Route path='/add' element={<AddMovie/>}></Route>
          <Route path='/user-admin' element={<AdminProfile/>}></Route>
          </>
        }
      </Routes>
    </section>
    </>
  )
}

export default App
