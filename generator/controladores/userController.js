const passport = require('passport');
const Usuario = require('../models/users');

exports.postSignUp = (req, res, next) => {
    const nuevoUsuario = new Usuario({
        username: req.body.username,
        email: req.body.email,
        rol: req.body.rol,
        profileImg: req.body.profileImg,
        password: req.body.password
    });

    Usuario.findOne({ email: req.body.email }, (err, usuarioExistente) => {
        if (usuarioExistente) {
            return res.status(400).send('Ya esta Registrado el E-Mail');
        }
        nuevoUsuario.save((err) => {
            if (err) {
                next(err);
                res.status(500).json({ clas: 'danger', text: err.errors, mensaje: '' });
            }
            req.logIn(nuevoUsuario, (err) => {
                if (err) {
                    next(err);
                }
                res.send('Usuario Creado');
            });
        })
    })
}

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {
        if (err) {
            next(err);
        }
        if (!usuario) {
            return res.status(400).send('Email o Contraseña no validos');
        }
        req.logIn(usuario, (err) => {
            if (err) {
                next(err);
            }

            res.status(200).json({ mensaje: 'logeado' });
        })
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.send('Logout Exitoso');

}