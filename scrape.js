const fs = require('fs')
const CardMarketScraper = require('./src/card-market-scraper')

async function scrape() {
    // Get card urls from file input
    const fileBuffer = fs.readFileSync('input.txt')
    const fileText = fileBuffer.toString()
    const cardUrls = fileText.split('\n')
    console.log('cardUrls', cardUrls)

    // Launch the scraper process passing an array of card urls
    const result = await CardMarketScraper.scrapeCardArticles(cardUrls)
    console.log('CardMarkerScraper.scrapeCardArticles result', result)

    // Generate a json file with the scraping result
    if (!fs.existsSync('result')) fs.mkdirSync('result')
    fs.writeFileSync('result/' + Date.now() + '.json', JSON.stringify(result, null, 2))
}

scrape()