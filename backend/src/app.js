import express from "express";
import cors from "cors";
import userRouter from "./routes/user_route.js";
import PostRouter from "./routes/post_route.js";

const app = express();
// Enable CORS for all routes
app.use(cors());
// To parse incoming JSON data in the request body
app.use(express.json());

app.use("/api/v1/users", userRouter);
// app.use('/api/v1/posts', postRouter);

app.use("/api/v1/posts", PostRouter);

//expamle route : http://localhost:4050/api/v1/users/register

export default app;