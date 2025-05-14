import { Router } from 'express';
import {  obtenerProductos, obtenerProducto, registrarProducto, eliminarProducto } from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID
router.get('/producto/:id', obtenerProducto);

router.post('/registrarproducto', registrarProducto);

router.post('/eliminarproducto', eliminarProducto);

export default router;