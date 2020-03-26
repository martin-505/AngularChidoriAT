var express = require('express');
var router = express.Router();
const passport = require('passport');

var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");
var User = require('../models/user');

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
                res.render('/cerebros/edit', { cerebro: cerebro, mensajeErrorC: mensajeC });
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
router.get('/users/singup', (req, res) => {
    res.render('users/singup');
});

router.post('/users/singup', async(req, res) => {
    const errors = [];

    const { nombre, type, email, password, confirm_password } = req.body;
    console.log(req.body);
    if (password != confirm_password) {
        errors.push({ text: 'Passwords no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña es demaciado corta' });
    }
    if ((type.length != 6) && (type.length != 7)) {
        errors.push({ text: 'en el campo tipo debe de poner si usted es alumno o maestro' });
    }
    if (errors.length > 0) {
        res.render('users/singup', {
            errors,
            nombre,
            email,
            type
        })
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_mgs', 'el correo es existente');
            res.redirect('singup');
        } else {
            const newUser = new User({ nombre, email, type, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_mgs', 'esta registrado');
            res.redirect('/users/singin');
        }
    }
});

router.get('/users/singin', (req, res) => {
    res.render('users/singin');
});

router.post('/users/singin', passport.authenticate('local', {
    failureRedirect: '/users/singin',
    successRedirect: '/zombies',
    failureFlash: true
}));

router.get('/users/logout', (req, res) => {
    req.logOut();
    // req.flash('success_mgs', 'Has cerrado la secion');
    res.redirect('/users/singin');
});

module.exports = router;