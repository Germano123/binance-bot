const express = require("express");
const app = express();
const router = require("./routes/router");
const config = require("./config");
const bodyParser = require("body-parser");

const port = config.app.port;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/", router);

app.listen(port, () => {
    console.info(`Server is running at http://localhost:${port}/`);
});

const bot = require("./bot");