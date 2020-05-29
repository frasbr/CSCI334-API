const tourService = require("../services/tour");
const Router = require("./Router");
const Route = require("./Route");

const router = new Router("/tour");

const createTour = new Route("post", "/create", true, async (req, res) => {
    const { title, location, description, category, price } = req.body;
    const { id: guideId, validated } = req.user;

    if (!validated) {
        return res.status(401).json({
            message: "You do not have permission to create a tour"
        });
    }

    const { status, data } = tourService.createTour({
        title,
        location,
        description,
        price,
        cateogry,
        guideId
    });

    return res.status(status).json(data);
});

router.registerRoute(createTour);

// @route   POST /update/:tourId
// @desc    Update information about a tour specified by `tourId`
// @access  Private
const updateTour = new Route(
    "post",
    "/update/:tourId",
    true,
    async (req, res) => {
        const {
            title,
            location,
            description,
            startTime,
            finishTime,
            price
        } = req.body;
        const { id: guideId } = req.user;
        const { tourId } = req.params;

        const { status, data } = tourService.updateTour(
            {
                title,
                location,
                description,
                startTime,
                finishTime,
                price,
                guideId
            },
            tourId
        );

        return res.status(status).json(data);
    }
);

router.registerRoute(updateTour);

// ROUTE
const createSession = new Route(
    "post",
    "/session/create",
    true,
    async (req, res) => {
        const { id: userId } = req.user;
        const { startTime, finishTime, capacity, notes } = req.body;

        const { status, data } = await tourService.createSession({
            startTime,
            finishTime,
            capacity,
            notes,
            userId
        });
        return res.status(status).json(data);
    }
);

router.registerRoute(createSession);

// ROUTE
const getTourSessions = new Route(
    "get",
    "/session/byTour/:tourId",
    true,
    async (req, res) => {
        const { tourId } = req.params;
        const { status, data } = await tourService.getTourSessions(tourId);
        return res.status(status).json(data);
    }
);

router.registerRoute(getTourSessions);

// ROUTE
const getSession = new Route(
    "get",
    "/session/byId/:sessionId",
    true,
    async (req, res) => {
        const { sessionId } = req.params;
        const { status, data } = await tourService.getSessionById(sessionId);
        return res.status(status).json(data);
    }
);

router.registerRoute(getSession);

//ROUTE
const getSessionsByUser = new Route(
    "get",
    "/session/byUser/:userId",
    true,
    async (req, res) => {
        const { userId } = req.params;
        const { status, data } = await tourService.getSessionsByUser(userId);
        return res.status(status).json(data);
    }
);

router.registerRoute(getSessionsByUser);

// ROUTE
const createBooking = new Route(
    "post",
    "/session/:sessionId/book",
    true,
    async (req, res) => {
        const { id: userId } = req.user;
        const { sessionId } = req.params;
        const { offer } = req.body;
        const { status, data } = await tourService.createBooking({
            userId,
            sessionId,
            offer
        });
        return res.status(status).json(data);
    }
);

router.registerRoute(createBooking);

// ROUTE
const updateBooking = new Route(
    "post",
    "/booking/:bookingId/update",
    true,
    async (req, res) => {
        const { id: userId } = req.user;
        const { bookingId } = req.params;
        const { state } = req.body;
        const { status, data } = await tourService.updateBooking({
            state,
            userId,
            bookingId
        });
        return res.status(status).json(data);
    }
);

module.exports = router;
