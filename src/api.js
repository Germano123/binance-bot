const axios = require("axios");
const querystring = require("querystring");
const crypto = require("crypto");
const dotenv = require("dotenv");

// change this for a better optimal code
const environment = "local";
dotenv.config({
    path: `.${environment}.env`,
});

const api_url = `${process.env.BINANCE_API_URL}`;
const api_key = process.env.BINANCE_PUBLIC_KEY;
const api_secret = process.env.BINANCE_SECRET_KEY;

async function privateCall(path, data={}, method="GET") {
    const timeStamp = Date.now();
    const signature = crypto.createHmac("sha256", api_secret)
        .update(`?${querystring.stringify({ ...data, timeStamp })}`)
        .digest("hex");

    const newData = { ...data, signature, timeStamp };
    const qs = `?${querystring.stringify(newData)}`;
    
    try {
        const url = `${api_url}${path}${qs}`;

        const result = await axios({
            method,
            url,
            headers: { "X-MBX-APIKEY": api_key }
        });
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

async function accountInfo() {
    return privateCall("v3/account");
}

async function exchangeInfo() {
    return privateCall("v3/exchangeInfo");
}

async function newOrder(symbol, quantity, price, side="BUY", type="MARKET") {
    const data = { symbol, side, type, quantity };

    if (price) data.price = price;
    if (type == "LIMIT") data.timeInForce = "GTC";

    return privateCall("v3/order", data, "POST");
}

async function publicCall(path, data, method="GET") {
    try {
        const qs = data ? `?${querystring.stringify(data)}` : "";
        const url = `${api_url}${path}${qs}`;
        const result = await axios({
            method,
            url,
        });
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

async function time() {
    return publicCall("v3/time");
}

async function depth(symbol="BTCUSDT", limit=5) {
    return publicCall("v3/depth", { symbol, limit });
}

async function tickerPrice(symbol="BTCUSDT") {
    return publicCall("v3/ticker/price", { symbol })
}

async function lastCandle(symbol="BTCUSDT", interval="1m", limit=1) {
    return publicCall("v3/klines", { symbol, interval, limit })
}

module.exports = { time, depth, tickerPrice, accountInfo, exchangeInfo, newOrder, lastCandle };