import React, { useState } from 'react'
import { useEffect } from 'react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getAllMovies} from '../api-helpers/api-helpers'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, userActions } from '../store';


const Header = () => {
  const [value, setvalue] = useState(0);
  const [movies,setmovies]=useState([]);
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const Logout=(isAdmin)=>{
    dispatch(isAdmin?adminActions.logout():userActions.logout())
  }

  const handleChange=(e,val)=>{
    const movie=movies.find((m)=>m.title==val);
    if(isUserLoggedIn || isAdminLoggedIn){
      navigate(`/booking/${movie._id}`)
    }
  }
  
  useEffect(() => {
    getAllMovies().then((res)=>setmovies(res.movies)).catch((err)=>console.log(err));
  }, [])

  return (
    <AppBar position='sticky' sx={{ backgroundColor: "#333545" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to='/' >
          <MovieIcon />
          </IconButton>
        </Box>
        <Box margin={"auto"} width={"30%"}>
          <Autocomplete
            onChange={handleChange}
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => <TextField sx={{ input: { color: "#ffffff" } }} variant='standard' {...params} placeholder='Search across multiple movies' />}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs 
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            onChange={(e, val) => setvalue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="movies" />
            {
              isUserLoggedIn && (
                <>
                          <Tab LinkComponent={Link} to="/user" label="profile" />
                          <Tab onClick={()=>Logout(false)} LinkComponent={Link} label="logout" to="/" />
                </>
              )
            }
            {
              isAdminLoggedIn && (
                <>
                          <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                          <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                          <Tab onClick={()=>Logout(true)} LinkComponent={Link} label="Logout" to="/" />
                </>
              )
            }
            {
              !isAdminLoggedIn &&!isUserLoggedIn && <>
                          <Tab LinkComponent={Link} to="/admin" label="Admin" />
                          <Tab LinkComponent={Link} label="Auth" to="/auth" />
              </>
            }
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header