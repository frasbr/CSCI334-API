const Router = require("./Router");
const Route = require("./Route");
const ticketService = require("../services/ticket");

const router = new Router("/ticket");

const createTicket = new Route("post", "/create", true, async (req, res) => {});

router.registerRoute(createTicket);
