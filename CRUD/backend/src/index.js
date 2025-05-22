import 'reflect-metadata';

import express from 'express';

import AppDataSource from './data-source.js';
import actividadRoutes from './routes/actividad.routes.js';

console.log('Conectando a:', process.env.DB_HOST, process.env.DB_NAME);
AppDataSource.initialize()
    .then(()=> {
        const app = express();
        app.use(express.json());
        app.use('/api/actividades', actividadRoutes);
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servivodr escuchando en puerto ${PORT}`);
        });
    })
    .catch(error => console.log(error));