const express = require("express");
const router = express.Router();
const { default: botService } = require("./bot.controller");

router.get("/", (req, res) => {
    res.send("Bot is running!!")
});

router.post("/start", (req, res) => {
    const { interval } = req.body;
    const bot = botService.startBot(interval);
    res.send(`Started Bot ${bot.id} with interval of ${ bot.interval/1000 } seconds`)
});

router.post("/shutdown", (req, res) => {
    const { botId } = req.body;
    botService.shutDownBot(botId);
    res.send(`Shutdown of Bot ${ botId }`)
});

module.exports = router;