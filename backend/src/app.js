import express from 'express';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from "./routes/interview.routes.js"
import dotenv from 'dotenv';
import path from 'path';

dotenv.config()

const app = express();
const __dirname = path.resolve();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "/../frontend/dist")));
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