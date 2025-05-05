import { Router } from 'express';
import {  obtenerClientes, registrarClientes } from '../controllers/clientes.controller.js';
const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);
router.post('/registrarcliente', registrarClientes);

export default router;