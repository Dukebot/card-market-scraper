const ScraperService = require('./src/service/scraper-service');

const cardUrls = ScraperService.getCardUrls();
ScraperService.scrape(cardUrls);