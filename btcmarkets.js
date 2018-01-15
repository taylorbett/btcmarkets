const https = require('https');
const moment = require('moment');

const config = require('./config');

let counter = 0;
let collectedResults = [];
let requestSentAt;

const urlBase = 'api.btcmarkets.net';

// Reset the globally scoped variables.
reset = () => {
    counter = 0;
    collectedResults = [];
    requestSentAt;
}

// Logging the data into the console. Change here if you want to customise your readout colours or format.
logData = () => {
    console.log('===================')
    console.log(requestSentAt.format('HH:mm:ss, DD MMM'));
    console.log('===================')
    for (let i = 0; i < config.currencies.length; i += 1) {
        if (collectedResults[i].success !== 'undefined' && collectedResults[i].success === false) {
            console.error(`Data retrieval for ${config.currencies[i].currency}/${config.currencies[i].conversion} failed.`)
        } else {
            let textColor = collectedResults[i].bestBid > collectedResults[i].lastPrice ? config.colors.positive : config.colors.negative;
            if (collectedResults[i].bestBid === collectedResults[i].lastPrice) {
                textColor = config.colors.neutral;
            }
            console.log(collectedResults[i].instrument + '/' + collectedResults[i].currency, config.colors.accent, (collectedResults[i].bestBid * config.currencies[i].holding).toFixed(config.currencies[i].decimals || 2), '\x1b[0m');
            console.log('BID ', textColor, collectedResults[i].bestBid.toFixed(config.currencies[i].decimals || 2), '\x1b[0m');
            console.log('ASK ', textColor, collectedResults[i].bestAsk.toFixed(config.currencies[i].decimals || 2), '\x1b[0m');
        }
        console.log('-------------------');
    }
    reset();
}

// Update count and check to see if it is ready to log
updateCount = () => {
    counter += 1;
    if (counter === config.currencies.length) {
        logData();
    }
}

// Fetch latest data for particular currency/conversion pair
getLatest = (position) => {
    if (position === 0) {
        requestSentAt = moment();
    }
    return https.get({
        host: urlBase,
        path: `/market/${config.currencies[position].currency}/${config.currencies[position].conversion}/tick`
    }, (response) => {
        var body = '';
        response.on('data', (d) => {
            body += d;
        });
        response.on('error', (err) => {
            console.error(err);
        });
        response.on('end', () => {
            var parsed = JSON.parse(body);
            collectedResults[position] = parsed;
            updateCount();
        });
    });
}

// Fetch latest for all currencies in config array
queryAllCurrencies = () => {
    for (let i = 0; i < config.currencies.length; i += 1) {
        getLatest(i);
    }
}

queryAllCurrencies(); // For instant gratification
setInterval(queryAllCurrencies, config.refreshRate); // Scheduled query