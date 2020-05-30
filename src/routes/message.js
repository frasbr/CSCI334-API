const Router = require("./Router");
const Route = require("./Route");
const msgService = require("../services/message");

const router = new Router("/message");

const getInbox = new Route("get", "/inbox", true, async (req, res) => {
    const { id } = req.user;
    const { status, data } = await msgService.getIndex(id);
    return res.status(status).json(data);
});

router.registerRoute(getInbox);

const sendMsg = new Route("post", "/send/:userId", true, async (req, res) => {
    const { id: sender } = req.user;
    const { userId: receiver } = req.params;
    const { message } = req.body;
    const { status, data } = await msgService.sendMessage(
        sender,
        receiver,
        message
    );
    res.status(status).json(data);
});

router.registerRoute(sendMsg);

module.exports = router;
