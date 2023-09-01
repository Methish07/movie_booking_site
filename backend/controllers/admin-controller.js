import Admin from '../models/Admin'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


export const addAdmin=async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"invalid inputs"});
    }
    let existingAdmin;
    try{
        existingAdmin=await Admin.findOne({email});
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(existingAdmin){
        return res.status(400).json({message:"Admin already exists"});
    }
    const hashedpassword=bcrypt.hashSync(password);
    let admin;
    try{
        admin= new Admin({
            email,
            password:hashedpassword,
        });
        await admin.save();
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!admin){
       return  res.status(500).json({message:"something went wrong"});
    }
    return res.status(201).json({admin});
}

export const login=async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"invalid inputs"});
    }
    let existingAdmin;
    try{
        existingAdmin=await Admin.findOne({email});
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!existingAdmin){
        return res.status(400).json({message:"email or password doesn't exists"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect email or password"});
    }

    const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
        expiresIn:"10d",
    });

    return res.status(200).json({message:"Login successfull",token,id:existingAdmin._id});
}

export const getAdmins=async (req,res,next)=>{
    let admins;
    try{
        admins=await Admin.find();
    }
    catch(err){
        console.log(err);
        next(err);
    }
    if(!admins) return res.status(500).json({message:"internal server error"});
    return res.status(200).json({admins});
}

export const getAdminById = async (req, res, next) => {
    const id = req.params.id;
  
    let admin;
    try {
      admin = await Admin.findById(id).populate("addedMovies");
    } catch (err) {
      return console.log(err);
    }
    if (!admin) {
      return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin });
  };