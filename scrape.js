const InputService = require('./src/service/input-service');
const ScraperService = require('./src/service/scraper-service');

const cardUrls = InputService.getCardUrls();
ScraperService.scrape(cardUrls);