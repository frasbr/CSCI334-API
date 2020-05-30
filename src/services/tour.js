const Tour = require("../models/Tour");
const User = require("../models/User");
const TourSession = require("../models/TourSession");
const Booking = require("../models/Booking");
const responseGenerator = require("../util/responseGenerator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getAllTours = async () => {
    try {
        const tours = await Tour.findAll();
        return responseGenerator(200, {
            tours
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getToursByTitle = async (_title) => {
    try {
        const tours = await Tour.findAll({
            where: {
                title: {
                    [Op.like]: `%${_title}%`
                }
            }
        });
        return responseGenerator(200, {
            tours
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getToursByLocation = async (_location) => {
    try {
        const tours = await Tour.findAll({
            where: {
                location: {
                    [Op.like]: `%${_location}%`
                }
            }
        });
        return responseGenerator(200, {
            tours
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getTourById = async (_id) => {
    try {
        const tour = await Tour.findOne({ id: _id });
        return responseGenerator(200, {
            tour
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const createTour = async (tourProps) => {
    let { title, location, description, category, price, guideId } = tourProps;

    price = price * 100;

    try {
        const tour = await Tour.build({
            title,
            location,
            description,
            category,
            price,
            guide: guideId
        });

        tour.save();
        return responseGenerator(200, {
            tour
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const updateTour = async (tourProps, _tourId) => {
    const {
        title,
        location,
        description,
        category,
        price,
        guideId
    } = tourProps;

    try {
        const tour = await Tour.findOne({ where: { id: _tourId } });

        // check if user is the owner of the tour
        if (tour.guide !== guideId) {
            return responseGenerator(401, {
                message: "Unauthorised"
            });
        }

        tour.title = title || tour.title;
        tour.location = location || tour.location;
        tour.description = description || tour.description;
        tour.category = category || tour.category;
        tour.price = price || tour.price;

        tour.save();
        return responseGenerator(200, {
            tour
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const createSession = async (_sessionProps) => {
    const {
        tourId,
        startTime,
        finishTime,
        capacity,
        notes,
        userId
    } = _sessionProps;

    try {
        const tour = await Tour.findOne({ where: { id: tourId } });

        if (!tour) {
            return responseGenerator(404, {
                message: "Tour not found"
            });
        }

        if (tour.guide !== userId) {
            return responseGenerator(401, {
                message: "Only the owner of the tour can create a session"
            });
        }

        const session = TourSession.build({
            tourId,
            startTime,
            finishTime,
            capacity,
            notes
        });

        session.save();

        return responseGenerator(200, {
            session
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getTourSessions = async (_tourId) => {
    try {
        const sessions = await TourSession.findAll({
            where: { tourId: _tourId }
        });
        return responseGenerator(200, {
            sessions
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getSessionById = async (_sessionId) => {
    try {
        const session = await TourSession.findOne({
            where: { id: _sessionId }
        });

        if (!session) {
            return responseGenerator(404, {
                message: "Session not found"
            });
        }

        return responseGenerator(200, {
            session
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getSessionsByUser = async (_userId) => {
    try {
        const sessions = await TourSession.findAll({
            include: [
                {
                    model: Booking,
                    where: {
                        userId: _userId,
                        state: "confirmed"
                    }
                }
            ],
            attributes: {
                include: [
                    Sequelize.col("TourSession.id"),
                    Sequelize.col("TourSession.tourId"),
                    Sequelize.col("TourSession.startTime"),
                    Sequelize.col("TourSession.finishTime"),
                    Sequelize.col("TourSession.capacity"),
                    Sequelize.col("TourSession.notes")
                ]
            }
        });

        return responseGenerator(200, {
            sessions
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const createBooking = async (bookingProps) => {
    const { userId, sessionId, offer } = bookingProps;

    const session = await TourSession.findOne({ where: { id: sessionId } });

    if (!session) {
        return responseGenerator(404, {
            message: "Session not found"
        });
    }

    const booking = Booking.build({
        sessionId,
        userId,
        offer,
        state: "pending"
    });

    try {
        booking.save();
        return responseGenerator(200, {
            booking
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getBookingsBySession = async (_sessionId) => {
    try {
        const bookings = await Booking.findAll({
            where: { sessionId: _sessionId },
            include: [
                {
                    model: TourSession
                }
            ]
        });
        if (!bookings) {
            return responseGenerator(404, {
                message: "There are no bookings for this session"
            });
        }
        return responseGenerator(200, {
            bookings
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const updateBooking = async (bookingProps) => {
    try {
        const { state, bookingId, userId } = bookingProps;
        const booking = Booking.findOne({
            where: {
                id: bookingId
            },
            include: [
                {
                    model: TourSession,
                    include: [
                        {
                            model: Tour,
                            where: {
                                guide: userId
                            }
                        }
                    ]
                }
            ]
        });
        if (!booking) {
            return responseGenerator(404, {
                message: "No booking exists for this user matching the given id"
            });
        }

        if (state === "confirmed") {
            const user = await User.findOne({
                where: { id: booking.userId }
            });

            if (user.balance < booking.offer) {
                booking.state = "rejected";
                booking.save();
                return responseGenerator(409, {
                    message:
                        "User account balance is too low to conduct this transaction"
                });
            }

            user.balance = user.balance - booking.offer;
            user.save();
        }

        booking.state = state;
        booking.save();

        return responseGenerator(200, {
            booking
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

module.exports = {
    getAllTours,
    getToursByTitle,
    getToursByLocation,
    getTourById,
    createTour,
    updateTour,
    createSession,
    getTourSessions,
    getSessionById,
    getSessionsByUser,
    createBooking,
    getBookingsBySession,
    updateBooking
};
