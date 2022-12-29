const fs = require('fs');
const moment = require('moment');

const Utils = require('./src/utils');
const Entity = require('./src/entity');
const InputService = require('./src/services/input-service');
const CardMarketScraper = require('./src/scraper/card-market-scraper');

const cardUrls = InputService.getCardUrls()
scrape(cardUrls)

async function scrape(cardUrls) {
    const timer = new Utils.Timer();
    console.log('cardUrls', cardUrls);
    
    try {
        // Create necessary directories if the don't exist
        if (!fs.existsSync('result')) fs.mkdirSync('result');
        if (!fs.existsSync('error')) fs.mkdirSync('error');

        // Launch the scraper process passing an array of card urls
        const result = await CardMarketScraper.scrapeCardsArticles(cardUrls).then(cards => {
            return cards.map(card => new Entity.Card(card))
        });
        console.log('CardMarkerScraper.scrapeCardArticles result', result);

        // Generate a json file with the scraping result
        fs.writeFileSync(
            'result/' + moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json', 
            JSON.stringify(result, null, 2)
        );

        return result
    } catch (error) {
        // Generate a json file with the error data
        fs.writeFileSync(
            'error/error_' + moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json', 
            JSON.stringify({
                error: error,
                errorString: error.toString(),
            }, null, 2)
        );

        throw error;
    } finally {
        // Log the total execution time
        timer.registerAndLogTotal('END');
    }
}