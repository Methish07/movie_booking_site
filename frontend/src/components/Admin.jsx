import React from 'react'
import AuthForm from './AuthForm'
import { sendAdminAuthRequest } from '../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const dispatch=useDispatch();
  const naviagate=useNavigate();
  const onResReceived=(data)=>{
    console.log(data);
    dispatch(adminActions.login())
    localStorage.setItem("adminId",data.id)
    localStorage.setItem("token",data.token)
    naviagate('/');
  }
const getData=(data)=>{
  console.log("data from admin",data);
  sendAdminAuthRequest(data.inputs)
  .then(onResReceived)
  .catch(err=>console.log(err));
}
  return (
    <div>
      <AuthForm submitter={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin