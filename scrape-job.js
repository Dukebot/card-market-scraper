const moment = require('moment');
const fs = require('fs');

const ScraperService = require('./src/service/scraper-service');


const hoursToExec = parseScrapeJobHoursFile();
const oneHour = 1000 * 60 * 60;

let running = false;

console.log('hoursToExec', hoursToExec);

scrape();
setInterval(scrape, oneHour / 4);


function parseScrapeJobHoursFile() {
    return fs.readFileSync('input/scrape_job_hours.txt')
        .toString()
        .split(' ').join('')    
        .split('\r').join('')
        .split('\n');
}

async function scrape() {
    const currentHour = moment().format('HH');

    if (hoursToExec.includes(currentHour)) {
        if (!running) {
            running = true;
        
            const cardUrls = ScraperService.getCardUrls();
            await ScraperService.scrape(cardUrls);
    
            running = false;
        }
    }
}