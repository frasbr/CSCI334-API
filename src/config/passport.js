const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            User.findOne({
                where: {
                    id: payload.id
                }
            })
                .then((user) => {
                    if (user) {
                        // Authorisation is granted
                        const userProfile = {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        };
                        return done(null, userProfile);
                    }
                    // If no user then deny access
                    return done(null, false);
                })
                .catch((err) => {
                    return done(err, false);
                });
        })
    );
};
