const fs = require('fs');
const moment = require('moment');

const Utils = require('../utils');
const CardMarketScraper = require('../scraper/card-market-scraper');

async function scrape(cardUrls) {
    const timer = new Utils.Timer();
    console.log('cardUrls', cardUrls);
    try {
        // Create necessary directories if the don't exist
        if (!fs.existsSync('result')) fs.mkdirSync('result');
        if (!fs.existsSync('error')) fs.mkdirSync('error');

        // Launch the scraper process passing an array of card urls
        const result = await CardMarketScraper.scrapeCardArticles(cardUrls);
        console.log('CardMarkerScraper.scrapeCardArticles result', result);

        // Generate a json file with the scraping result
        fs.writeFileSync(
            'result/' + moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json', 
            JSON.stringify(result, null, 2)
        );
    } catch (error) {
        console.error(error)

        // Generate a json file with the error data
        fs.writeFileSync(
            'error/error_' + moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json', 
            JSON.stringify({
                error: error,
                errorString: error.toString(),
            }, null, 2)
        );
    } finally {
        // Log the total execution time
        timer.registerAndLogTotal('END');
    }
}

function getCardUrls() {
    // Verify that the input file exists
    if (!fs.existsSync('input/input.txt')) {
        throw Error('The file "input/input.txt" does not exist. Please create it and put in the card urls there...');
    }

    // Get card urls from file input
    const fileBuffer = fs.readFileSync('input/cards.txt');
    const fileText = fileBuffer.toString().split('\r').join('');
    const cardUrls = fileText.split('\n');

    // Return only valid card urls
    return cardUrls.filter(url => url.startsWith('https://www.cardmarket.com/en/'));
}

module.exports = {
    getCardUrls,
    scrape,
}