const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Booking = require("../models/Booking");
const responseGenerator = require("../util/responseGenerator");

const createTicket = async (ticketProps) => {
    try {
        const ticket = await ticketFactory(ticketProps);
        return responseGenerator(200, {
            ticket
        });
    } catch (err) {
        console.log(err);
        if (err.name !== "Error") {
            return responseGenerator(422, {
                message: err.message
            });
        }
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const ticketFactory = async (ticketProps) => {
    const { category } = ticketProps;

    if (typeof category !== "string") {
        throw new TypeError("TypeError: `category` must be a string");
    }

    switch (category.toLowerCase()) {
        case "verification":
            return await createVerificationTicket(ticketProps);
        case "tour":
            return await createTourTicket(ticketProps);
        default:
            throw new SyntaxError(
                "SynatxError: `category` must be one of `tour` OR `verification`"
            );
    }
};

const createTourTicket = async (ticketProps) => {
    const { issuerId, subjectId, bookingId, content } = ticketProps;

    try {
        const ticket = await Ticket.build({
            issuerId,
            subjectId,
            bookingId,
            content,
            category: "tour"
        });

        ticket.save();
        return ticket;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const createVerificationTicket = async (ticketProps) => {
    const { issuerId, document } = ticketProps;

    try {
        const ticket = await Ticket.build({
            issuerId,
            document,
            category: "verification"
        });

        ticket.save();
        return ticket;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getAllTickets = async () => {
    try {
        const tickets = await Ticket.findAll();
        return responseGenerator(200, {
            tickets
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const refundUser = async (ticketId) => {
    try {
        const ticket = await Ticket.findOne({ where: { id: ticketId } });
        const booking = await Booking.findOne({
            where: { id: ticket.bookingId }
        });
        const user = await User.findOne({ where: { id: booking.userId } });

        booking.state = "rejected";
        booking.save();

        user.balance += booking.offer;
        user.save();

        return responseGenerator(200, {
            message: `User ${user.username} has been refunded $${booking.offer}`
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    refundUser
};
