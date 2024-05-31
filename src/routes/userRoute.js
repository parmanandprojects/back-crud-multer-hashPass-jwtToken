import { Router } from "express";

import { uploads } from "../middlewares/multer.js";
import { addUser, deleteUser, getAllUser, updateUser } from "../controllers/user/user.controller.js";
import { UserLogin } from "../controllers/user/userAuthController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const userRoutes = Router();

userRoutes.post("/add-user",uploads.single("imageProfile"),addUser)
userRoutes.post("/delete-user/:id",deleteUser)
userRoutes.post("/update-user/:id",uploads.single("imageProfile"),updateUser)
userRoutes.get("/get-all-user",verifyToken,getAllUser)
userRoutes.post("/login-user",UserLogin)


export {userRoutes}
