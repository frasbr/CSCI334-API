const tourService = require("../services/tour");
const Router = require("./Router");
const Route = require("./Route");

const router = new Router("/tour");

// ROUTE
const getAllTours = new Route("get", "/all", true, async (req, res) => {
    const { status, data } = await tourService.getAllTours();
    return res.status(status).json(data);
});

router.registerRoute(getAllTours);

// ROUTE
const getToursByTitle = new Route(
    "get",
    "/byTitle/:title",
    true,
    async (req, res) => {
        const { title } = req.params;
        const { status, data } = await tourService.getToursByTitle(title);
        return res.status(status).json(data);
    }
);

router.registerRoute(getToursByTitle);

// ROUTE
const getTourById = new Route("get", "/byId/:id", true, async (req, res) => {
    const { id } = req.params;
    const { status, data } = await tourService.getTourById(id);
    return res.status(status).json(data);
});

router.registerRoute(getTourById);

// ROUTE
const getToursByLocation = new Route(
    "get",
    "/byLocation/:location",
    true,
    async (req, res) => {
        const { location } = req.params;
        const { status, data } = await tourService.getToursByLocation(location);
        return res.status(status).json(data);
    }
);

router.registerRoute(getToursByLocation);

const createTour = new Route("post", "/create", true, async (req, res) => {
    const { title, location, description, category, price } = req.body;
    const { id: guideId, validated } = req.user;

    if (!validated) {
        return res.status(401).json({
            message: "You do not have permission to create a tour"
        });
    }

    const { status, data } = await tourService.createTour({
        title,
        location,
        description,
        price,
        category,
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
        const { title, location, description, category, price } = req.body;
        const { id: guideId } = req.user;
        const { tourId } = req.params;

        const { status, data } = await tourService.updateTour(
            {
                title,
                location,
                description,
                category,
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
    "/session/create/:tourId",
    true,
    async (req, res) => {
        const { id: userId } = req.user;
        const { startTime, finishTime, capacity, notes } = req.body;
        const { tourId } = req.params;

        const { status, data } = await tourService.createSession({
            startTime,
            finishTime,
            capacity,
            notes,
            userId,
            tourId
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

router.registerRoute(updateBooking);

// ROUTE
const getBookingsBySession = new Route(
    "get",
    "/booking/bySession/:sessionId",
    true,
    async (req, res) => {
        const { sessionId } = req.params;
        const { status, data } = await tourService.getBookingsBySession(
            sessionId
        );
        return res.status(status).json(data);
    }
);

router.registerRoute(getBookingsBySession);

module.exports = router;
