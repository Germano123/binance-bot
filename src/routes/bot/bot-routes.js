const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Bot is running!!")
});

router.post("/run", (req, res) => {
    const active = req.body.run;
    res.send(`Bot run: ${active}`)
});

module.exports = router;