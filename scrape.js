const fs = require('fs');
const moment = require('moment');
const CardMarketScraper = require('./src/card-market-scraper');

// Verify that the input file exists
if (!fs.existsSync('input/input.txt')) {
    throw Error('The file "input/input.txt" does not exist. Please create it and put in the card urls there...');
}

// Get card urls from file input
const fileBuffer = fs.readFileSync('input/input.txt');
const fileText = fileBuffer.toString();
const cardUrls = fileText.split('\n');
console.log('cardUrls', cardUrls);

// Launch the scraper process passing an array of card urls
CardMarketScraper.scrapeCardArticles(cardUrls).then(function (result) {
    console.log('CardMarkerScraper.scrapeCardArticles result', result);

    // Generate a json file with the scraping result
    // const fileName = moment().format('YYYY-MM-DD_HH:mm:ss') + '.json';
    const fileName = moment().format('YYYY-MM-DD') + '_' + Date.now() + '.json';
    if (!fs.existsSync('result')) fs.mkdirSync('result');
    fs.writeFileSync('result/' + fileName, JSON.stringify(result, null, 2));
});