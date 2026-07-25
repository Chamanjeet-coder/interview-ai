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
app.use(express.static(path.join(__dirname, "/../Frontend/dist")));
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow localhost and local network IPs in development
        if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('192.168') || origin.includes('10.0')) {
            callback(null, true);
        } else if (origin === process.env.BASE_URL_FRONTENED) {
            // Allow production frontend URL
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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

// Fallback to serve index.html for SPA routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../Frontend/dist/index.html"));
});

export default app;