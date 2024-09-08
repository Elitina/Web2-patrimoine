import express from 'express';
import {getTotalValueAtDate, getValuesByDateRange } from './../Controller/patrimoineController.js';


const router = express.Router();


router.get('/date', getTotalValueAtDate);
router.get('/range', getValuesByDateRange);




export default router;
