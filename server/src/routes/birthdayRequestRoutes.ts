import express from 'express';
import { fetchMonthlyOverview } from '../controllers/birthdayRequestController';

const router = express.Router();

router.get('/monthly-overview', fetchMonthlyOverview);

export default router;
