import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onReceived=(data)=>{
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId",data.id);
    navigate("/");
  }
  const getData=(data)=>{
    console.log("data from auth ",data);
    sendUserAuthRequest(data.inputs,data.signup)
    .then(onReceived)
    .catch((err)=>console.log(err));
  }

  return (
    <>
    <AuthForm submitter={getData} isAdmin={false}></AuthForm>
    </>
  )
}

export default Auth