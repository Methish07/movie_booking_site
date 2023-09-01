import express from 'express'
import { addMovie, getMovie, getAllMovies, tempMovieAdder } from '../controllers/movie-controller';

const movieRouter=express.Router();

movieRouter.post("/",addMovie);

movieRouter.get("/",getAllMovies);

movieRouter.get("/:id",getMovie);

movieRouter.get("/temp/temp",tempMovieAdder);

export default movieRouter;