let bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const Schema = mongoose.Schema

var modelSchema = new Schema({
    username: {
        type: String,
        required: ["Escoja un Nombre de usuario valido"],
        match: [/^[a-zA-Z]{3,15}[ ]{0,1}[a-zA-Z]{0,15}$/, 'Use Un Nombre Válido']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        unique: true,
        required: 'La Direccion de Email es Requerida',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Use una direccion de email válida']
    },
    rol: {
        type: String,
        enum: ['Creator', 'Developer', 'Designer'],
        required: "Seleccione un Rol"
    },
    profileImg: {
        type: String,
        required: 'Agregue una foto de perfil'
    },
    password: {
        type: String,
        required: 'Introduzca una contraseña'
    }
})

modelSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

modelSchema.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}


module.exports = mongoose.model('users', modelSchema);