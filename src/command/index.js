const InputService = require('../service/input-service')
const ScraperService = require('../service/scraper-service')

const Command = {
    async scrape() {
        const cardUrls = InputService.getCardUrls()
        await ScraperService.scrape(cardUrls)
    }
}

module.exports = Command