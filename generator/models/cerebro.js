var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    description: {
        type: String,
        minlength: [6, "La descripcion es muy corta"],
        maxlength: [40, "La descripcion es muy larga"],
        required: [true, "La descripción es obligatoria"]
    },
    flavor: {
        type: String,
        minlength: [5, "El nombre del sabor es muy corto"],
        maxlength: [12, "El nombre del sabor es muy largo"],
        enum: ["chocolate", "vainilla"],
        required: [true, "El nombre del sabor es obligatorio"]
    },
    price: {
        type: Number,
        min: [1, "El iq minimo es de 1"],
        max: [201, "El iq máximo es de 201"],
        required: [true, "El iq es obligatorio"]
    },
    picture: {
        type: String,
        minlength: [6, "El nombre de la imagen es muy corto"],
        maxlength: [24, "El nombre de la imagen es muy largo"],
        required: [true, "El nombre de la imagen es obligatorio"]
    }
});

var Cerebro = mongoose.model("Cerebro", modelSchema);
module.exports = Cerebro;