// src/routes/estadisticas.routes.js
import { Router } from 'express';
import {
  totalVentasPorDia,
  totalVentasMes,
  totalVentasPorAnio,
  totalVentasPorEmpleado,
  totalComprasPorCliente,
  productosMasVendidos,
  ventasPorCategoria,
  eficienciaEmpleado,
  productosConMayorStock,
  productosMayorRotacion
} from '../controllers/estadisticas.controllers.js';

const router = Router();

router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasMes);
router.get('/totalventasporanio', totalVentasPorAnio);
router.get('/totalventasporempleado', totalVentasPorEmpleado);
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/productosmasvendidos', productosMasVendidos);
router.get('/ventasporcategoria', ventasPorCategoria);
router.get('/eficienciaempleado', eficienciaEmpleado);
router.get('/productosconmayorstock', productosConMayorStock);
router.get('/productosmayorrotacion', productosMayorRotacion);

export default router;
