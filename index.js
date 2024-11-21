import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js'

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.set('trust proxy', 1); // Trust the first proxy (Render sets this header)

app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/', rewardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
