import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getAdminById, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const AdminProfile = () => {
    const [admin,setAdmin]=useState();

    useEffect(() => {

        getAdminById()
        .then(res=>setAdmin(res.admin))
        .catch(err=>console.log(err));

    }, [])
    
    return (
        <Box display={"flex"} width={"100%"}>
            {
                admin && (
                    <Fragment>
                        <Box
                            width={"30%"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={3} >
                            <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}   ></AccountCircleIcon>
                            <Typography mt={1} padding={1} width={"auto"}
                                textAlign={"center"}
                                border={"1px solid #ccc"} borderRadius={6}  >
                                Email:{admin.email}
                            </Typography>
                        </Box>
                        <Box width={"70%"} display={"flex"} flexDirection={"column"}>
                            <Typography variant='h3' fontFamily={"verdana"}
                                textAlign={"center"} padding={2}>
                                Added Movies
                            </Typography>
                            <Box
                                margin={"auto"}
                                display={"flex"} flexDirection={"column"} width="80%">
                                <List>
                                    {admin && admin.addedMovies.length>0 &&
                                        admin.addedMovies.map((movie, index) => (
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
                                                    Movie: {movie.title}
                                                </ListItemText>
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

export default AdminProfile