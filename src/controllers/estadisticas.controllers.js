import { pool2 } from '../db.js';

// Obtener el Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.fecha
        ORDER BY t.fecha; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};






// Obtener el Total de ventas por mes
export const totalVentasMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT t.mes, ROUND(SUM(hv.total_linea),1) AS total_ventas
FROM Hecho_Ventas hv
JOIN Dim_Tiempo t ON hv.dia = t.dia
GROUP BY t.mes
ORDER BY t.mes; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};




// Obtener el Total de ventas por Anio
export const totalVentasPorAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT t.año, ROUND(SUM(hv.total_linea), 2) AS total_ventas
FROM Hecho_Ventas hv
JOIN Dim_Tiempo t ON hv.fecha = t.fecha
GROUP BY t.año
ORDER BY t.año;
 `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};




export const totalVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
             ROUND(SUM(hv.total_linea), 2) AS total_ventas
      FROM Hecho_Ventas hv
      JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
      GROUP BY e.id_empleado
      ORDER BY total_ventas DESC;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron ventas por empleado.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las ventas por empleado.', error: error.message });
  }
};



export const totalComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
             ROUND(SUM(hv.total_linea), 2) AS total_compras
      FROM Hecho_Ventas hv
      JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
      GROUP BY c.id_cliente
      ORDER BY total_compras DESC;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron compras por cliente.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener compras por cliente.', error: error.message });
  }
};
 


export const productosMasVendidos = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT p.nombre_producto,
             SUM(hv.total_linea) AS total_ventas,
             SUM(hv.cantidad) AS cantidad_vendida
      FROM Hecho_Ventas hv
      JOIN Dim_Productos p ON hv.id_producto = p.id_producto
      GROUP BY p.id_producto
      ORDER BY total_ventas DESC;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron productos vendidos.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos más vendidos.', error: error.message });
  }
};



export const ventasPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT p.categoria,
             ROUND(SUM(hv.total_linea), 2) AS total_ventas
      FROM Hecho_Ventas hv
      JOIN Dim_Productos p ON hv.id_producto = p.id_producto
      GROUP BY p.categoria
      ORDER BY total_ventas DESC;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron ventas por categoría.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas por categoría.', error: error.message });
  }
};




export const eficienciaEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
             COUNT(*) AS cantidad_ventas,
             ROUND(SUM(hv.total_linea), 2) AS total_ventas
      FROM Hecho_Ventas hv
      JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
      GROUP BY e.id_empleado
      ORDER BY cantidad_ventas DESC;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron datos de eficiencia.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener eficiencia del empleado.', error: error.message });
  }
};



export const productosConMayorStock = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT nombre_producto, stock_actual
      FROM Dim_Productos
      ORDER BY stock_actual DESC
      LIMIT 10;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron productos con stock.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos con mayor stock.', error: error.message });
  }
};




export const productosMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(`
      SELECT p.nombre_producto,
             SUM(hv.cantidad) AS cantidad_vendida
      FROM Hecho_Ventas hv
      JOIN Dim_Productos p ON hv.id_producto = p.id_producto
      GROUP BY p.id_producto
      ORDER BY cantidad_vendida DESC
      LIMIT 10;
    `);
    if (result.length === 0) return res.status(404).json({ mensaje: 'No se encontraron productos con rotación.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos de alta rotación.', error: error.message });
  }
};







