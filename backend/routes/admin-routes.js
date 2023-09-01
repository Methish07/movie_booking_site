import express from "express";
import {
  addAdmin,
  login,
  getAdminById,
  getAdmins,
} from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", login);
adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById);

export default adminRouter;