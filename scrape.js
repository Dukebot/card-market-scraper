const fs = require('fs');
const moment = require('moment');
const CardMarketScraper = require('./src/card-market-scraper');
const Timer = require('./src/utils/timer');

scrape();

async function scrape() {
    const timer = new Timer();

    // Get the array of card urls to scrape
    const cardUrls = getCardUrls();
    console.log('cardUrls', cardUrls);

    // Launch the scraper process passing an array of card urls
    const result = await CardMarketScraper.scrapeCardArticles(cardUrls);
    console.log('CardMarkerScraper.scrapeCardArticles result', result);

    // Generate a json file with the scraping result
    const fileName = moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json';
    if (!fs.existsSync('result')) fs.mkdirSync('result');
    fs.writeFileSync('result/' + fileName, JSON.stringify(result, null, 2));

    // Log the total execution time
    timer.registerAndLogTotal('END');
}

function getCardUrls() {
    // Verify that the input file exists
    if (!fs.existsSync('input/input.txt')) {
        throw Error('The file "input/input.txt" does not exist. Please create it and put in the card urls there...');
    }

    // Get card urls from file input
    const fileBuffer = fs.readFileSync('input/input.txt');
    const fileText = fileBuffer.toString().split('\r').join('');
    const cardUrls = fileText.split('\n');

    // Return only valid card urls
    return cardUrls.filter(url => url.startsWith('https://www.cardmarket.com/en/'));
}