import { pool } from '../db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM productos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del producto no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del producto.'
    });
  }
};

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const { 
      nombre_producto, 
      descripcion_producto, 
      id_categoria, 
      precio_unitario, 
      stock, 
      imagen 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !id_categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [
        nombre_producto,
        descripcion_producto || null, // Puede ser opcional
        id_categoria,
        precio_unitario,
        stock,
        imagen || null // Puede ser opcional
      ]
    );

    res.status(201).json({ 
      id_producto: result.insertId,
      mensaje: 'Producto registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error.message
    });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Productos WHERE id_producto = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error
    });
  }
};


// Actualizar un producto completamente
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nombre_producto, 
      descripcion_producto, 
      id_categoria, 
      precio_unitario, 
      stock, 
      imagen 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !id_categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    // Verificar si el producto existe
    const [productoExistente] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [id]);
    if (productoExistente.length === 0) {
      return res.status(404).json({
        mensaje: `El producto con ID ${id} no fue encontrado.`
      });
    }

    // Ejecutar la actualización
    const [result] = await pool.query(
      `UPDATE Productos SET 
        nombre_producto = ?, 
        descripcion_producto = ?, 
        id_categoria = ?, 
        precio_unitario = ?, 
        stock = ?, 
        imagen = ? 
      WHERE id_producto = ?`,
      [
        nombre_producto,
        descripcion_producto || null,
        id_categoria,
        precio_unitario,
        stock,
        imagen || null,
        id
      ]
    );

    res.json({
      mensaje: 'Producto actualizado exitosamente',
      affectedRows: result.affectedRows
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el producto.',
      error: error.message
    });
  }
};



