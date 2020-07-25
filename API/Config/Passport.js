const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User');

passport.use('local', new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password'

}, async (Email, Password, done) => {

    const user = await User.findOne({ Email });
    if(!user) return done(null, false, {
        msg: 'Incorrect Email or Password...'
    });
    
    // Usuario existe, verificarlo.
    const verifyPassword = user.ComparePassword(Password);

    if(!verifyPassword) return done(null, false, {
        msg: 'Incorrect Email or Password...'
    });

    //Usuario existe y passsword es correcto

    return done(null, user);

}));

passport.serializeUser((user, done) => {
    if(user) return done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null,user);
});

module.exports = passport;