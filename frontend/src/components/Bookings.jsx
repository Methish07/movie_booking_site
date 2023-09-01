import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../api-helpers/api-helpers';
import { Typography,Box, TextField, FormLabel,Button } from '@mui/material';

const Bookings = () => {
    const id=useParams().id;
    const[movie,setMovie]=useState();
    const [inputs,setInputs]=useState({
        seatNumber:"",
        date:"",
    });
    const navigate=useNavigate();
    useEffect(()=>{
        getMovieDetails(id).then(res=>setMovie(res)).catch(err=>console.log(err));
    },[])
    console.log(movie)
    const handleChange=(e)=>{
        setInputs((prevstate)=>({...prevstate,[e.target.name]:e.target.value}));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs)
        newBooking({...inputs,movie:movie._id})
        .then(navigate("/user"))
        .catch(err=>console.log(err));
        
    }
    
  return (
    <div style={{width:"100%", height:"50%"}}>
        {
            movie && (
                <Fragment>
                    <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={"center"}>
                        {movie.title}
                    </Typography>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Box display={"flex"} justifyContent={"column"} marginRight={"auto"}
                         flexDirection={"column"} padding={3} width={"50%"}>
                            <img width={"90%"} src={movie.posterUrl} alt={movie.title}
                            height={"40%"}></img>
                            <Box width={"80%"} marginTop={2} display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} padding={2} >
                            <h3>About the Movie: </h3><Typography padding={2} > {movie.description}</Typography>
                             <h3>Starrers: </h3>   <Typography 
                                marginTop={1}>{ movie.actors.map((actor)=>actor+ " ")} </Typography>
                                <h3>Release Date: </h3><Typography fontStyle={"bold"} marginTop={1} >
                                    {new Date(movie.releaseDate).toDateString()}
                                </Typography>
                            </Box>
                         </Box>
                         <Box width={"50%"} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box padding={5} margin={"auto"}
                                display={"flex"} flexDirection={"column"} >
                                    <FormLabel>Seat Number</FormLabel>
                                    <TextField value={inputs.seatNumber} onChange={handleChange} name='seatNumber' 
                                    type={"number"} 
                                    margin='normal' variant='standard'></TextField>
                                    <FormLabel>Booking Date:</FormLabel>
                                    <TextField value={inputs.date} onChange={handleChange} name='date' 
                                    type={"date"} margin='normal' variant='standard'></TextField>
                                    <Button type='submit' variant='contained'  sx={{mt:3, backgroundColor:"red",  color:"white"}}>Book Tickets</Button>
                                </Box>
                            </form>
                         </Box>
                    </Box>
                </Fragment>
            )
        }
    </div>
  )
}

export default Bookings