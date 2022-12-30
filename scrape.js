const InputService = require('./src/services/input-service')
const ScraperService = require('./src/services/scraper-service')

const myArgs = process.argv.slice(2)
const inputFileName = myArgs[0]

const cardUrls = InputService.getCardUrls(inputFileName)
ScraperService.scrape(cardUrls)