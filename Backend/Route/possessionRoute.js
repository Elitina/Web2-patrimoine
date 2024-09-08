import express from 'express';
import {
  getPossessions,
  addPossession,
  updatePossession,
  closePossession,
  getPossessionByLibelle,
} from './../Controller/possessionController.js';

const router = express.Router();

router.get('/', getPossessions);
router.post('/', addPossession);
router.put('/:libelle', updatePossession);
router.patch('/:libelle/close', closePossession);
router.get('/:libelle', getPossessionByLibelle);

export default router;
