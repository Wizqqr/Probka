import express from 'express';
import { create, getAll, getOne } from '../controllers/newsController.js'
import checkAuth from '../utils/checkAuth.js';
const router = express.Router();

router.get('/getNews', getAll);

router.get('/getNews/:id', getOne);

router.post('/createNews', create);
export default router;
