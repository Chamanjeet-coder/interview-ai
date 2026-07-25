import express from 'express';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from "./routes/interview.routes.js"
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config()

const app = express();
const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, '/../Frontend/dist');
const backendDistPath = path.join(__dirname, '/dist');
const resolvedFrontendDistPath = fs.existsSync(frontendDistPath) ? frontendDistPath : backendDistPath;

app.use(express.static(resolvedFrontendDistPath));
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.BASE_URL_FRONTENED,
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173'
        ];

        if (!origin || allowedOrigins.includes(origin) || origin.includes('192.168') || origin.includes('10.0')) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(resolvedFrontendDistPath, 'index.html'));
});

// Fallback to serve index.html for SPA routing
app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(resolvedFrontendDistPath, 'index.html'));
});

export default app;