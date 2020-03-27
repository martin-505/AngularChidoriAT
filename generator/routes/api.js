var express = require('express');
const { session } = require('express-session');
const passport = require('passport');
var router = express.Router();

var Zombie = require('../models/zombie');
var Cerebro = require('../models/cerebro');
const User = require('../models/user');
const { isAuthenticated } = require('../config/auth');;

//Zombies

router.get('/zombies', isAuthenticated, async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if (!error) {
            return res.status(200).json(zombies);
        } else {
            return res.status(500).json(error);
        }
    });
});

router.post('/zombies/new', isAuthenticated, function(req, res) {
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

router.delete('/zombies/delete/:id', isAuthenticated, async function(req, res) {
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

router.get('/cerebros', isAuthenticated, async(req, res) => {
    Cerebro.find().exec((error, cerebros) => {
        if (!error) {
            return res.status(200).json(cerebros);
        } else {
            return res.status(500).json(error);
        }
    });
});

router.post('/cerebros/new', isAuthenticated, function(req, res) {
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

router.delete('/cerebros/delete/:id', isAuthenticated, async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.remove();

        res.status(200).json({ mensajeError: '', mensajeExito: 'Se eliminó un cerebro correctamente!' });
    } catch (error) {
        res.status(500).json({ mensajeError: e });
    }
});

router.put('/cerebros/edit/:id', isAuthenticated, async function(req, res) {
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
router.post('/users/singup', async(req, res) => {
    const { nombre, type, email, password, confirm_password } = req.body;
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
        return res.status(500).json({ mensajeChido: '', mensajeSad: 'El correo ya existe, seleccione otro' });
    } else {
        const newUser = new User({ nombre, email, type, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save(function(error) {
            if (error) {
                return res.status(500).json({ mensajeChido: '', mensajeSad: 'algun capo falta por llenar' });
            }
            if (error.errors.nombre) {
                return res.status(500).json({ mensajeSad: error.errors.nombre.message, mensajeChido: '' });
            }
            if (error.errors.password !== error.errors.confirm_password) {
                return res.status(500).json({ mensajeSad: 'las contraseñas no coinciden', mensajeChido: '' });
            }
            if (error.errors.password) {
                return res.status(500).json({ mensajeSad: error.errors.password.message, mensajeChido: '' });
            } else {
                return res.status(200).json({ mensajeSad: '', mensajeChido: 'Se ha registrado!' });
            }
        });

    }

});

router.post('/users/singin', passport.authenticate('local', {
    failureRedirect: '/users/singin',
    successRedirect: '/'
}), async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send('el correo existe');
    if (user.password !== password) return res.status(401).send('contraseña erronea');
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    return res.status(200).json({ mensajeChido: 'Se a cerrado la sesion', mensajeSad: '' });
});




module.exports = router;