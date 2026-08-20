const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar el body en formato JSON
app.use(express.json());

// Arreglo de datos mockeados en memoria[cite: 2]
let productos = [
  { id: 1, nombre: "Teclado Mecánico", precio: 45000 },
  { id: 2, nombre: "Mouse Inalámbrico", precio: 22000 }
];

// 1. GET - Listar todos los registros (200 OK)[cite: 2]
app.get('/api/productos', (req, res) => {
  res.status(200).json(productos);
});

// 2. GET por ID - Consultar registro individual (200 OK / 404 Not Found)[cite: 2]
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.status(200).json(producto);
});

// 3. POST - Crear un nuevo registro (201 Created / 400 Bad Request)[cite: 2]
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;

  // Validación de campos obligatorios y tipos de datos[cite: 2]
  if (!nombre || precio === undefined || typeof precio !== 'number') {
    return res.status(400).json({ mensaje: "Los campos 'nombre' y 'precio' (número) son obligatorios." });
  }

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// 4. PUT - Modificar un registro existente (200 OK / 400 Bad Request / 404 Not Found)[cite: 2]
app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;

  const indice = productos.findIndex(p => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  if (!nombre || precio === undefined || typeof precio !== 'number') {
    return res.status(400).json({ mensaje: "Los campos 'nombre' y 'precio' (número) son obligatorios." });
  }

  productos[indice] = { id, nombre, precio };
  res.status(200).json(productos[indice]);
});

// 5. DELETE - Eliminar un registro (204 No Content / 404 Not Found)[cite: 2]
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex(p => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  productos.splice(indice, 1);
  res.status(204).send();
});

// Inicio del servidor[cite: 2]
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});