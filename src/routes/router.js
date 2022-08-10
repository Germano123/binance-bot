const express = require("express");
const router = express.Router();

const botRoutes = require("../modules/bot/bot-routes");

router.get("/", (req, res) => {
    res.send("API Bot is running.")
});

router.get("/ping", (req, res) => {
    res.send("Pong!")
});

router.post("/start", (req, res) => {
    res.send("Bot starts to running!")
});

router.use("/bot", botRoutes);

module.exports = router;