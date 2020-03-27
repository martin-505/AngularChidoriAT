let express = require('express');
let router = express.Router();
let Zombie = require("../models/zombie");
let Cerebro = require("../models/cerebro");
let Usuario = require("../models/users");
let controladorUsuario = require('../controladores/userController');
let passportConfig = require('../config/passport');
let jwt = require('jsonwebtoken');

router.get('/zombies', async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if (!error) {
            res.status(200).json(zombies);
            console.log(zombies);
        } else {
            res.status(500).json(error);
        }
    });
});

router.get('/zombie/:id', async(req, res) => {
    Zombie.findById(req.params.id).exec((error, zombie) => {
        if (!error) {
            res.status(200).json(zombie);

        } else {
            res.status(500).json(error);

        }
    });
});

router.get('/cerebro/:id', async(req, res) => {
    Cerebro.findById(req.params.id).exec((error, cerebro) => {
        if (!error) {
            res.status(200).json(cerebro);

        } else {
            res.status(500).json(error);

        }
    });
});


router.get('/cerebros', async function(req, res) {
    Cerebro.find().exec((error, cerebros) => {
        if (!error) {
            res.status(200).json(cerebros);
            console.log(cerebros);
        } else {
            res.status(500).json(error);
        }
    });
});

router.post('/zombies/new', function(req, res) {
    let zombie = req;
    let data = req.body;
    let nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });

    nuevoZombie.save(function(error) {

        if (error) {
            res.status(500).json({ clas: 'danger', text: error.errors, mensaje: '' });

        } else {
            res.status(200).json({ clas: 'success', text: false, mensaje: "Zombie Registrado" });
        }
    });
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
            //res.send(error);
            res.status(500).json({ clas: 'danger', text: error.errors, mensaje: '' });

        } else {
            res.status(200).json({ clas: 'success', text: false, mensaje: "Zombie Registrado" });
        }
    });
});

router.delete('/zombie/delete/:id', async function(req, res) {
    let zombie = await Zombie.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
router.delete('/cerebro/delete/:id', async function(req, res) {
    let cerebro = await Cerebro.findByIdAndDelete(req.params.id);
    res.redirect('/');
});



router.put('/zombie/edit/:id', async function(req, res) {

    var zombie = await Zombie.findById(req.params.id);
    zombie.name = req.body.name;
    zombie.email = req.body.email;
    zombie.type = req.body.type;

    await zombie.save(function(error) {
        if (error) {
            //res.send(error);
            res.status(500).json({ clas: 'danger', text: error.errors, mensaje: '' });

        } else {
            res.status(200).json({ clas: 'success', text: false, mensaje: "Zombie Editado" });
        }
    });
});

router.put('/cerebro/edit/:id', async function(req, res) {

    var cerebro = await Cerebro.findById(req.params.id);
    cerebro.flavor = req.body.flavor;
    cerebro.description = req.body.description;
    cerebro.price = req.body.price;
    cerebro.picture = req.body.picture;

    await cerebro.save(function(error) {
        if (error) {
            //res.send(error);
            res.status(500).json({ clas: 'danger', text: error.errors, mensaje: '' });

        } else {
            res.status(200).json({ clas: 'success', text: false, mensaje: "Zombie Editado" });
        }
    });

});


router.post('/register', function(req, res, next) {
    const nuevoUsuario = new Usuario({
        username: req.body.username,
        email: req.body.email,
        rol: req.body.rol,
        profileImg: req.body.profileImg,
        password: Usuario.hashPassword(req.body.password)
    });

    let promise = nuevoUsuario.save();

    promise.then(function(doc) {
        return res.status(201).json(doc);
    });

    promise.catch(function(err) {
        return res.status(501).json({ message: 'Error al registar usuario', err });
    });
});

router.post('/login', function(req, res, next) {
    let promise = Usuario.findOne({ email: req.body.email }).exec();

    promise.then(function(doc) {
        if (doc) {
            if (doc.isValid(req.body.password)) {
                let token = jwt.sign({ username: doc.username, rol: doc.rol, profileImg: doc.profileImg }, 'secret', { expiresIn: '3h' });
                return res.status(200).json(token);
            } else {
                return res.status(501).json({ message: 'Credenciales inavlidas' });
            }
        } else {
            return res.status(501).json({ message: 'Email no registrado' });
        }
    });

    promise.catch(function(err) {
        return res.status(501).json({ message: 'Internal Error', error: err });
    });
});

router.get('/username', verifyToken, function(req, res, next) {
    return res.status(200).json(decodedToken);
});
var decodedToken = '';

function verifyToken(req, res, next) {
    let token = req.query.token;
    jwt.verify(token, 'secret', function(err, tokendata) {
        if (err) {
            return res.status(400).json({ message: 'Unauthorized Request' });
        }
        if (tokendata) {
            decodedToken = tokendata;
            console.log(tokendata);
            next();
        }
    })
}


module.exports = router;