var mongoose = require('mongoose');
var modelSchema = mongoose.Schema({
    name: {
        type: String,
        required: ["Escriba un Nombre"],
        minlength: [5, "El nombre es muy corto"],
        maxlength: [12, "El nombre es muy largo"]
    },
    email: {
        type: String,
        required: [true, "El correo electronico es obligatorio"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Use una direccion de email válida']
    },
    type: {
        type: String,
        enum: ["Alumno", "Maestro"],
        required: ["Escoja un tipo"]
    }
});
var zombie = mongoose.model("zombie", modelSchema);
module.exports = zombie;