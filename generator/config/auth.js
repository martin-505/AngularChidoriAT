const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        return next();
    }
    res.render('users/singin', { mensajeChido: '', mensajeSad: 'No puedes acceder registrate' });

}
module.exports = helpers;