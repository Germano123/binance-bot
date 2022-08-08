const express = require("express");
const router = express.Router();

const botRoutes = require("./bot/bot-routes");

router.get("/", (req, res) => {
    res.send("API Bot is running.")
});

router.get("/ping", (req, res) => {
    res.send("Pong!")
});

router.use("/bot", botRoutes);

module.exports = router;