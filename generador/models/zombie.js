var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    nombre: {
        type: String,
        minlength: [4, "El nombre es muy corto"],
        maxlength: [12, "El nombre es muy largo"],
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"]
    },
    type: {
        type: String,
        enum: ["Alumno Zombie", "Maestro Zombie"],
        required: [true, "El tipo de zombie es obligatorio"]
    }
});

var Zombie = mongoose.model("Zombie", modelSchema);
module.exports = Zombie;