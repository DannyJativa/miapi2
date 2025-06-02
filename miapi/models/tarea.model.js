import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: false
  },
  contacto: {
    type: [String],
    required: false
  }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;
