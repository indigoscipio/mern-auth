import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { notFound, handleError } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

//MIDDLEWARES
app.use(handleError);
app.use(notFound);

//LISTEN

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to port... ${PORT}`);
});
