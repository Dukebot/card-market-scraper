const fs = require('fs');
const moment = require('moment');

const Utils = require('../utils');
const Entity = require('../entity');
const CardMarketScraper = require('../scraper/card-market-scraper');

async function scrape(cardUrls) {
    console.log('scrape -> cardUrls', cardUrls);

    // Start new timer to count execution time
    const timer = new Utils.Timer();
    try {
        // Launch the scraper process passing an array of card urls
        const result = await CardMarketScraper
            .scrapeCardsArticles(cardUrls)
            .then(cards => cards.map(card => new Entity.Card(card)));
        
        // Generate JSON file with the scraping result
        createResultJson(result);
        console.log('scrape -> result', result);
    
    } catch (error) {
        // Generate JSON file with error data
        createErrorJson(error);
        console.log('scrape -> ERROR JSON file generated');

        throw error;
    
    } finally {
        // Log the total execution time
        timer.registerAndLogTotal('scrape -> ends');
    }
}

function createResultJson(result) {
    if (!fs.existsSync('result')) fs.mkdirSync('result');

    const fileName = 'result/' + moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json';
    const fileContent = JSON.stringify(result, null, 2);

    fs.writeFileSync(fileName, fileContent);
}

function createErrorJson(error) {
    if (!fs.existsSync('error')) fs.mkdirSync('error');

    const fileName = 'error/error_' + moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json';
    const fileContent = JSON.stringify({
        error: error,
        errorString: error.toString(),
    }, null, 2);
    
    fs.writeFileSync(fileName, fileContent);
}

module.exports = {
    scrape,
}