import tarea from './tarea.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/tarea', tarea);

export default indexRoutes;
