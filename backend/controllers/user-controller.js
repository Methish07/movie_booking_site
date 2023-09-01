import bcrypt from "bcryptjs"
import User from '../models/UserModel'
import Booking from "../models/Booking";

export const getAllUsers=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }
    catch(err){
        next(err);
    }
    if(!users){
        return res.status(500).json({message:"unexpected error occured"});
    }
    return res.status(200).json({users});
};

export const signUp=async (req,res,next)=>{
    const {name,email,password}=req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"invalid inputs"});
    }
    let user;
    const hashedPassword=bcrypt.hashSync(password);
    console.log(hashedPassword);
    try{
        user=new User({name,email,password:hashedPassword});
        user=await user.save();
        console.log(user);
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!user){
        return res.status(500).json({message:"internal server error"});
    }
    return res.status(201).json({id:user._id});
}

export const upadateUser=async (req,res,next)=>{
    const {name,email,password}=req.body;
    const id=req.params.id;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"invalid inputs"});
    }
    let user;
    const hashedPassword=bcrypt.hashSync(password);
    try{
        user=await User.findByIdAndUpdate(id,{name,email,password:hashedPassword});
    }
    catch(err){
        next(err);
    }
    if(!user){
        return res.status(500).json({message:"something went wrong"});
    }
    return res.status(200).json({user});
}

export const deleteUser=async (req,res,next)=>{
    const id=req.params.id;
    let user;
    try{
        user=await User.findByIdAndRemove(id);
    }
    catch(err){ next(err) }
    if(!user){
        return res.status(500).json({message:"something went wrong"});
    }
    return res.status(200).json({message:"Deleted successfully"});
}

export const login=async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"invalid inputs"});
    }
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }
    catch(err){
        next(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"email doesn't exists"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect email or password"});
    }
    return res.status(200).json({message:"Login successfull",id:existingUser._id});
}

export const getBookingOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
      bookings = await Booking.find({ user: id })
        .populate("movie")
        .populate("user");
    } catch (err) {
      return console.log(err);
    }
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookings });
  };

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
  };