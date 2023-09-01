import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { Box, Typography, Button } from '@mui/material'
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const labelStyle = { mt: 1, mb: 1 };
const AuthForm = ({submitter,isAdmin }) => {
  const [isSignUp, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitter({inputs, signup:isAdmin?false:isSignUp});
  }

  return (
      <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
        <Box sx={{ ml: "auto", padding: 1 }}>
          <IconButton LinkComponent={Link} to='/'>
            <CloseIcon/>
            </IconButton>
        </Box>
        <Typography variant="h4" textAlign="center">{isSignUp ? "Signup" : "Login"}</Typography>
        <form onSubmit={handleSubmit}>
          <Box padding={6} display={"flex"} justifyContent={"center"}
            flexDirection={"column"}
            width={400}
            margin="auto"
            alignContent="center">
            {
              !isAdmin && isSignUp && (
                <>
                  <FormLabel sx={labelStyle}>Name</FormLabel>
                  <TextField margin="normal" variant={"standard"} type={"text"} name="name" value={inputs.name} onChange={handleChange}></TextField>
                </>
              )
            }
            <FormLabel sx={labelStyle}>Email</FormLabel>
            <TextField margin="normal" variant={"standard"} type={"email"} name="email" value={inputs.email} onChange={handleChange}></TextField>
            <FormLabel sx={labelStyle}>password</FormLabel>
            <TextField margi="normal" variant={"standard"} type={"password"} name="password" value={inputs.password} onChange={handleChange}></TextField>
            <Button sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }} type="submit" variant="contained" fullWidth>{isSignUp ? "Signup" : "Login"}</Button>
            {
               !isAdmin && (
                <Button onClick={() => setIsSignup(!isSignUp)}
              sx={{ mt: 2, borderRadius: 10 }} fullWidth>Switch To {isSignUp ? "Login" : "Signup"}  </Button>
               )
            }
          </Box>
        </form>
      </Dialog>
  )
}

export default AuthForm