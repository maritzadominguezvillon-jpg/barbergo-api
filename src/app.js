import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import usuariosRoutes from './routes/usuariosRoutes.js';
import serviciosRoutes from './routes/serviciosRoutes.js';
import profesionalesRoutes from './routes/profesionalesRoutes.js';
import citasRoutes from './routes/citasRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

// Necesario para trabajar con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Carpeta pública para imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api', usuariosRoutes);
app.use('/api', serviciosRoutes);
app.use('/api', profesionalesRoutes);
app.use('/api', citasRoutes);
app.use('/api', loginRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API BarberGo'
    });
});

export default app;