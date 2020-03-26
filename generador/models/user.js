const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

var Usuario = new Schema({
    name: {
        type: String,
        minlength: [12, "La descripcion es muy corta"],
        maxlength: [40, "El nombre es muy larga"],
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"]
    },
    password: {
        type: String,
        minlength: [6, "La contraseña es muy corta"],
        maxlength: [24, "La contraseña es muy larga"],
        required: [true, "La contraseña es obligatoria"]
    },
    type: {
        type: String,
        enum: ["Administrador", "Normal"],
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