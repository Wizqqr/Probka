import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import multer from 'multer';
dotenv.config();

const app = express();

connectDB();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors());
app.set('trust proxy', 1); 

app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/', rewardRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
