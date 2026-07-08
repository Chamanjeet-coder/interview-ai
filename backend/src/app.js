import express from 'express';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from "./routes/interview.routes.js"
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(cors({
    origin: process.env.BASE_URL_FRONTENED,//test for railway
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

export default app;