
import express from 'express';
import {connectdb} from './db/config.js';
import userRouter from "./routes/userRoutes.js"
import taskRouter from './routes/taskRoutes.js';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';



const app = express();
const port = process.env.PORT;

connectdb();
app.use(express.json());
app.use(cookieParser())
app.use(userRouter)
app.use('/task', taskRouter);
app.get('/', (req, res)=>{
  res.send('hello node');
});


app.listen(port, ()=>{
  console.log(`server is listening at ${port}`);
});

