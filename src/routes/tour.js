const tourService = require("../services/tour");
const Router = require("./Router");
const Route = require("./Route");

const router = new Router("/tour");

const createTour = new Route("post", "/create", true, async (req, res) => {
    const {
        title,
        location,
        description,
        startTime,
        finishTime,
        price
    } = req.body;
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
        startTime,
        finishTime,
        price
    });

    return res.status(status).json(data);
});
