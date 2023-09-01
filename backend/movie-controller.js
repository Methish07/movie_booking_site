import jwt from "jsonwebtoken"
import Movie from '../models/movie'
import mongoose from "mongoose";
import Admin from "../models/Admin";
import axios from 'axios'

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "token not found" });
    }
    let adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        else {
            adminId = decrypted.id;
            return;
        }
    });
    const { title, description, actors, releaseDate, posterUrl, featured } = req.body;
    if (!title && title.trim() === "" && !description && description.trim() === "" && !authors && !releaseDate && !posterUrl && posterUrl.trim() == "" && !featured) {
        return res.status(422).json({ message: "invalid inputs" });
    }
    let movie;
    try {
        movie = new Movie({
            title, description, actors,
            releaseDate: new Date(`${releaseDate}`),
            posterUrl, featured,
            admin: adminId
        });
        const session = await mongoose.startSession();
        const AdminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({ session });
        AdminUser.addedMovies.push(movie);
        await AdminUser.save({ session });
        await session.commitTransaction();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
    if (!movie) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(201).json(movie);
}

export const getAllMovies = async (req, res, next) => {

    let movies;
    try {
        movies = await Movie.find();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
    if (!movies) {
        return res.status(500).json({ message: "something went wrong" });
    }
    return res.status(200).json({ movies });
}

export const getMovie = async (req, res, next) => {
    let movie;
    const id = req.params.id;
    try {
        movie = await Movie.findById(id);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
    if (!movie) {
        return res.status(500).json({ message: "something went wrong" });
    }
    return res.status(200).json(movie);
}

export const tempMovieAdder = async (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com/',
        headers: {
            'X-RapidAPI-Key': 'fb0a39d437msh61f745319c3541bp16790bjsndb2b27a3b95a',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };
    let response,list=[],movie;
    try {
         response = await axios.request(options);
        for(let i=0;i<20;i++){
            const item={
                title:response.data[i].title,
                year:response.data[i].year,
                image:response.data[i].image,
                desc:response.data[i].description,
            }
            list.push(item);
            const adminId="6497de4c3955341bced7373f";
            movie = new Movie({
                title:item.title, description:item.desc, actors:[" "],
                releaseDate: new Date(`${item.year}`),
                posterUrl:item.image, featured:true,
                admin:adminId,
            });
            const session = await mongoose.startSession();
            const AdminUser = await Admin.findById(adminId);
            session.startTransaction();
            await movie.save({ session });
            AdminUser.addedMovies.push(movie);
            await AdminUser.save({ session });
            await session.commitTransaction();
        }
        console.log(list);
        
    } catch (error) {
        console.error(error);
    }
    if(!response) return res.status(500).json({message:"unexpected error"});
    return res.status(200).json(response);


}