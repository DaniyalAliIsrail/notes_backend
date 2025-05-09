import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/post.Routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: [
      "https://notes-book-task-frontend-temp.vercel.app",
      "http://localhost:4000",
    ], // Allow both production and development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly define allowed methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ], // Explicitly define allowed headers
  })
);

app.use(express.json()); // client say any wala json data automatic parse krta hay or javascript obj may convert krta hay
app.use(cookieParser()); // middleware for cookie parsing
// middleware for user routes
app.use("/api/user", userRoutes);
// middleware for auth routes
app.use("/api/auth", authRoutes);
// post create routes
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// error handling middleware
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal server Error";
  res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

// mongoose.connect(process.env.DB_URI).then(()=>{
//     console.log("DATABASE CONNECTED");
// }).catch((err)=>{
//     (console.log("error",err));
// })

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // Increase from default 30s to 15s
    socketTimeoutMS: 45000, // Increase socket timeout
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// app.listen(PORT,()=>{
//     console.log(`server is running on post ${PORT}`);
// });
export default app;
