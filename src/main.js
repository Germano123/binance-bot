const api = require("./api");

const interval = 5000;

let balance = 100000; // 100k
let initialValue = balance; // starter value
let fraction = 0.05; // the value to fraction your bank
let unit = initialValue * fraction; // the value of your unit for trading

console.log(`Using R\$${unit} as unit for trades.`);

let lowestAsk, highestAsk;
let lowestBid, highestBid;

let amountSpent, amountRecieved;

// control variable if last order was buy or sell
let bought = false, sold = false;

setInterval(async() => {
    const bookDepth = checkBookDepth(await api.depth());

    checkCurrentBookValues(bookDepth.bidOffer, bookDepth.askOffer);
    
    if (bought) {
        // need to sell
    } else if (sold) {
        // need to buy
    } else {
        // can buy or sell again
        if (unit > bookDepth.currentBidCost) {
            // buy
            bought = true;
            order(bookDepth.currentBidCost, "BUY");
        } else if (unit > bookDepth.currentAskCost) {
            // sell
            sold = true;
            order(bookDepth.currentAskCost, "SELL");
        }
    }

    const tickerPriceResult = await api.tickerPrice();
    console.log(`1 BTC = R\$${ Number(tickerPriceResult.price).toFixed(2) }`);
    console.log("\n");

}, interval);

function checkBookDepth(book) {
    const bestBid = Number(book.bids[0][1]);
    const bidOffer = Number(book.bids[0][0]).toFixed(2);
    
    const bestAsk = Number(book.asks[1][1]);
    const askOffer = Number(book.asks[1][0]).toFixed(2);
    
    const currentBidCost = (bestBid * bidOffer).toFixed(2);
    const currentAskCost = (bestAsk * askOffer).toFixed(2);

    console.log(`Best current BID on book: ${ bestBid } BTC per R\$${ currentBidCost } at R\$${ bidOffer }`);
    console.log(`Best current ASK on book: ${ bestAsk } BTC per R\$${ currentAskCost } at R\$${ askOffer }`);

    return {
        bidOffer,
        askOffer,
        currentBidCost,
        currentAskCost
    };
}

async function order(amount, side) {
    balance -= amount;
    console.log(`Bot ordered a ${side} of ${amount}`);
    console.log(`Current balance is: ${balance}`);
}

async function checkCurrentBookValues(bidCost, askCost) {
    // check proportions on buy to sell
    if (bidCost > highestBid) {
        highestBid = bidCost;
    } else if (bidCost < lowestBid) {
        lowestBid = bidCost;
    }

    // check proportions on sell to buy
    if (askCost > highestAsk) {
        highestAsk = askCost;
    } else if (askCost < lowestAsk) {
        lowestAsk = askCost;
    }
}