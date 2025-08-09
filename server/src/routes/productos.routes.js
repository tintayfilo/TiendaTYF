import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// 📌 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// 📌 Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) }
    });
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// 📌 Crear un producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const nuevoProducto = await prisma.producto.create({
      data: { 
        nombre, 
        precio: Number(precio),
        descripcion: descripcion || null 
      }
    });
    res.json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// 📌 Actualizar un producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { nombre, precio, descripcion } = req.body;
    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: { 
        nombre, 
        precio: Number(precio),
        descripcion 
      }
    });
    res.json(productoActualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// 📌 Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;