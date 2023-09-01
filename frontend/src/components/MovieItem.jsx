import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const MovieItem = ({title,releaseDate,posterUrl,id}) => {
  const navigate=useNavigate();
  const handledirect=()=>{
    console.log(id);
    navigate(`/booking/${id}`);
  }
  return (
    <Card onClick={()=>handledirect(id)} sx={{  cursor:"pointer",margin:2,width:203,height:445, borderRadius:5, 
    }} >
    <img style={{borderRadius:5 }} height={"75%"} width={"100%"} src={posterUrl} alt={title}></img>
      <CardContent>
        <Typography  variant="h6" sx={{fontSize:"medium", fontWeight:"bold"} }>
          {title.length>32?title.substring(0,32):title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
  </Card>
  )
}

export default MovieItem