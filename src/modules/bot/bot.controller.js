const { default: Bot } = require("./bot");
let bots = {};

function startBot(interval) {
    const bot = new Bot(Object.keys(bots).length+1, interval);
    bot.start();
    bots[bot.id] = bot;
    return bot;
}

function shutDownBot(id) {
    if (bots[id]) {
        bots[id].shutDown();
        delete bots[id];
        if (Object.keys(bots).length === 0)
            console.log("Not bots are working now.")
        return true;
    } else {
        console.log("Does not exist bot with the given id.")
        return false;
    }
}

exports.default = { startBot, shutDownBot };