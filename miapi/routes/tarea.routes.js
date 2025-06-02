import { Router } from 'express';
import {
  getAllTareas,
  getTareaById,
  postTarea,
  putTarea,
  deleteTarea
} from '../controllers/tarea.controller.js';

const tarea = Router();

tarea.get('/', getAllTareas);
tarea.get('/:id', getTareaById);
tarea.post('/', postTarea);
tarea.put('/:id', putTarea);
tarea.delete('/:id', deleteTarea);

export default tarea;
