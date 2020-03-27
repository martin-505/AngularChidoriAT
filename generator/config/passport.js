const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    //coincide el correo del usuario
    const user = await User.findOne({ email })
    if (!user) {
        return done(null, false, { mensajeTiste: 'Incorrect username.' })
    } else {
        //encontro usuario
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'password incorrecto' });
        }

    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});