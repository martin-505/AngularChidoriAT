var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session');

var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");
var User = require('../models/user');
const { isAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    Zombie.find().exec(function(error, zombies) {
        if (!error) {
            console.log(zombies);
            res.render('index', { title: 'Colección de Zombies', coleccion: zombies });
        }
    });
});

router.get('/zombies/add', function(req, res) {
    res.render('add', { mensajeError: '', mensajeExito: '' });
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
            var mensaje = error.message;
            res.render('add', { mensajeError: mensaje, mensajeExito: '' });
        } else {
            res.render('add', { mensajeError: '', mensajeExito: 'Se agregó un nuevo zombie!' });
        }
    });
});


router.get("/cerebros", function(req, res) {
    Cerebro.find().exec(function(error, cerebros) {
        if (!error) {
            console.log(cerebros);
            res.render('cerebros/index.ejs', { title: 'Colección de Cerebros', coleccion: cerebros });
        }
    });
});

router.get('/cerebros/add', function(req, res) {
    res.render('cerebros/add', { mensajeErrorC: '', mensajeExitoC: '' });
});

router.post('/cerebros/new', function(req, res) {
    var dataC = req.body;

    var nuevoCerebro = new Cerebro({
        description: dataC.description,
        flavor: dataC.flavor,
        price: dataC.price,
        picture: dataC.picture
    });
    nuevoCerebro.save(function(error) {
        if (error) {
            var mensajeC = error.message;
            res.render('cerebros/add', { mensajeErrorC: mensajeC, mensajeExitoC: '' });
        } else {
            res.render('cerebros/add', { mensajeErrorC: '', mensajeExitoC: 'Se agregó un nuevo cerebro!' });
        }
    });
});

router.get('/zombies/edit/:id', async function(req, res) {
    var zombie = await Zombie.findById(req.params.id);

    res.render('edit', { zombie: zombie });
});

router.put('/zombies/edit/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.nombre = req.body.nombre;
        zombie.email = req.body.email;
        zombie.type = req.body.type;

        await zombie.save(function(error) {
            if (error) {
                var mensajeC = error.message;
                res.render('edit', { zombie: zombie, mensajeErrorC: mensajeC });
            } else {
                res.redirect('/');
            }
        });

    } catch (e) {
        res.render('edit', { zombie: zombie });
    }
});

router.get('/zombies/delete/:id', async function(req, res) {
    var zombie = await Zombie.findById(req.params.id);

    res.render('delete', { zombie: zombie });
});

router.delete('/zombies/delete/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();

        res.redirect('/');
    } catch (e) {
        res.render('delete', { zombie: zombie });
    }
});

router.get('/cerebros/edit/:id', async function(req, res) {
    var cerebro = await Cerebro.findById(req.params.id);

    res.render('cerebros/edit', { cerebro: cerebro, mensajeErrorC: '', mensajeExitoC: '' });
});

router.put('/cerebros/edit/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.description = req.body.description;
        cerebro.flavor = req.body.flavor;
        cerebro.price = req.body.price;
        cerebro.picture = req.body.picture;

        await cerebro.save(function(error) {
            if (error) {
                var mensajeC = error.message;
                res.render('cerebros/edit', { cerebro: cerebro, mensajeErrorC: mensajeC });
            } else {
                res.redirect('/cerebros');
            }
        });

    } catch (e) {
        res.render('/cerebros/edit', { cerebro: cerebro, mensajeErrorC: '' });
    }
});

router.get('/cerebros/delete/:id', async function(req, res) {
    var cerebro = await Cerebro.findById(req.params.id);

    res.render('cerebros/delete.ejs', { cerebro: cerebro });
});

router.delete('/cerebros/delete/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.remove();

        res.redirect('/cerebros');
    } catch (e) {
        res.render('/cerebros/delete', { cerebro: cerebro });
    }
});

//usuario

// hay que modificar los ifs
router.get('/users/singup', (req, res) => {
    res.render('users/singup', { mensajeChido: '', mensajeSad: '' });
});

router.post('/users/singup', async(req, res) => {
    const { nombre, type, email, password, confirm_password } = req.body;
    console.log(req.body);
    if (nombre.length == 0) {
        res.render('users/singup', { mensajeChido: '', mensajeSad: 'Debe de poner el nombre' });
    }
    if (password != confirm_password) {
        res.render('users/singup', { mensajeChido: '', mensajeSad: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        res.render('users/singup', { mensajeChido: '', mensajeSad: 'La contraseña es muy corta' });
    }
    if ((type.length != 6) && (type.length != 13)) {
        res.render('users/singup', { mensajeChido: '', mensajeSad: 'Solo se puede elejir entre "Normal" o "Administrador"' });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            res.render('users/singup', { mensajeChido: '', mensajeSad: 'El correo ya existe, seleccione otro' });
        } else {
            const newUser = new User({ nombre, email, type, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save(function(error) {
                if (error) {
                    var mensaje = error.message;
                    res.render('users/singup', { mensajeChido: '', mensajeSad: 'algun capo falta por llenar' });
                } else {
                    res.render('users/singin', { mensajeChido: 'Se ha registrado!', mensajeSad: '' });

                }
            });

        }
    }
});

router.get('/users/singin', (req, res) => {
    res.render('users/singin', { mensajeChido: '', mensajeSad: '' });
});

router.post('/users/singin', passport.authenticate('local', {
    failureRedirect: '/users/singin',
    successRedirect: '/'
}));

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.render('users/singin', { mensajeChido: 'Se a cerrado la sesion', mensajeSad: '' });
});

module.exports = router;