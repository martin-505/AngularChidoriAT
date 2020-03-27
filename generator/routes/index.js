var express = require('express');
var router = express.Router();
var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");

/* GET home page. */

router.get('/', function(req, res, next) {
    Zombie.find().exec(function(error, zombies) {
        if (!error) {
            console.log(zombies);
            res.render('index', { title: 'Alumnos', coleccion: zombies });
        } else {
            console.log(error);
        }
    });
});

router.get('/cerebros', function(req, res, next) {
    Cerebro.find().exec(function(error, cerebros) {
        if (!error) {
            console.log();
            res.render('cerebro/index', { title: 'Cerebros', coleccion: cerebros });
        } else {
            console.log(error);
        }
    });
});

router.get('/zombies/add', function(req, res) {
    res.render('add', { clas: 'alert alert-primary', text: false, mensaje: '' });
});

router.post('/zombies/new', function(req, res) {
    var zombie = req;
    var data = req.body;
    var nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });

    nuevoZombie.save(function(error) {

        if (error) {
            res.render('add', { clas: 'danger', text: error.errors, mensaje: '' });

        } else {
            res.render('add', { clas: 'success', text: false, mensaje: "Zombie Registrado" });
        }
    });
});

router.get('/cerebros/add', function(req, res) {
    res.render('cerebro/addCerebros', { clas: 'alert alert-primary', text: false, mensaje: '' });
});
router.post('/cerebros/new', function(req, res) {
    var data = req.body;
    var nuevoCerebro = new Cerebro({
        flavor: data.flavor,
        description: data.description,
        price: data.price,
        picture: data.picture
    });
    nuevoCerebro.save(function(error) {

        if (error) {
            res.render('cerebro/addCerebros', { clas: 'danger', text: error.errors, mensaje: '' });

        } else {
            res.render('cerebro/addCerebros', { clas: 'success', text: false, mensaje: "Cerebro Registrado" });
        }
    });
});

//editar zombie

router.get('/zombies/edit/:id', async function(req, res) {
    var zombie = await Zombie.findById(req.params.id);
    res.render('edit', { zombie: zombie, text: false, mensaje: '', clas: '' });
});

router.put('/zombie/edit/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.name = req.body.name;
        zombie.email = req.body.email;
        zombie.type = req.body.type;

        await zombie.save();

        res.redirect('/');
    } catch (error) {
        console.log(error)
        res.render('edit', { zombie: zombie, clas: 'danger', text: error.errors, mensaje: '' });
    }
});
// editar cerebro
router.get('/cerebros/edit/:id', async function(req, res) {
    var cerebro = await Cerebro.findById(req.params.id);
    console.log(cerebro);
    res.render('cerebro/edit', { cerebro: cerebro, text: false, mensaje: '', clas: '' });
});

router.put('/cerebro/edit/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.flavor = req.body.flavor;
        cerebro.description = req.body.description;
        cerebro.price = req.body.price;
        cerebro.picture = req.body.picture;
        await cerebro.save();
        res.redirect('/cerebros');
    } catch (error) {
        console.log(error);
        res.render('cerebro/edit', { cerebro: cerebro, clas: 'danger', text: error.errors, mensaje: '' })
    }
});
// eliminar zombie
router.get('/zombies/delete/:id', async function(req, res) {
    var zombie = await Zombie.findById(req.params.id);
    res.render('delete', { zombie: zombie });
});
router.delete('/zombie/delete/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});
// eliminar cerebro
router.get('/cerebros/delete/:id', async function(req, res) {
    var cerebro = await Cerebro.findById(req.params.id);
    res.render('cerebro/delete', { cerebro: cerebro });
});
router.delete('/cerebro/delete/:id', async function(req, res) {

    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.remove();
        res.redirect('/cerebros');
    } catch (error) {
        console.log(error);
    }


});

module.exports = router;