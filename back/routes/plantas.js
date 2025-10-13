import express from 'express';
import * as plantas from '../controllers/plantas.js';

const router = express.Router();

router.get('/planta/:id',plantas.consultarPorId)
router.get('/plantas', plantas.consultarTodos);

export default router;