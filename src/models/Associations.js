const Booking = require("./Booking");
const Tour = require("./Tour");
const TourSession = require("./TourSession");
const User = require("./User");

module.exports = () => {
    Tour.hasMany(TourSession, {
        foreignKey: "tour_id"
    });

    TourSession.belongsTo(Tour, {
        foreignKey: "tour_id"
    });

    TourSession.hasMany(Booking, {
        foreignKey: "session_id"
    });

    Booking.belongsTo(TourSession, {
        foreignKey: "session_id"
    });

    User.hasMany(Booking, {
        foreignKey: "user_id"
    });
};
