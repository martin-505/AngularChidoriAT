const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// usuarios
var Usuario = new Schema({
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
    password: {
        type: String,
        minlength: [4, "La contraseña es muy corta"],
        required: [true, "La contraseña es obligatoria"]
    },
    type: {
        type: String,
        enum: ["Normal", "Administrador"],
        required: [true, "El tipo de zombie es obligatorio"]
    }
}, {
    timestamps: true
});

Usuario.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

Usuario.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = model('User', Usuario);