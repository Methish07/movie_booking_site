import express from "express"
import { deleteUser, getAllUsers, getBookingOfUser, login, signUp, upadateUser,getUserById } from "../controllers/user-controller";
import { getBookingById } from "../controllers/booking-controller";

const userRouter=express.Router();

userRouter.get("/",getAllUsers);

userRouter.post("/signup",signUp);

userRouter.put("/:id",upadateUser);

userRouter.delete("/:id",deleteUser);

userRouter.post("/login",login);

userRouter.get("/bookings/:id",getBookingOfUser);

userRouter.get("/:id", getUserById);

export default userRouter;