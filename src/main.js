const api = require("./api");

const interval = 3000;

setInterval(async() => {
    console.log(await api.depth());
}, interval);