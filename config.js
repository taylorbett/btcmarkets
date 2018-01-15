// Add currencies that you are interested in here.

// If you add a value to 'holding' it will be used to
// provide your estimated wallet value in green next to BID/ASK
// by multiplying holding x bestBid

// Providing a 'decimals' integer will control the number of 
// decimals you will force outputs to. Defaults to 2.

exports.currencies = [
        {
            currency: 'XRP',
            conversion: 'AUD',
            holding: 0,
            decimals: 2,
        },
        {
            currency: 'BTC',
            conversion: 'AUD',
            holding: 0,
            decimals: 2,
        },
        {
            currency: 'ETH',
            conversion: 'BTC',
            holding: 0,
            decimals: 6,
        }
    ];

// Refresh rate in milliseconds
exports.refreshRate = 20000;

// Change colors for your readout
// Go to https://stackoverflow.com/a/41407246 for some quick options
exports.colors = {
    positive: '\x1b[32m',
    neutral: '\x1b[33m',
    negative: '\x1b[31m',
    accent: '\x1b[36m',
}