import Tarea from '../models/tarea.model.js';
import mongoose from 'mongoose';

export const getAllTareas = async (req, res) => {
    console.log('Obtiene todas las tareas');
    try {
        const tareas = await Tarea.find({}, { __v: 0 });
        if (tareas.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron las tareas'
            });
        }
        return res.status(200).json({ tareas });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener las tareas'
        });
    }
};

export const getTareaById = async (req, res) => {
    console.log('TAREA POR ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const tarea = await Tarea.findById(id);
        if (!tarea) {
            return res.status(404).json({
                msg: 'Tarea no encontrada'
            });
        }
        return res.status(200).json({ tarea });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener la tarea'
        });
    }
};

export const postTarea = async (req, res) => {
    console.log('POST TAREA');
    const body = req.body;
    const tarea = new Tarea(body);

    try {
        const validationError = tarea.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({ error: errorMessages });
        }
        await tarea.save();
        return res.status(201).json({ tarea });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al guardar la tarea'
        });
    }
};

export const putTarea = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const tarea = await Tarea.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!tarea) {
            return res.status(404).json({
                msg: 'Tarea no encontrada'
            });
        }
        return res.status(200).json({ tarea });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar la tarea'
        });
    }
};

export const deleteTarea = async (req, res) => {
    console.log('DELETE TAREA');
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const tarea = await Tarea.findByIdAndDelete(id);
        if (!tarea) {
            return res.status(404).json({
                msg: 'Tarea no encontrada'
            });
        }
        return res.status(200).json({
            msg: 'Tarea eliminada',
            tarea
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar la tarea'
        });
    }
};
