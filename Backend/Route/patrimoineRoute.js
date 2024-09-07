import express from 'express';
import getTotalValueAtDate from './../Controller/patrimoineController.js';

const router = express.Router();

router.get('/totalValueAtDate', getTotalValueAtDate);

export default router;
