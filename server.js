import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./src/config/Dbconnect.js";
import { userRoutes } from "./src/routes/userRoute.js";
const app = express();
app.use(cors());

app.use("/images", express.static("./public"));
dotenv.config();
dbConnect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running on", process.env.PORT);
});
