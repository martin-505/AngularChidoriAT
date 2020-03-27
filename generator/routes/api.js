var express = require('express');
var router = express.Router();

var Zombie = require('../models/zombie');
var Cerebro = require('../models/cerebro');

//Zombies

router.get('/zombies', async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if (!error) {
            return res.status(200).json(zombies);
        } else {
            return res.status(500).json(error);
        }
    });
});

router.post('/zombies/new', function(req, res) {
    var data = req.body;

    var nuevoZombie = new Zombie({
        nombre: data.nombre,
        email: data.email,
        type: data.type
    });
    nuevoZombie.save(function(error) {
        if (error) {
            if (error.errors.nombre) {
                return res.status(500).json({ mensajeError: error.errors.nombre.message, mensajeExito: '' });
            }
            if (error.errors.email) {
                return res.status(500).json({ mensajeError: error.errors.email.message, mensajeExito: '' });
            }
            if (error.errors.type) {
                return res.status(500).json({ mensajeError: error.errors.type.message, mensajeExito: '' });
            }
        } else {
            return res.status(200).json({ mensajeError: '', mensajeExito: 'Se agregó un nuevo cerebro!' });
        }
    });
});

router.delete('/zombies/delete/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();

        res.status(200).json({ mensajeError: '', mensajeExito: 'Se eliminó un zombie!' });
    } catch (e) {
        res.status(500).json({ mensajeError: e });
    }
});

router.put('/zombies/edit/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.nombre = req.body.nombre;
        zombie.email = req.body.email;
        zombie.type = req.body.type;

        await zombie.save(function(error) {
            if (error) {
                if (error.errors.nombre) {
                    return res.status(500).json({ mensajeError: error.errors.nombre.message, mensajeExito: '' });
                }
                if (error.errors.email) {
                    return res.status(500).json({ mensajeError: error.errors.email.message, mensajeExito: '' });
                }
                if (error.errors.type) {
                    return res.status(500).json({ mensajeError: error.errors.type.message, mensajeExito: '' });
                }
            } else {
                return res.status(200).json({ mensajeError: '', mensajeExito: 'Se agregó un nuevo zombie!' });
            }
        });

    } catch (e) {
        res.status(500).json({ mensajeError: e });
    }
});

//Cerebros

router.get('/cerebros', async(req, res) => {
    Cerebro.find().exec((error, cerebros) => {
        if (!error) {
            return res.status(200).json(cerebros);
        } else {
            return res.status(500).json(error);
        }
    });
});

router.post('/cerebros/new', function(req, res) {
    var dataC = req.body;

    var nuevoCerebro = new Cerebro({
        flavor: dataC.flavor,
        description: dataC.description,
        price: dataC.price,
        picture: dataC.picture
    });
    nuevoCerebro.save(function(error) {
        if (error) {
            if (error.errors.flavor) {
                return res.status(500).json({ mensajeErrorC: error.errors.flavor.message, mensajeExitoC: '' });
            }
            if (error.errors.description) {
                return res.status(500).json({ mensajeErrorC: error.errors.description.message, mensajeExitoC: '' });
            }
            if (error.errors.price) {
                return res.status(500).json({ mensajeErrorC: error.errors.price.message, mensajeExitoC: '' });
            }
            if (error.errors.picture) {
                return res.status(500).json({ mensajeErrorC: error.errors.picture.message, mensajeExitoC: '' });
            }
        } else {
            res.status(200).json({ mensajeErrorC: '', mensajeExitoC: 'Se agregó un nuevo cerebro!' });
        }
    });
});

router.delete('/cerebros/delete/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.remove();

        res.status(200).json({ mensajeError: '', mensajeExito: 'Se eliminó un cerebro correctamente!' });
    } catch (error) {
        res.status(500).json({ mensajeError: e });
    }
});

router.put('/cerebros/edit/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.flavor = req.body.flavor;
        cerebro.description = req.body.description;
        cerebro.price = req.body.price;
        cerebro.picture = req.body.picture;

        await cerebro.save(function(error) {
            if (error) {
                if (error.errors.flavor) {
                    return res.status(500).json({ mensajeErrorC: error.errors.flavor.message, mensajeExitoC: '' });
                }
                if (error.errors.description) {
                    return res.status(500).json({ mensajeErrorC: error.errors.description.message, mensajeExitoC: '' });
                }
                if (error.errors.price) {
                    return res.status(500).json({ mensajeErrorC: error.errors.price.message, mensajeExitoC: '' });
                }
                if (error.errors.picture) {
                    return res.status(500).json({ mensajeErrorC: error.errors.picture.message, mensajeExitoC: '' });
                }
            } else {
                return res.status(200).json({ mensajeErrorC: '', mensajeExitoC: 'Se agregó un nuevo cerebro!' });
            }
        });

    } catch (e) {
        res.status(500).json({ mensajeErrorC: e });
    }
});

//Usuarios

module.exports = router;