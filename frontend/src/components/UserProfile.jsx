import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const UserProfile = () => {
    const [bookings, setBookings] = useState();
    const [user,setuser]=useState();

    useEffect(() => {
        getUserBooking()
            .then(res => setBookings(res.bookings))
            .catch(err => console.log(err));

        getUserDetails()
        .then(res=>setuser(res.user))
        .catch(err=>console.log(err));

    }, [])
    
    const handleDelete=(id)=>{
        deleteBooking(id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    console.log("bookings:", bookings);
    return (
        <Box display={"flex"} width={"100%"}>
            {
                user && (
                    <Fragment>
                        <Box
                            width={"30%"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={3} >
                            <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}   ></AccountCircleIcon>
                            <Typography padding={1} width={"auto"}
                                textAlign={"center"}
                                border={"1px solid #ccc"} borderRadius={6}  >
                                Name:{user.name}
                            </Typography>
                            <Typography mt={1} padding={1} width={"auto"}
                                textAlign={"center"}
                                border={"1px solid #ccc"} borderRadius={6}  >
                                Email:{user.email}
                            </Typography>
                        </Box>
                        <Box width={"70%"} display={"flex"} flexDirection={"column"}>
                            <Typography variant='h3' fontFamily={"verdana"}
                                textAlign={"center"} padding={2}>
                                Bookings
                            </Typography>
                            <Box
                                margin={"auto"}
                                display={"flex"} flexDirection={"column"} width="80%">
                                <List>
                                    {bookings && bookings.length>0 &&
                                        bookings.map((booking, index) => (
                                            <ListItem
                                                sx={{
                                                    bgcolor: "#00d386",
                                                    color: "white",
                                                    textAlign: "center",
                                                    margin: 1,
                                                }}
                                                key={index}
                                            >
                                                <ListItemText
                                                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                                                >
                                                    Movie: {booking.movie.title}
                                                </ListItemText>
                                                <ListItemText
                                                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                                                >
                                                    Seat: {booking.seatNumber}
                                                </ListItemText>
                                                <ListItemText
                                                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                                                >
                                                    Date: {new Date(booking.date).toDateString()}
                                                </ListItemText>
                                                <IconButton
                                                    onClick={() => handleDelete(booking._id)}
                                                    color="error"
                                                >
                                                    <DeleteForeverOutlinedIcon />
                                                </IconButton>
                                            </ListItem>
                                        ))}
                                </List>
                            </Box>
                        </Box>
                    </Fragment>
                )
            }
        </Box>
    )
}

export default UserProfile