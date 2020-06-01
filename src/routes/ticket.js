const Router = require("./Router");
const Route = require("./Route");
const ticketService = require("../services/ticket");

const router = new Router("/ticket");

const createTicket = new Route("post", "/create", true, async (req, res) => {
    const { id: issuerId } = req.user;
    const { subjectId, bookingId, content, document, category } = req.body;
    const { status, data } = await ticketService.createTicket({
        issuerId,
        subjectId,
        bookingId,
        content,
        document,
        category
    });
    return res.status(status).json(data);
});

router.registerRoute(createTicket);

const getTickets = new Route("get", "/all", true, async (req, res) => {
    const { admin } = req.user;
    if (!admin) {
        return res.status(401).json({
            message: "Unauthorised"
        });
    }

    const { status, data } = await ticketService.getAllTickets();
    return res.status(status).json(data);
});

router.registerRoute(getTickets);

module.exports = router;
