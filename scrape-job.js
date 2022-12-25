const moment = require('moment');

const InputService = require('./src/service/input-service');
const ScraperService = require('./src/service/scraper-service');

const hoursToExec = InputService.getScrapeJobExecutionHours();
const oneHour = 1000 * 60 * 60;

let running = false;

console.log('hoursToExec', hoursToExec);

scrape();
setInterval(scrape, oneHour / 4);

async function scrape() {
    const currentHour = moment().format('HH');

    // Check if current hour matches with some execution hour
    if (hoursToExec.includes(currentHour)) {
        // Run the process if not already running
        if (!running) {
            running = true;
        
            const cardUrls = InputService.getCardUrls();
            await ScraperService.scrape(cardUrls);
    
            running = false;
        }
    }
}