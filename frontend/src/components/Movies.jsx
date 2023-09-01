import React, { useEffect, useState } from 'react'
import { Box, Typography,Button } from '@mui/material'
import { getAllMovies } from '../api-helpers/api-helpers';
import MovieItem from './MovieItem';
const Movies = () => {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies().then((res)=>setMovies(res.movies)).catch((err)=>console.log(err));
  },[])

  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant='h4' padding={2} margin={"auto"} textAlign="center" width="40%" bgcolor={"#900C3F"} color={"white"} >All Movies</Typography>
      <Box sx={{marginTop:5}} width={"100%"} margin={"auto"} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} >
        {
          movies && movies.map((item)=>{
            return <MovieItem id={item._id} title={item.title} posterUrl={item.posterUrl} 
                     releaseDate={item.releaseDate}  ></MovieItem>
          })
        }
      </Box>
    </Box>
  )
}

export default Movies