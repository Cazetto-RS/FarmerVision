import express from 'express';
import * as usuario from '../controllers/usuario.js';
import autenticar from "../middleware/autenticacao.js";

const router = express.Router();

router.get('/usuario/id/:id', autenticar, usuario.consultarPorId)
router.get('/usuarios', autenticar, usuario.consultarTodos);
router.get('/usuario/email/:email', autenticar, usuario.consultarPorEmail);

router.post('/usuario/cadastrar',usuario.cadastrar);
router.post('/usuario/logar',usuario.login);

router.delete('/usuario/:id', autenticar, usuario.deletar);

export default router;