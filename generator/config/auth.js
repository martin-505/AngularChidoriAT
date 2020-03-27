const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        return next();
    }
    return res.status(500).json({ mensajeSad: 'No puedes acceder registrate', mensajeChido: '' });
    // res.render('users/singin', { mensajeChido: '', mensajeSad: 'No puedes acceder registrate' });

}
module.exports = helpers;