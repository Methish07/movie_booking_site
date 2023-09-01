import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography,Button } from '@mui/material'
import MovieItem from './MovieItem'
import { getAllMovies } from '../api-helpers/api-helpers'
const Homepage = () => {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies().then((res)=>setMovies(res.movies)).catch((err)=>console.log(err));
    console.log(movies);
  },[])
  return (
    <Box  width={"100%"} height={"100%"} marginTop={2} margin="auto">
      <Box margin="auto" width="98%" height={"60vh"} padding={2}>
        <img src='https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg?w=826&t=st=1690019960~exp=1690020560~hmac=1db6801f96ec30711b4f4a235e9e5148c47fdb4316e1c1f541c7841a9da2ff19' 
        width={"100%"} height={"100%"} ></img>
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant='h6' textAlign={"center"}>Top Rated</Typography>
      </Box>
      <Box display="flex" width="100%" justifyContent={"center"} flexWrap="wrap">
        {
          movies && movies.slice(0,5).map((item)=>{
            return <MovieItem key={item._id} id={item._id} title={item.title} posterUrl={item.posterUrl} 
            releaseDate={item.releaseDate}  />
          })
        }
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button LinkComponent={Link} to="/movies" variant='outlined' sx={{margin:"auto", color:"#2b2d42"}}>View All Movies</Button>
      </Box>
    </Box>
  )
}

export default Homepage