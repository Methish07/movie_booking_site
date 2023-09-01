import mongoose, { mongo } from "mongoose";
import Booking from "../models/Booking";
import User from "../models/UserModel";
import Movie from '../models/movie'
export const newBooking=async (req,res,next)=>{
    let booking;
    const {movie,date,seatNumber,user}=req.body;
    let existingUser,existingMovie;
    try{
        existingMovie=await Movie.findById(movie);
        existingUser=await User.findById(user);
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!existingMovie) return res.status(404).json({message:"Movie not found with given ID"});
    if(!existingUser) return res.status(404).json({message:"User not found with given ID"});
    try{
        booking=new Booking({
            movie,
            date:new Date(`${date}`),
            seatNumber,
            user
        });
        const session=await mongoose.startSession();
        session.startTransaction();
        existingMovie.bookings.push(booking);
        existingUser.bookings.push(booking);
        await existingMovie.save({session});
        await existingUser.save({session});
        await booking.save({session});
        session.commitTransaction();
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!booking){
        return res.status(500).json({message:"Something went wrong"});
    }
    return res.status(201).json({booking});
}

export const getBookingById=async (req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
        booking=await Booking.findById(id);
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!booking) return res.status(500).json({message:"unexpected error"});
    return res.status(200).json({booking});
}

export const deleteBooking=async (req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
        booking=await Booking.findByIdAndRemove(id).populate("user movie");
        const session= await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});
        session.commitTransaction();
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!booking){
        return res.status(500).json({message:"unable to delete"});
    }
    return res.status(200).json({message:"Successfully deleted"});
}