const fs = require('fs')
const CardMarketScraper = require('./src/card-market-scraper')

const fileBuffer = fs.readFileSync('input.txt')
const fileText = fileBuffer.toString()
const cardUrls = fileText.split('\n')
console.log('cardUrls', cardUrls)

CardMarketScraper.scrapeCardArticles(cardUrls).then(result => {
    console.log('CardMarkerScraper.scrapeCardArticles result', result)

    if (!fs.existsSync('result')) fs.mkdirSync('result')
    fs.writeFileSync('result/' + Date.now() + '.json', JSON.stringify(result, null, 2))
})