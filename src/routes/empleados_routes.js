import { Router } from 'express';
import {obtenerEmpleados, registrarEmpleado} from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los Empleados

router.get('/empleados', obtenerEmpleados);

router.get('/registrarempleado', registrarEmpleado);

export default router;