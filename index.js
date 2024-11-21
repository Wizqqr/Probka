import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import redis from 'redis';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js'
import checkAuth from './utils/checkAuth.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/', rewardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello to API!</h1>');  // Ответ на корневой маршрут
});