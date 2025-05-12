import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVenta, registrarVenta, actualizarVenta } from '../controllers/ventas.controller.js';
import { obtenerVentaPorId } from '../controllers/ObtenerVentasPorId.controller.js';

const router = Router();

// Ruta para obtener todos los datos de Ventas
router.get('/ventas', obtenerVentasConDetalles);
router.get('/obtenerventas', obtenerVentas);
router.delete('/eliminarventa/:id_venta', eliminarVenta);
router.patch('/actualizarventa/:id_venta', actualizarVenta);

// Cambié el método de 'patch' a 'get' para que coincida con la solicitud del frontend
router.get('/obtenerventaporid/:id_venta', obtenerVentaPorId);

router.post('/registrarventa', registrarVenta);

export default router;
