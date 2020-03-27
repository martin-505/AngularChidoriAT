var mongoose = require('mongoose');
var modelSchema = mongoose.Schema({
    flavor: {
        type: String,
        enum: ["Chocolate", "Vainilla"],
        required: ["Escoja un sabor valido"]
    },
    description: {
        type: String,
        minlength: [6, "La descripcion es muy corta"],
        maxlength: [20, "La descripcion es muy larga"]
    },
    price: {
        type: Number,
        required: "Indique un price valido"
    },
    picture: {
        type: String
    }
});
var cerebro = mongoose.model("cerebro", modelSchema);
module.exports = cerebro;