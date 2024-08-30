import express from 'express';
import getTotalValueAtDate from './../Controller/patrimoineController.js';

const router = express.Router();

router.get('/totalValueAtDate', getTotalValueAtDate); // Assurez-vous que le chemin correspond à celui que vous utilisez dans Axios

export default router;
