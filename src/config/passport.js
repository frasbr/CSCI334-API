const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        id: payload.id
                    }
                });

                if (user) {
                    // Authorisation is granted
                    const userProfile = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        validated: user.validated,
                        admin: user.isAdmin
                    };
                    return done(null, userProfile);
                }
                // If no user then deny access
                return done(null, false);
            } catch (err) {
                console.log(err);
                return done(err, false);
            }
        })
    );
};
