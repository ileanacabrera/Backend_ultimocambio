import { Router } from 'express';
import {  eliminarCategoria, obtenerCategorias,  registrarCategoria, actualizarCategoria  } from '../controllers/categorias.controller.js';
const router = Router();

// Ruta para obtener todos los Categorias

router.get('/categorias', obtenerCategorias);

router.post('/registrarcategoria', registrarCategoria);

router.patch('/actualizarcategoria/:id', actualizarCategoria);

router.delete('/eliminarcategoria/:id', eliminarCategoria);

export default router;