import express from 'express';
import userRouter from './routes/user_route.js';

const app = express();
// To parse incoming JSON data in the request body
app.use(express.json());

app.use('/api/v1/users', userRouter);
// app.use('/api/v1/posts', postRouter);

//expamle route : http://localhost:4050/api/v1/users/register


export default app;